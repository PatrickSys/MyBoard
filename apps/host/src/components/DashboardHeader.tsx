import React from 'react';
import { FEATURE_FLAGS } from '../config/feature-flags';

type Props = {
  theme: 'light' | 'dark';
  isEditing: boolean;
  onToggleTheme: () => void;
  onToggleEdit: () => void;
  onResetLayout: () => void;
  onOpenMarketplace: () => void;
  onOpenAutomation: () => void;
  onOpenMonitor: () => void;
};

/**
 * Top navigation bar for the dashboard.
 * Contains branding, mode switch, and global actions.
 */
export default function DashboardHeader({
  theme,
  isEditing,
  onToggleTheme,
  onToggleEdit,
  onResetLayout,
  onOpenMarketplace,
  onOpenAutomation,
  onOpenMonitor,
}: Props) {
  return (
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
                <kbd>Shift</kbd>+<kbd>E</kbd> Edit | <kbd>Shift</kbd>+<kbd>A</kbd> Auto | <kbd>Shift</kbd>+<kbd>Esc</kbd> Sys
              </span>
            )}
          </span>
        </div>
        <div className="topbar__actions">
          <button
            onClick={onToggleTheme}
            className="btn--ghost"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            aria-label="Toggle theme"
          >
            {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button
            onClick={onOpenMonitor}
            className="btn--ghost"
            title="System Monitor (Shift+Esc)"
          >
            Monitor
          </button>
          <button
            onClick={onOpenAutomation}
            className="btn--ghost"
            title="Automation Studio (Shift+A)"
          >
            Studio
          </button>
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
            title={isEditing ? 'Exit edit mode' : 'Enter edit mode (Shift+E)'}
          >
            {isEditing ? 'Done' : 'Edit Layout'}
          </button>
          <button
            onClick={onResetLayout}
            className="btn--ghost"
            title="Reset layout (Shift+R)"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
