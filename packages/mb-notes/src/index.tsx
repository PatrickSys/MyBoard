import * as React from 'react';
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

function normalizeNoteText(value: unknown, fallback: string): string {
  if (typeof value !== 'string') return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(
    () => widgetStore.getState<Note[]>(WIDGET_ID) ?? []
  );
  const notesRef = React.useRef(notes);
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
    const unsubSettings = eventBus.subscribe(
      'host',
      'settings-updated',
      (event) => {
        const { widgetId, settings: nextSettings } = event.data as {
          widgetId: string;
          settings: NotesSettings;
        };
        if (widgetId === WIDGET_ID && nextSettings.showArchived !== undefined) {
          setShowArchived(nextSettings.showArchived);
        }
      }
    );

    const unregisterCommands = registerWidgetCommandHandler(
      WIDGET_ID,
      async (request: WidgetCommandRequest) => {
        const { commandType, payload } = request;

        if (commandType === 'note.create') {
          const textValue = normalizeNoteText(
            typeof payload?.text === 'string'
              ? payload.text
              : typeof payload?.title === 'string'
              ? payload.title
              : undefined,
            'Automated Note'
          );
          const tags =
            typeof payload?.tags === 'string'
              ? parseTags(payload.tags)
              : Array.isArray(payload?.tags)
              ? payload.tags
                  .filter((entry): entry is string => typeof entry === 'string')
                  .map((entry) => entry.trim().toLowerCase())
                  .filter(Boolean)
                  .slice(0, 5)
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
          const currentNotes = notesRef.current;
          if (currentNotes.length === 0) {
            return {
              ok: false,
              code: 'COMMAND_TARGET_NOT_FOUND',
              reason: 'No notes available to pin',
            };
          }

          let latest = currentNotes[0];
          for (const entry of currentNotes) {
            if (entry.updatedAt > latest.updatedAt) {
              latest = entry;
            }
          }

          const updatedNote = {
            ...latest,
            pinned: true,
            updatedAt: Date.now(),
          };
          setNotes((prev) =>
            prev.map((entry) =>
              entry.id === updatedNote.id ? updatedNote : entry
            )
          );
          eventBus.publish(WIDGET_ID, 'note-updated', {
            note: updatedNote,
          });
          return { ok: true, result: { noteId: updatedNote.id } };
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
    notesRef.current = notes;
    widgetStore.setState(WIDGET_ID, notes);
  }, [notes]);

  useEffect(() => {
    setWidgetSettings<NotesSettings>(WIDGET_ID, { showArchived });
  }, [showArchived]);

  const visibleNotes = useMemo(() => {
    return notes
      .filter((note) => (showArchived ? true : !note.archived))
      .filter((note) =>
        query ? note.text.toLowerCase().includes(query.toLowerCase()) : true
      )
      .filter((note) =>
        activeTag === 'all' ? true : note.tags.includes(activeTag)
      )
      .sort(
        (a, b) =>
          Number(b.pinned) - Number(a.pinned) || b.updatedAt - a.updatedAt
      );
  }, [activeTag, notes, query, showArchived]);

  const availableTags = useMemo(() => {
    const tags = new Set<string>();
    for (const note of notes) {
      for (const tag of note.tags) {
        tags.add(tag);
      }
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
  };

  const togglePinned = (id: string) => {
    setNotes((previous) =>
      previous.map((note) => {
        if (note.id !== id) return note;
        const next = { ...note, pinned: !note.pinned, updatedAt: Date.now() };
        eventBus.publish(WIDGET_ID, 'note-updated', { note: next });
        return next;
      })
    );
  };

  const toggleArchived = (id: string) => {
    setNotes((previous) =>
      previous.map((note) => {
        if (note.id !== id) return note;
        const next = {
          ...note,
          archived: !note.archived,
          updatedAt: Date.now(),
        };
        eventBus.publish(
          WIDGET_ID,
          next.archived ? 'note-archived' : 'note-updated',
          next.archived ? { id } : { note: next }
        );
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
    <div
      style={{
        fontFamily: 'system-ui, -apple-system, Segoe UI, sans-serif',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      {/* Compose area */}
      <div className="compose-block">
        <div className="note-input-row">
          <textarea
            className="note-textarea"
            rows={2}
            value={text}
            onChange={(event) => setText(event.target.value)}
            onInput={(event) => {
              const el = event.currentTarget;
              el.style.height = 'auto';
              el.style.height = el.scrollHeight + 'px';
            }}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                event.preventDefault();
                addNote();
              }
            }}
            placeholder="Write a note… (Ctrl+Enter to add)"
          />
          <button className="note-btn" onClick={addNote}>
            Add
          </button>
        </div>
        <div className="tags-input-row">
          <span className="tags-label">Tags:</span>
          <input
            className="note-input tags-input"
            placeholder="comma separated"
            value={tagsInput}
            onChange={(event) => setTagsInput(event.target.value)}
          />
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="note-toolbar">
        <input
          className="note-input"
          placeholder="Search…"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <select
          className="note-input tag-select"
          value={activeTag}
          onChange={(event) => setActiveTag(event.target.value)}
        >
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
          📦
        </label>
      </div>

      {/* Note list */}
      <ul className="note-list">
        {visibleNotes.map((note) => (
          <li
            key={note.id}
            className={`note-item ${note.archived ? 'archived' : ''}`}
          >
            <div className="note-body">
              {note.pinned && <span className="pin-indicator">📌 </span>}
              {editingId === note.id ? (
                <>
                  <textarea
                    className="note-textarea edit-textarea"
                    rows={3}
                    value={editingText}
                    onChange={(event) => setEditingText(event.target.value)}
                    onInput={(event) => {
                      const el = event.currentTarget;
                      el.style.height = 'auto';
                      el.style.height = el.scrollHeight + 'px';
                    }}
                    autoFocus
                  />
                  <div className="edit-actions">
                    <button className="note-btn save-btn" onClick={() => saveEdit(note.id)}>
                      Save
                    </button>
                    <button className="btn-ghost" onClick={() => { setEditingId(null); setEditingText(''); }}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <span className="note-text">{note.text}</span>
              )}
              {note.tags.length > 0 && (
                <div className="note-tags">
                  {note.tags.map((tag) => (
                    <span key={`${note.id}:${tag}`} className="note-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
            {editingId !== note.id && (
              <div className="note-actions">
                <button className="btn-ghost" onClick={() => startEdit(note)}>
                  Edit
                </button>
                <button className="btn-ghost" onClick={() => togglePinned(note.id)}>
                  {note.pinned ? 'Unpin' : 'Pin'}
                </button>
                <button className="btn-ghost" onClick={() => toggleArchived(note.id)}>
                  {note.archived ? 'Unarchive' : 'Archive'}
                </button>
                <button className="btn-ghost btn-delete" onClick={() => deleteNote(note.id)}>
                  Delete
                </button>
              </div>
            )}
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
      const shadow = this.shadowRoot ?? this.attachShadow({ mode: 'open' });
      let mount = shadow.querySelector(
        '[data-widget-root="notes"]'
      ) as HTMLDivElement | null;

      if (!mount) {
        const style = document.createElement('style');
        style.textContent = `:host{display:block;height:100%}
          .note-surface{
            background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
            border-radius:16px;
            padding:12px;
            height:100%;
            box-sizing:border-box;
            display:flex;
            flex-direction:column;
            border:1px solid rgba(245,158,11,0.2);
          }
          .compose-block{
            display:flex;
            flex-direction:column;
            gap:4px;
            margin-bottom:2px;
          }
          .note-input-row{
            display:flex;
            gap:8px;
            align-items:flex-start;
          }
          .note-textarea{
            flex:1;
            min-width:0;
            padding:6px 9px;
            border:1px solid rgba(245,158,11,0.25);
            border-radius:10px;
            background:rgba(255,255,255,0.95);
            color:#1f2937;
            font-size:0.85rem;
            font-family:inherit;
            resize:vertical;
            line-height:1.4;
            max-height:200px;
            overflow-y:auto;
            box-sizing:border-box;
          }
          .edit-textarea{
            width:100%;
            box-sizing:border-box;
            margin-bottom:4px;
          }
          .tags-input-row{
            display:flex;
            align-items:center;
            gap:6px;
          }
          .tags-label{
            font-size:0.75rem;
            color:#92400e;
            white-space:nowrap;
            font-weight:500;
          }
          .tags-input{
            flex:1;
            min-width:0;
          }
          .note-input{
            padding:5px 8px;
            border:1px solid rgba(245,158,11,0.25);
            border-radius:10px;
            background:rgba(255,255,255,0.95);
            color:#1f2937;
            font-size:0.82rem;
            font-family:inherit;
          }
          .note-toolbar{
            display:flex;
            gap:6px;
            align-items:center;
            margin-bottom:2px;
          }
          .note-toolbar .note-input{
            flex:1;
            min-width:0;
          }
          .tag-select{
            flex:0 0 110px;
            width:110px;
          }
          .note-btn{
            border:1px solid rgba(245,158,11,0.2);
            border-radius:10px;
            padding:6px 12px;
            background:#d97706;
            color:#fff;
            cursor:pointer;
            font-size:0.82rem;
            white-space:nowrap;
            align-self:stretch;
          }
          .save-btn{
            padding:5px 10px;
            font-size:0.78rem;
          }
          .edit-actions{
            display:flex;
            gap:6px;
            align-items:center;
          }
          .archive-toggle{
            display:flex;
            align-items:center;
            gap:4px;
            font-size:1rem;
            color:#92400e;
            cursor:pointer;
            white-space:nowrap;
            padding:3px;
          }
          .note-list{
            list-style:none;
            margin:0;
            padding:0;
            display:flex;
            flex-direction:column;
            gap:5px;
            overflow-y:auto;
            min-height:0;
            flex:1;
          }
          .note-item{
            background:rgba(255,255,255,0.85);
            border:1px solid rgba(245,158,11,0.2);
            border-radius:10px;
            padding:6px 10px;
            display:flex;
            flex-direction:column;
          }
          .note-item.archived{
            opacity:0.6;
          }
          .note-item.archived .note-text{
            text-decoration:line-through;
          }
          .note-body{
            min-width:0;
            display:flex;
            flex-direction:column;
            gap:5px;
            color:#1f2937;
          }
          .pin-indicator{
            font-size:0.75rem;
          }
          .note-text{
            font-size:0.85rem;
            white-space:pre-wrap;
            word-break:break-word;
            line-height:1.4;
            color:#1f2937;
          }
          .note-tags{
            display:flex;
            flex-wrap:wrap;
            gap:4px;
          }
          .note-tag{
            background:rgba(245,158,11,0.15);
            border:1px solid rgba(245,158,11,0.2);
            border-radius:999px;
            padding:1px 7px;
            font-size:0.7rem;
            color:#92400e;
          }
          .note-actions{
            display:flex;
            flex-direction:row;
            flex-wrap:wrap;
            gap:4px;
            margin-top:6px;
            padding-top:6px;
            border-top:1px solid rgba(245,158,11,0.15);
          }
          .btn-ghost{
            background:transparent;
            border:1px solid rgba(245,158,11,0.3);
            color:#92400e;
            border-radius:8px;
            padding:3px 8px;
            font-size:0.72rem;
            cursor:pointer;
          }
          .btn-delete{
            margin-left:auto;
            border-color:rgba(220,38,38,0.3);
            color:#b91c1c;
          }`;
        shadow.appendChild(style);

        const surface = document.createElement('div');
        surface.className = 'note-surface';
        surface.style.height = '100%';

        mount = document.createElement('div');
        mount.dataset.widgetRoot = 'notes';
        mount.style.height = '100%';

        surface.appendChild(mount);
        shadow.appendChild(surface);
      }

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
