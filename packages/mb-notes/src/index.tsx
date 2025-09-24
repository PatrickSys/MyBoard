import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { emitReady, emitError } from '@myboard/widget-utils';

type Note = { id: string; text: string };

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>(() => {
    try {
      const s = localStorage.getItem('mb-notes');
      return s ? (JSON.parse(s) as Note[]) : [];
    } catch {
      return [];
    }
  });
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('mb-notes', JSON.stringify(notes));
    } catch { }
  }, [notes]);

  const add = () => {
    const v = text.trim();
    if (!v) return;
    setNotes((n) => [{ id: String(Date.now()), text: v }, ...n]);
    setText('');
  };
  const del = (id: string) => setNotes((n) => n.filter((x) => x.id !== id));

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', height: '100%', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
      <div className="note-input-row">
        <input
          className="note-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') add(); }}
          placeholder="Quick note"
        />
        <button className="note-btn" onClick={add}>
          Add
        </button>
      </div>
      <ul className="note-list">
        {notes.map((n) => (
          <li key={n.id} className="note-item">
            <span style={{ whiteSpace: 'pre-wrap' }}>{n.text}</span>
            <button className="btn-ghost" onClick={() => del(n.id)}>
              Delete
            </button>
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
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.5);
        }
        .note-input-row{
          display:flex;
          gap:12px;
          margin-bottom:16px;
          min-height:40px;
          padding-bottom:12px;
          border-bottom:1px solid rgba(245, 158, 11, 0.1);
        }
        .note-input{
          flex:1;
          padding:10px 12px;
          border:1px solid rgba(245, 158, 11, 0.2);
          border-radius:10px;
          background:rgba(255,255,255,0.9);
          font-size:0.875rem;
          transition:all 0.2s ease;
        }
        .note-input:focus{
          outline:none;
          border-color:#f59e0b;
          background:white;
          box-shadow:0 0 0 3px rgba(245,158,11,0.1);
        }
        .note-btn{
          padding:10px 16px;
          border-radius:10px;
          border:1px solid rgba(245,158,11,0.2);
          background:linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color:white;
          font-weight:500;
          font-size:0.875rem;
          cursor:pointer;
          transition:all 0.2s ease;
        }
        .note-btn:hover{
          transform:translateY(-1px);
          box-shadow:0 4px 12px rgba(245,158,11,0.3);
        }
        .note-list{
          list-style:none;
          margin:0;
          padding:0;
          display:grid;
          gap:10px;
          flex:1;
          overflow:auto;
          min-height:0;
          padding-right:4px;
        }
        .note-item{
          display:flex;
          justify-content:space-between;
          align-items:center;
          border:1px solid rgba(245,158,11,0.1);
          border-radius:12px;
          padding:12px 16px;
          transition:all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background:rgba(255,255,255,0.8);
          backdrop-filter:blur(8px);
        }
        .note-item:hover{
          transform:translateY(-2px);
          box-shadow:0 6px 20px rgba(245,158,11,0.15);
          border-color:rgba(245,158,11,0.2);
        }
        .btn-ghost{
          background:transparent;
          border:1px solid rgba(245,158,11,0.2);
          color:#64748b;
          border-radius:8px;
          padding:6px 12px;
          font-size:0.75rem;
          cursor:pointer;
          transition:all 0.2s ease;
        }
        .btn-ghost:hover{
          background:rgba(245,158,11,0.05);
          border-color:rgba(245,158,11,0.3);
          color:#f59e0b;
          transform:translateY(-1px);
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
    } catch (e) {
      emitError(this, e instanceof Error ? e.message : 'mount-error');
    }
  }

  disconnectedCallback(): void {
    try {
      this.#root?.unmount();
      this.#root = null;
    } catch { }
  }
}

if (!customElements.get('mb-notes')) {
  customElements.define('mb-notes', MbNotesElement);
}



