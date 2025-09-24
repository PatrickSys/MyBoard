'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import WidgetSlot from './WidgetSlot';
import { WIDGETS } from '../config/widgets';

const ResponsiveGridLayout = WidthProvider(Responsive as any);

type SavedLayout = { i: string; x: number; y: number; w: number; h: number }[];

const STORAGE_KEY = 'myboard.layout';
const GRID_BREAKPOINTS = { lg: 1200, md: 900, sm: 0 } as const;
const GRID_COLUMNS = { lg: 4, md: 2, sm: 1 } as const;
const DEFAULT_LAYOUT: SavedLayout = [
  { i: 'notes', x: 0, y: 0, w: 2, h: 3 },
  { i: 'pomodoro', x: 2, y: 0, w: 2, h: 3 },
];

export default function GridDashboard() {
  const [isEditing, setIsEditing] = useState(false);
  const [layout, setLayout] = useState<SavedLayout>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? (JSON.parse(saved) as SavedLayout) : DEFAULT_LAYOUT;
    } catch {
      // ignore storage errors
      return DEFAULT_LAYOUT;
    }
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only trigger shortcuts when not typing in inputs or custom elements
      const target = e.target as HTMLElement;
      const isTyping = target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true' ||
        target.closest('.slot__webc') !== null; // Inside any widget

      if (isTyping) return;

      // Toggle edit mode with 'Shift+E' key
      if (e.key === 'E' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setIsEditing(prev => !prev);
      }
      // Reset layout with 'Shift+R' key
      if (e.key === 'R' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        setLayout(DEFAULT_LAYOUT);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch { /* ignore */ }
  }, [layout]);

  const items = useMemo(() => {
    const map = new Map(layout.map((l) => [l.i, l] as const));
    return WIDGETS.map((w) => ({ w, l: map.get(w.id) }));
  }, [layout]);

  const handleLayoutChange = useCallback((current: unknown, allLayouts: any) => {
    const nextLayout = (allLayouts?.lg as SavedLayout) ?? (current as SavedLayout);
    setLayout(nextLayout);

    if (process.env.NODE_ENV !== 'production') {
      console.debug('[GridDashboard] layout changed', nextLayout);
    }
  }, []);

  const toggleEditing = () => setIsEditing(prev => !prev);
  const resetLayout = () => setLayout(DEFAULT_LAYOUT);
  const gridClassName = isEditing ? 'rgl rgl--editing' : 'rgl';

  return (
    <main className="wrap">
      <div className="topbar">
        <div className="topbar__content">
          <div className="topbar__brand">
            <h1 className="brand__title">MyBoard</h1>
            <span className="brand__subtitle">Your modular productivity dashboard</span>
          </div>
          <div className="topbar__center">
            <span className="topbar__mode">
              {isEditing ? 'Edit Mode' : 'View Mode'}
              {!isEditing && (
                <span className="keyboard-hint">
                  Press <kbd>Shift</kbd>+<kbd>E</kbd> to edit
                </span>
              )}
            </span>
          </div>
          <div className="topbar__actions">
            <button
              onClick={toggleEditing}
              className={isEditing ? 'btn--primary' : 'btn--ghost'}
              title={isEditing ? 'Exit edit mode' : 'Enter edit mode (Shift+E)'}
            >
              {isEditing ? 'Done' : 'Edit Layout'}
            </button>
            <button
              onClick={resetLayout}
              className="btn--ghost"
              title="Reset layout (Shift+R)"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <ResponsiveGridLayout
        className={gridClassName}
        breakpoints={GRID_BREAKPOINTS}
        cols={GRID_COLUMNS}
        rowHeight={96}
        isDraggable={isEditing}
        isResizable={isEditing}
        margin={[16, 16]}
        layouts={{ lg: layout, md: layout, sm: layout }}
        onLayoutChange={handleLayoutChange}
        draggableHandle=".slot__hdr"
        compactType={null}
        preventCollision={false}
      >
        {items.map(({ w, l }) => (
          <div
            key={w.id}
            className="grid-item"
            data-grid={{ i: w.id, x: l?.x ?? 0, y: l?.y ?? 0, w: l?.w ?? 2, h: l?.h ?? 3, minH: 2 }}
          >
            <WidgetSlot title={w.title} tag={w.tag} url={w.url} />
          </div>
        ))}
      </ResponsiveGridLayout>
    </main>
  );
}


