import React, { useState, useEffect, useRef } from 'react';
import { FEATURE_FLAGS } from '../config/feature-flags';

type Props = {
  theme: 'light' | 'dark';
  isEditing: boolean;
  devMode: boolean;
  onToggleTheme: () => void;
  onToggleEdit: () => void;
  onResetLayout: () => void;
  onOpenMarketplace: () => void;
  onOpenAutomation: () => void;
  onOpenMonitor: () => void;
  onToggleDevMode: () => void;
};

/**
 * Top navigation bar for the dashboard.
 * Contains branding, mode switch, and global actions.
 */
export default function DashboardHeader({
  theme,
  isEditing,
  devMode,
  onToggleTheme,
  onToggleEdit,
  onResetLayout,
  onOpenMarketplace,
  onOpenAutomation,
  onOpenMonitor,
  onToggleDevMode,
}: Props) {
  const [showShortcuts, setShowShortcuts] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleMouseDown(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setShowShortcuts(false);
      }
    }
    document.addEventListener('mousedown', handleMouseDown);
    return () => document.removeEventListener('mousedown', handleMouseDown);
  }, []);

  return (
    <div className="topbar">
      <div className="topbar__content">
        <div className="topbar__brand">
          <h1 className="brand__title">MyBoard</h1>
          <span className="brand__subtitle">Your modular productivity dashboard</span>
        </div>
        <div className="topbar__actions">
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
                <div className="shortcuts-row"><kbd>Shift+E</kbd><span>Edit Layout</span></div>
                <div className="shortcuts-row"><kbd>Shift+M</kbd><span>Marketplace</span></div>
                <div className="shortcuts-row"><kbd>Shift+D</kbd><span>Dev Mode</span></div>
                <div className="shortcuts-row"><kbd>Shift+R</kbd><span>Reset Layout</span></div>
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
