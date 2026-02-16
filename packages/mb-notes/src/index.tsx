import { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
  type WidgetCommandRequest,
  emitError,
  emitReady,
  eventBus,
  getWidgetSettings,
  registerWidgetCommandHandler,
  setWidgetSettings,
  widgetStore,
} from '@myboard/sdk';

type Note = {
  id: string;
  text: string;
  tags: string[];
  pinned: boolean;
  archived: boolean;
  updatedAt: number;
};

type NotesSettings = {
  showArchived?: boolean;
};

const WIDGET_ID = 'notes';

function parseTags(value: string): string[] {
  return value
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 5);
}

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(() => widgetStore.getState<Note[]>(WIDGET_ID) ?? []);
  const [text, setText] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [showArchived, setShowArchived] = useState<boolean>(() => {
    const settings = getWidgetSettings<NotesSettings>(WIDGET_ID);
    return Boolean(settings?.showArchived);
  });

  useEffect(() => {
    const unsubSettings = eventBus.subscribe('host', 'settings-updated', (event) => {
      const { widgetId, settings: nextSettings } = event.data as {
        widgetId: string;
        settings: NotesSettings;
      };
      if (widgetId === WIDGET_ID && nextSettings.showArchived !== undefined) {
        setShowArchived(nextSettings.showArchived);
      }
    });

    const unregisterCommands = registerWidgetCommandHandler(
      WIDGET_ID,
      async (request: WidgetCommandRequest) => {
        const { commandType, payload } = request;

        if (commandType === 'note.create' || commandType === 'add-note') {
          const textValue =
            typeof payload?.text === 'string'
              ? payload.text
              : typeof payload?.title === 'string'
                ? payload.title
                : 'Automated Note';
          const tags =
            typeof payload?.tags === 'string'
              ? parseTags(payload.tags)
              : Array.isArray(payload?.tags)
                ? payload.tags.filter((entry): entry is string => typeof entry === 'string')
                : [];

          const note: Note = {
            id: String(Date.now()),
            text: textValue,
            tags,
            pinned: false,
            archived: false,
            updatedAt: Date.now(),
          };
          setNotes((prev) => [note, ...prev]);
          eventBus.publish(WIDGET_ID, 'note-added', { note });
          return { ok: true, result: { noteId: note.id } };
        }

        if (commandType === 'note.pin-latest') {
          let pinnedId: string | undefined;
          setNotes((prev) => {
            if (prev.length === 0) return prev;
            let latest = prev[0];
            for (const entry of prev) {
              if (entry.updatedAt > latest.updatedAt) {
                latest = entry;
              }
            }
            pinnedId = latest.id;
            return prev.map((entry) =>
              entry.id === latest.id
                ? { ...entry, pinned: true, updatedAt: Date.now() }
                : entry
            );
          });
          if (pinnedId) {
            eventBus.publish(WIDGET_ID, 'note-pinned', { id: pinnedId, pinned: true });
          }
          return { ok: true, result: { noteId: pinnedId } };
        }

        if (commandType === 'note.clear' || commandType === 'clear-notes') {
          setNotes([]);
          return { ok: true };
        }

        return {
          ok: false,
          code: 'COMMAND_ACTION_NOT_SUPPORTED',
          reason: `notes does not support ${commandType}`,
        };
      }
    );

    return () => {
      unsubSettings();
      unregisterCommands();
    };
  }, []);

  useEffect(() => {
    widgetStore.setState(WIDGET_ID, notes);
  }, [notes]);

  useEffect(() => {
    setWidgetSettings<NotesSettings>(WIDGET_ID, { showArchived });
  }, [showArchived]);

  const visibleNotes = useMemo(() => {
    return notes
      .filter((note) => (showArchived ? true : !note.archived))
      .filter((note) => (query ? note.text.toLowerCase().includes(query.toLowerCase()) : true))
      .filter((note) => (activeTag === 'all' ? true : note.tags.includes(activeTag)))
      .sort((a, b) => Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt);
  }, [activeTag, notes, query, showArchived]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const note of notes) {
      for (const tag of note.tags) tags.add(tag);
    }
    return ['all', ...Array.from(tags.values()).sort()];
  }, [notes]);

  const addNote = () => {
    const value = text.trim();
    if (!value) return;

    const note: Note = {
      id: String(Date.now()),
      text: value,
      tags: parseTags(tagsInput),
      pinned: false,
      archived: false,
      updatedAt: Date.now(),
    };
    setNotes((previous) => [note, ...previous]);
    setText('');
    setTagsInput('');
    eventBus.publish(WIDGET_ID, 'note-added', { note });
  };

  const deleteNote = (id: string) => {
    setNotes((previous) => previous.filter((note) => note.id !== id));
    eventBus.publish(WIDGET_ID, 'note-deleted', { id });
  };

  const togglePinned = (id: string) => {
    setNotes((previous) =>
      previous.map((note) => {
        if (note.id !== id) return note;
        const next = { ...note, pinned: !note.pinned, updatedAt: Date.now() };
        eventBus.publish(WIDGET_ID, 'note-pinned', { id, pinned: next.pinned });
        return next;
      })
    );
  };

  const toggleArchived = (id: string) => {
    setNotes((previous) =>
      previous.map((note) => {
        if (note.id !== id) return note;
        const next = { ...note, archived: !note.archived, updatedAt: Date.now() };
        eventBus.publish(WIDGET_ID, 'note-updated', { note: next });
        return next;
      })
    );
  };

  const startEdit = (note: Note) => {
    setEditingId(note.id);
    setEditingText(note.text);
  };

  const saveEdit = (id: string) => {
    const value = editingText.trim();
    if (!value) return;
    setNotes((previous) =>
      previous.map((note) => {
        if (note.id !== id) return note;
        const next = { ...note, text: value, updatedAt: Date.now() };
        eventBus.publish(WIDGET_ID, 'note-updated', { note: next });
        return next;
      })
    );
    setEditingId(null);
    setEditingText('');
  };

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif', height: '100%', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div className="note-input-row">
        <input
          className="note-input"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') addNote();
          }}
          placeholder="Write a note"
        />
        <button className="note-btn" onClick={addNote}>
          Add
        </button>
      </div>
      <input
        className="note-input"
        placeholder="Tags (comma separated)"
        value={tagsInput}
        onChange={(event) => setTagsInput(event.target.value)}
      />
      <div className="note-toolbar">
        <input
          className="note-input"
          placeholder="Search notes"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select className="note-input" value={activeTag} onChange={(event) => setActiveTag(event.target.value)}>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag === 'all' ? 'All tags' : `#${tag}`}
            </option>
          ))}
        </select>
        <label className="archive-toggle">
          <input
            type="checkbox"
            checked={showArchived}
            onChange={(event) => setShowArchived(event.target.checked)}
          />
          Show archived
        </label>
      </div>
      <ul className="note-list">
        {visibleNotes.map((note) => (
          <li key={note.id} className={`note-item ${note.archived ? 'archived' : ''}`}>
            <div className="note-main">
              {editingId === note.id ? (
                <input
                  className="note-input"
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                />
              ) : (
                <span style={{ whiteSpace: 'pre-wrap' }}>{note.text}</span>
              )}
              <div className="note-tags">
                {note.tags.map((tag) => (
                  <span key={`${note.id}:${tag}`} className="note-tag">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="note-actions">
              {editingId === note.id ? (
                <button className="btn-ghost" onClick={() => saveEdit(note.id)}>
                  Save
                </button>
              ) : (
                <button className="btn-ghost" onClick={() => startEdit(note)}>
                  Edit
                </button>
              )}
              <button className="btn-ghost" onClick={() => togglePinned(note.id)}>
                {note.pinned ? 'Unpin' : 'Pin'}
              </button>
              <button className="btn-ghost" onClick={() => toggleArchived(note.id)}>
                {note.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button className="btn-ghost" onClick={() => deleteNote(note.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

class MbNotesElement extends HTMLElement {
  #root: ReturnType<typeof createRoot> | null = null;

  connectedCallback(): void {
    try {
      const shadow = this.attachShadow({ mode: 'open' });
      const mount = document.createElement('div');
      const style = document.createElement('style');
      style.textContent = `:host{display:block;height:100%}
        .note-surface{
          background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
          border-radius:16px;
          padding:20px;
          height:100%;
          box-sizing:border-box;
          display:flex;
          flex-direction:column;
          border:1px solid rgba(245, 158, 11, 0.2);
        }
        .note-input-row,.note-toolbar{
          display:flex;
          gap:10px;
          margin-bottom:8px;
        }
        .note-input{
          flex:1;
          min-width:0;
          padding:9px 10px;
          border:1px solid rgba(245, 158, 11, 0.25);
          border-radius:10px;
          background:rgba(255,255,255,0.95);
          font-size:0.85rem;
        }
        .note-btn{
          border:1px solid rgba(245, 158, 11, 0.2);
          border-radius:10px;
          padding:9px 14px;
          background:#d97706;
          color:#fff;
          cursor:pointer;
        }
        .archive-toggle{
          display:flex;
          align-items:center;
          gap:6px;
          font-size:0.75rem;
          color:#92400e;
          white-space:nowrap;
        }
        .note-list{
          list-style:none;
          margin:0;
          padding:0;
          display:grid;
          gap:8px;
          overflow:auto;
          min-height:0;
          flex:1;
        }
        .note-item{
          background:rgba(255,255,255,0.85);
          border:1px solid rgba(245, 158, 11, 0.2);
          border-radius:10px;
          padding:10px;
          display:flex;
          justify-content:space-between;
          gap:10px;
        }
        .note-item.archived{
          opacity:0.7;
        }
        .note-main{
          min-width:0;
          display:flex;
          flex-direction:column;
          gap:6px;
        }
        .note-tags{
          display:flex;
          flex-wrap:wrap;
          gap:6px;
        }
        .note-tag{
          background:rgba(245, 158, 11, 0.15);
          border:1px solid rgba(245, 158, 11, 0.2);
          border-radius:999px;
          padding:1px 7px;
          font-size:0.7rem;
          color:#92400e;
        }
        .note-actions{
          display:flex;
          flex-direction:column;
          gap:4px;
          align-items:flex-end;
        }
        .btn-ghost{
          background:transparent;
          border:1px solid rgba(245,158,11,0.3);
          color:#92400e;
          border-radius:8px;
          padding:5px 8px;
          font-size:0.72rem;
          cursor:pointer;
        }`;
      shadow.appendChild(style);
      const surface = document.createElement('div');
      surface.className = 'note-surface';
      surface.style.height = '100%';
      mount.style.height = '100%';
      surface.appendChild(mount);
      shadow.appendChild(surface);
      this.#root = createRoot(mount);
      this.#root.render(<NotesApp />);
      queueMicrotask(() => emitReady(this));
    } catch (error) {
      emitError(this, error instanceof Error ? error.message : 'mount-error');
    }
  }

  disconnectedCallback(): void {
    try {
      this.#root?.unmount();
      this.#root = null;
    } catch {
      // ignore cleanup errors
    }
  }
}

if (!customElements.get('mb-notes')) {
  customElements.define('mb-notes', MbNotesElement);
}
