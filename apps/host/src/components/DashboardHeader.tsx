import React, { useState, useEffect, useRef } from 'react';
import styles from './DashboardHeader.module.scss';

type PageInfo = {
  id: string;
  name: string;
};

type Props = {
  theme: 'light' | 'dark';
  isEditing: boolean;
  devMode: boolean;
  pages: ReadonlyArray<PageInfo>;
  activePageId: string;
  onSelectPage: (id: string) => void;
  onCreatePage: (name: string) => void;
  onRenamePage: (id: string, name: string) => void;
  onDeletePage: (id: string) => void;
  onToggleTheme: () => void;
  onToggleEdit: () => void;
  onResetLayout: () => void;
  onOpenMarketplace: () => void;
  onOpenAutomation: () => void;
  onOpenMonitor: () => void;
  onToggleDevMode: () => void;
  onOpenPageSettings: () => void;
  onOpenCommandPalette: () => void;
};

/**
 * Top navigation bar for the dashboard.
 * Contains branding, page tabs, and global actions.
 */
export default function DashboardHeader({
  theme,
  isEditing,
  devMode,
  pages,
  activePageId,
  onSelectPage,
  onCreatePage,
  onRenamePage,
  onDeletePage,
  onToggleTheme,
  onToggleEdit,
  onResetLayout,
  onOpenMarketplace,
  onOpenAutomation,
  onOpenMonitor,
  onToggleDevMode,
  onOpenPageSettings,
  onOpenCommandPalette,
}: Props) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState('');
  const popoverRef = useRef<HTMLDivElement>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowShortcuts(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  useEffect(() => {
    if (renamingId) {
      renameInputRef.current?.focus();
      renameInputRef.current?.select();
    }
  }, [renamingId]);

  useEffect(() => {
    const handler = (e: Event) => {
      const { pageId } = (e as CustomEvent<{ pageId: string }>).detail;
      const page = pages.find((p) => p.id === pageId);
      if (page) {
        setRenamingId(pageId);
        setRenameValue(page.name);
      }
    };
    window.addEventListener('myboard:start-page-rename', handler);
    return () => window.removeEventListener('myboard:start-page-rename', handler);
  }, [pages]);

  const commitRename = () => {
    if (renamingId && renameValue.trim()) {
      onRenamePage(renamingId, renameValue.trim());
    }
    setRenamingId(null);
  };

  const handleDoubleClick = (page: PageInfo) => {
    setRenamingId(page.id);
    setRenameValue(page.name);
  };

  const handleDelete = (id: string, name: string) => {
    if (pages.length <= 1) return;
    const confirmed = window.confirm(`Delete page "${name}"?`);
    if (confirmed) onDeletePage(id);
  };

  const handleCreate = () => {
    const idx = pages.length + 1;
    onCreatePage(`Page ${idx}`);
  };

  return (
    <div className="topbar">
      <div className="topbar__content">
        <div className="topbar__brand">
          <h1 className="brand__title">MyBoard</h1>
        </div>
        <div className="topbar__pages">
          {pages.map((page) => {
            const isActive = page.id === activePageId;
            if (renamingId === page.id) {
              return (
                <input
                  key={page.id}
                  ref={renameInputRef}
                  className="page-tab__input"
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onBlur={commitRename}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') commitRename();
                    if (e.key === 'Escape') setRenamingId(null);
                  }}
                />
              );
            }
            return (
              <div key={page.id} className="page-tab-wrap">
                <button
                  className={`page-tab ${isActive ? 'page-tab--active' : ''}`}
                  onClick={() => onSelectPage(page.id)}
                  onDoubleClick={() => handleDoubleClick(page)}
                  title={`Switch to "${page.name}" (double-click to rename)`}
                >
                  {page.name}
                </button>
                {pages.length > 1 && (
                  <button
                    className="page-tab__delete"
                    onClick={() => handleDelete(page.id, page.name)}
                    aria-label={`Delete page ${page.name}`}
                    title={`Delete "${page.name}"`}
                  >
                    &times;
                  </button>
                )}
              </div>
            );
          })}
          <button
            className="page-tab__add"
            onClick={handleCreate}
            title="Create new page"
            aria-label="Create new page"
          >
            +
          </button>
        </div>
        <div className="topbar__actions">
          <button
            className={styles.kbdChip}
            onClick={onOpenCommandPalette}
            title="Command palette (Ctrl+K)"
          >
            <span>&#8984;K</span>
          </button>
          <button
            onClick={onToggleTheme}
            className="btn--ghost btn--icon"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            )}
          </button>
          {devMode && (
            <button
              onClick={onOpenMonitor}
              className="btn--ghost"
              title="System Monitor (Shift+Esc)"
            >
              Monitor
            </button>
          )}
          {devMode && (
            <button
              onClick={onOpenAutomation}
              className="btn--ghost"
              title="Automation Studio (Shift+A)"
            >
              Studio
            </button>
          )}
          <button
            onClick={onOpenMarketplace}
            className="btn--ghost"
            title="Open marketplace (Shift+M)"
          >
            Marketplace
          </button>
          <button
            onClick={onToggleEdit}
            className={isEditing ? 'btn--primary' : 'btn--ghost'}
            title={isEditing ? 'Exit edit mode (Shift+E)' : 'Enter edit mode (Shift+E)'}
          >
            Edit Layout
          </button>
          <button
            onClick={onOpenPageSettings}
            className="btn--ghost"
            title="Page settings"
          >
            Page Settings
          </button>
          <button
            onClick={onResetLayout}
            className="btn--ghost"
            title="Reset layout (Shift+R)"
          >
            Reset
          </button>
          <button
            onClick={onToggleDevMode}
            className={devMode ? 'btn--primary' : 'btn--ghost'}
            title={`${devMode ? 'Disable' : 'Enable'} developer mode (Shift+D)`}
          >
            Dev
          </button>
          <div className="shortcuts-wrap" ref={popoverRef}>
            <button
              className="btn--ghost btn--icon"
              onClick={() => setShowShortcuts(v => !v)}
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts"
            >
              ?
            </button>
            {showShortcuts && (
              <div className="shortcuts-popover">
                <div className="shortcuts-row"><kbd>Ctrl+K</kbd><span>Command palette</span></div>
                <div className="shortcuts-row"><kbd>Shift+E</kbd><span>Edit Layout</span></div>
                <div className="shortcuts-row"><kbd>Shift+M</kbd><span>Marketplace</span></div>
                <div className="shortcuts-row"><kbd>Shift+D</kbd><span>Dev Mode</span></div>
                <div className="shortcuts-row"><kbd>Shift+R</kbd><span>Reset Layout</span></div>
                <div className="shortcuts-row"><kbd>Shift+[</kbd><span>Previous Page</span></div>
                <div className="shortcuts-row"><kbd>Shift+]</kbd><span>Next Page</span></div>
                {devMode && <div className="shortcuts-row"><kbd>Shift+A</kbd><span>Studio</span></div>}
                {devMode && <div className="shortcuts-row"><kbd>Shift+Esc</kbd><span>Monitor</span></div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
