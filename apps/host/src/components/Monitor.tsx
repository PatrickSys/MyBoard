'use client';

import { useEffect, useMemo, useState } from 'react';
import { eventBus, notifyHost } from '@myboard/sdk';
import type { WidgetManifest } from '@myboard/sdk';
import { performanceTracker, type WidgetPerformance } from '../lib/performance-tracker';
import { useSystemHealth } from '../hooks/useSystemHealth';
import { runtimeKernel } from '../lib/runtime-kernel-singleton';
import { widgetInstallStore } from '../lib/widget-install-store';
import styles from './Monitor.module.scss';

const MAX_EVENTS = 50;

const SDK_EVENT_TYPES = [
  'note-added', 'note-updated', 'note-deleted',
  'session-completed',
  'task-created', 'task-moved', 'task-completed',
];

const HOST_EVENTS = [
  'widget-installed',
  'widget-updated',
  'widget-uninstalled',
  'widget-install-failed',
] as const;

type MonitorEvent = {
  widgetId: string;
  type: string;
  data?: unknown;
  timestamp: number;
};

type Props = {
  isOpen: boolean;
  activeWidgets: ReadonlyArray<WidgetManifest>;
  onClose: () => void;
};

export default function Monitor({ isOpen, activeWidgets, onClose }: Props) {
  const [expandedWidgetId, setExpandedWidgetId] = useState<string | null>(null);
  const [events, setEvents] = useState<MonitorEvent[]>([]);
  const [metrics, setMetrics] = useState<WidgetPerformance[]>([]);

  const activeIds = useMemo(() => activeWidgets.map((w) => w.id), [activeWidgets]);
  const activeIdsKey = activeIds.join(',');
  const health = useSystemHealth(activeIds, isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const update = () => setMetrics(performanceTracker.getAllMetrics());
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const unsubscribers: (() => void)[] = [];

    for (const widget of activeWidgets) {
      for (const eventType of SDK_EVENT_TYPES) {
        const unsub = eventBus.subscribe(widget.id, eventType, (event) => {
          setEvents((prev) =>
            [{ widgetId: event.widgetId, type: event.type, data: event.data, timestamp: event.timestamp }, ...prev].slice(0, MAX_EVENTS)
          );
        });
        unsubscribers.push(unsub);
      }
    }

    const handleKernelEvent = (e: Event) => {
      const detail = (e as CustomEvent).detail ?? {};
      setEvents((prev) =>
        [
          {
            widgetId: detail.widgetId ?? 'kernel',
            type: detail.type ?? 'kernel-event',
            data: detail,
            timestamp: Date.now(),
          },
          ...prev,
        ].slice(0, MAX_EVENTS)
      );
    };
    window.addEventListener('myboard:kernel-event', handleKernelEvent);

    const hostHandlers = HOST_EVENTS.map((eventName) => {
      const handler = (e: Event) => {
        const detail = (e as CustomEvent).detail;
        setEvents((prev) =>
          [{ widgetId: 'host', type: eventName, data: detail, timestamp: Date.now() }, ...prev].slice(0, MAX_EVENTS)
        );
      };
      window.addEventListener(eventName, handler as EventListener);
      return { eventName, handler };
    });

    return () => {
      unsubscribers.forEach((u) => u());
      window.removeEventListener('myboard:kernel-event', handleKernelEvent);
      hostHandlers.forEach(({ eventName, handler }) =>
        window.removeEventListener(eventName, handler as EventListener)
      );
    };
    // activeWidgets reference is covered by activeIdsKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, activeIdsKey]);

  if (!isOpen) return null;

  const handleExportLog = () => {
    const payload = {
      metrics: performanceTracker.getAllMetrics(),
      events,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `myboard-monitor-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.title}>Monitor</span>
        <button className="btn--ghost btn--icon" onClick={onClose} aria-label="Close monitor">
          ✕
        </button>
      </div>

      <div className={styles.content}>
        {activeWidgets.length === 0 ? (
          <p className={styles.empty}>No active widgets</p>
        ) : (
          activeWidgets.map((widget) => {
            const stats = health[widget.id];
            const perf = metrics.find((m) => m.widgetId === widget.id);
            const widgetEvents = events.filter((e) => e.widgetId === widget.id);
            const isExpanded = expandedWidgetId === widget.id;

            const status = stats?.status ?? 'loading';
            const dotClass =
              status === 'healthy'
                ? styles.dot__success
                : status === 'warning'
                  ? styles.dot__warning
                  : status === 'disabled'
                    ? styles.dot__error
                    : styles.dot__muted;

            return (
              <div key={widget.id} className={styles.widgetRow}>
                <button
                  className={styles.rowHeader}
                  onClick={() => setExpandedWidgetId(isExpanded ? null : widget.id)}
                  aria-expanded={isExpanded}
                >
                  <span className={`${styles.statusDot} ${dotClass}`} />
                  <span className={styles.widgetName}>{widget.title}</span>
                  <span className={styles.metric}>
                    {perf?.loadDuration ? `${perf.loadDuration.toFixed(0)}ms` : '—'}
                  </span>
                  <span className={styles.metric}>{perf?.errorCount ?? 0} err</span>
                  <span className={styles.metric}>{widgetEvents.length} evt</span>
                  <span className={styles.chevron}>{isExpanded ? '▼' : '▶'}</span>
                </button>

                {isExpanded && (
                  <div className={styles.rowDetail}>
                    <span className={styles.statusBadge} data-status={status}>
                      {status}
                    </span>
                    <div className={styles.eventList}>
                      {widgetEvents.length === 0 ? (
                        <span className={styles.noEvents}>No events captured</span>
                      ) : (
                        widgetEvents.map((evt, i) => (
                          <div key={i} className={styles.eventEntry}>
                            <span className={styles.eventTag}>
                              {evt.type.includes('error') || evt.type.includes('failed')
                                ? '[ERR]'
                                : '[EVT]'}
                            </span>
                            <span className={styles.eventTime}>
                              {new Date(evt.timestamp).toLocaleTimeString()}
                            </span>
                            <span className={styles.eventType}>{evt.type}</span>
                            {evt.data !== undefined && (
                              <code className={styles.eventData}>
                                {JSON.stringify(evt.data)}
                              </code>
                            )}
                          </div>
                        ))
                      )}
                    </div>
                    <div className={styles.rowActions}>
                      <button
                        className="btn--ghost"
                        onClick={() => {
                          runtimeKernel.quarantine(widget.id, 'FORCE_KILL');
                          widgetInstallStore.setEnabled(widget.id, false);
                          notifyHost({
                            level: 'warning',
                            title: 'Widget Disabled',
                            message: `${widget.title} has been force disabled`,
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
                            message: `${widget.title} has been restored`,
                            sourceWidgetId: widget.id,
                          });
                        }}
                      >
                        Restore
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      <div className={styles.footer}>
        <button className="btn--ghost" onClick={() => setEvents([])}>
          Clear all
        </button>
        <button className="btn--ghost" onClick={handleExportLog}>
          Export log
        </button>
      </div>
    </div>
  );
}
