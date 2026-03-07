'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { WidgetCatalogResponse, WidgetInstallRecord, WidgetManifest } from '@myboard/sdk';
import styles from './WidgetMarketplace.module.scss';

type Props = {
  isOpen: boolean;
  catalog: WidgetCatalogResponse | null;
  installedRecords: ReadonlyArray<WidgetInstallRecord>;
  errorMessage?: string;
  onClose: () => void;
  onInstall: (manifest: WidgetManifest) => void;
  onUninstall: (widgetId: string) => void;
  onToggleEnabled: (widgetId: string, enabled: boolean) => void;
  onOpenSettings: (widgetId: string) => void;
};

export default function WidgetMarketplace({
  isOpen,
  catalog,
  installedRecords,
  errorMessage,
  onClose,
  onInstall,
  onUninstall,
  onToggleEnabled,
  onOpenSettings,
}: Props) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const installMap = useMemo(
    () => new Map(installedRecords.map((record) => [record.widgetId, record])),
    [installedRecords]
  );

  const filtered = useMemo(() => {
    if (!catalog) return [];
    const search = query.trim().toLowerCase();
    if (!search) return catalog.widgets;
    return catalog.widgets.filter((widget) => {
      const haystack = `${widget.title} ${widget.id} ${widget.description ?? ''}`.toLowerCase();
      return haystack.includes(search);
    });
  }, [catalog, query]);

  // Animate open/close
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
      // Focus search on open
      setTimeout(() => searchRef.current?.focus(), 150);
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Click outside to close
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    },
    [onClose]
  );

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${animating ? styles.overlayOpen : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Widget marketplace"
      onClick={handleBackdropClick}
    >
      <div ref={panelRef} className={`${styles.panel} ${animating ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <h2>Widget Marketplace</h2>
          <button className={`btn--ghost ${styles.closeBtn}`} onClick={onClose} aria-label="Close marketplace">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={searchRef}
            className={styles.search}
            placeholder="Search widgets..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {query && (
            <button className={styles.searchClear} onClick={() => setQuery('')} aria-label="Clear search">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>
        <div className={styles.body}>
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {filtered.length === 0 && query && (
            <div className={styles.empty}>No widgets match &ldquo;{query}&rdquo;</div>
          )}
          {filtered.map((widget, index) => {
            const record = installMap.get(widget.id);
            const isInstalled = Boolean(record);
            const isEnabled = Boolean(record?.enabled);
            const hasUpdate = isInstalled && record?.installedVersion !== widget.version;
            return (
              <article
                key={widget.id}
                className={`${styles.entry} ${animating ? styles.entryVisible : ''}`}
                style={{ transitionDelay: `${80 + index * 50}ms` }}
                aria-label={`Widget: ${widget.title}`}
              >
                <div className={styles.row}>
                  <div>
                    <div className={styles.name}>{widget.title}</div>
                    <div className={styles.meta}>
                      {widget.id} &middot; {widget.version}
                    </div>
                  </div>
                  <div className={styles.status}>
                    {isInstalled ? (
                      <span className={isEnabled ? styles.statusInstalled : styles.statusDisabled}>
                        {hasUpdate
                          ? `update available`
                          : isEnabled
                            ? 'installed'
                            : 'disabled'}
                      </span>
                    ) : (
                      <span className={styles.statusMissing}>not installed</span>
                    )}
                  </div>
                </div>
                {widget.description && <div className={styles.desc}>{widget.description}</div>}
                <div className={styles.permissions}>
                  {widget.permissions.map((permission) => (
                    <span key={`${widget.id}:${permission}`} className={styles.pill}>
                      {permission}
                    </span>
                  ))}
                </div>
                <div className={styles.actions}>
                  {!isInstalled && (
                    <button
                      className="btn--primary"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Install "${widget.title}"?\nPermissions: ${widget.permissions.join(', ')}`
                        );
                        if (confirmed) onInstall(widget);
                      }}
                    >
                      Install
                    </button>
                  )}
                  {isInstalled && (
                    <button
                      className="btn--ghost"
                      onClick={() => {
                        if (isEnabled) {
                          const confirmed = window.confirm(
                            `Disable "${widget.title}"? You can re-enable it later.`
                          );
                          if (!confirmed) return;
                        }
                        onToggleEnabled(widget.id, !isEnabled);
                      }}
                    >
                      {isEnabled ? 'Disable' : 'Enable'}
                    </button>
                  )}
                  {isInstalled && widget.settingsSchema && (
                    <button className="btn--ghost" onClick={() => onOpenSettings(widget.id)}>
                      Settings
                    </button>
                  )}
                  {hasUpdate && (
                    <button
                      className="btn--ghost"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Update "${widget.title}" to ${widget.version}?`
                        );
                        if (confirmed) onInstall(widget);
                      }}
                    >
                      Update
                    </button>
                  )}
                  {isInstalled && !widget.defaultInstalled && (
                    <button
                      className="btn--ghost"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Uninstall "${widget.title}"? This removes it from your dashboard.`
                        );
                        if (confirmed) onUninstall(widget.id);
                      }}
                    >
                      Uninstall
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </div>
  );
}
