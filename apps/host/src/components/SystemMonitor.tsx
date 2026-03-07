'use client';

import React, { useMemo } from 'react';
import { notifyHost } from '@myboard/sdk';
import type { WidgetManifest } from '@myboard/sdk';
import { useSystemHealth } from '../hooks/useSystemHealth';
import { runtimeKernel } from '../lib/runtime-kernel-singleton';
import { widgetInstallStore } from '../lib/widget-install-store';
import styles from './SystemMonitor.module.scss';

type Props = {
  isOpen: boolean;
  activeWidgets: ReadonlyArray<WidgetManifest>;
  onClose: () => void;
};

export default function SystemMonitor({ isOpen, activeWidgets, onClose }: Props) {
  const activeIds = useMemo(() => activeWidgets.map((w) => w.id), [activeWidgets]);
  const health = useSystemHealth(activeIds, isOpen);

  if (!isOpen) return null;

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <h3>System Monitor</h3>
        <button className="btn--ghost" onClick={onClose} style={{ color: '#fff' }}>
          x
        </button>
      </div>

      <div className={styles.content}>
        {activeWidgets.map((widget) => {
          const stats = health[widget.id];
          const statusClass =
            stats?.status === 'healthy'
              ? styles.statusHealthy
              : stats?.status === 'warning'
                ? styles.statusWarning
                : styles.statusError;

          return (
            <div key={widget.id} className={styles.widgetRow}>
              <div>
                <div className={styles.name}>{widget.title}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)' }}>
                  {widget.tag}
                </div>
              </div>
              <div className={`${styles.status} ${statusClass}`}>{stats?.status || 'init'}</div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.8rem' }}>{stats?.eps || 0} eps</div>
                <div style={{ fontSize: '0.6rem', opacity: 0.5 }}>
                  crashes: {stats?.crashCount ?? 0}
                </div>
                <div style={{ display: 'flex', gap: 6, marginTop: 6, justifyContent: 'flex-end' }}>
                  <button
                    className="btn--ghost"
                    onClick={() => {
                      runtimeKernel.quarantine(widget.id, 'FORCE_KILL');
                      widgetInstallStore.setEnabled(widget.id, false);
                      notifyHost({
                        level: 'warning',
                        title: 'Widget Force Killed',
                        message: `${widget.title} quarantined and disabled`,
                        sourceWidgetId: widget.id,
                      });
                    }}
                  >
                    Force Kill
                  </button>
                  <button
                    className="btn--ghost"
                    onClick={() => {
                      runtimeKernel.clearQuarantine(widget.id);
                      widgetInstallStore.setEnabled(widget.id, true);
                      notifyHost({
                        level: 'success',
                        title: 'Widget Restored',
                        message: `${widget.title} quarantine cleared`,
                        sourceWidgetId: widget.id,
                      });
                    }}
                  >
                    Clear
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>Kernel: v2.0.0-alpha | Runtime: Stable</div>
    </div>
  );
}
