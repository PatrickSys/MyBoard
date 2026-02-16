'use client';

import { useMemo, useState } from 'react';
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

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} role="dialog" aria-modal="true" aria-label="Widget marketplace">
      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Widget Marketplace</h2>
          <button className="btn--ghost" onClick={onClose}>
            Close
          </button>
        </div>
        <div className={styles.body}>
          <input
            className={styles.search}
            placeholder="Search widgets..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          {errorMessage && <div className={styles.error}>{errorMessage}</div>}
          {filtered.map((widget) => {
            const record = installMap.get(widget.id);
            const isInstalled = Boolean(record);
            const isEnabled = Boolean(record?.enabled);
            const hasUpdate = isInstalled && record?.installedVersion !== widget.version;
            return (
              <article key={widget.id} className={styles.entry} aria-label={`Widget: ${widget.title}`}>
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
                          ? `update available (${record?.installedVersion} -> ${widget.version})`
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
