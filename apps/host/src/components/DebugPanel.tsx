'use client';

import { useEffect, useState } from 'react';
import { eventBus, type WidgetEvent } from '@myboard/sdk';
import { performanceTracker, type WidgetPerformance } from '../lib/performance-tracker';
import styles from './DebugPanel.module.scss';

const MAX_EVENTS = 20;

export default function DebugPanel() {
    const [isOpen, setIsOpen] = useState(false);
    const [events, setEvents] = useState<WidgetEvent[]>([]);
    const [metrics, setMetrics] = useState<WidgetPerformance[]>([]);

    // Keyboard shortcut: Shift+D
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'D' && e.shiftKey && !e.ctrlKey && !e.metaKey && !e.altKey) {
                const target = e.target as HTMLElement;
                const isTyping =
                    target.tagName === 'INPUT' ||
                    target.tagName === 'TEXTAREA' ||
                    target.contentEditable === 'true';
                if (!isTyping) {
                    e.preventDefault();
                    setIsOpen((prev) => !prev);
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Update metrics periodically
    useEffect(() => {
        if (!isOpen) return;

        const updateMetrics = () => {
            setMetrics(performanceTracker.getAllMetrics());
        };

        updateMetrics();
        const interval = setInterval(updateMetrics, 1000);
        return () => clearInterval(interval);
    }, [isOpen]);

    // Subscribe to event bus (simplified - capturing published events)
    useEffect(() => {
        if (!isOpen) return;

        const unsubscribers: (() => void)[] = [];
        const subscriptions: Array<[string, string]> = [
            ['notes', 'note-added'],
            ['notes', 'note-updated'],
            ['notes', 'note-deleted'],
            ['pomodoro', 'session-completed'],
            ['taskboard', 'task-created'],
            ['taskboard', 'task-moved'],
            ['taskboard', 'task-completed'],
        ];

        subscriptions.forEach(([widgetId, eventType]) => {
            const unsubscribe = eventBus.subscribe(widgetId, eventType, (event) => {
                setEvents((prev) => [event, ...prev].slice(0, MAX_EVENTS));
            });
            unsubscribers.push(unsubscribe);
        });

        const hostEvents = [
            'widget-installed',
            'widget-updated',
            'widget-uninstalled',
            'widget-install-failed',
        ] as const;
        const hostHandlers = hostEvents.map((eventName) => {
            const handler = (event: Event) => {
                const custom = event as CustomEvent;
                setEvents((prev) => [
                    {
                        widgetId: 'host',
                        type: eventName,
                        data: custom.detail,
                        timestamp: Date.now(),
                    },
                    ...prev,
                ].slice(0, MAX_EVENTS));
            };
            window.addEventListener(eventName, handler as EventListener);
            return { eventName, handler };
        });

        return () => {
            unsubscribers.forEach((unsub) => unsub());
            hostHandlers.forEach(({ eventName, handler }) => {
                window.removeEventListener(eventName, handler as EventListener);
            });
        };
    }, [isOpen]);

    const handleClearEvents = () => setEvents([]);

    const handleExportState = () => {
        const state = {
            metrics: performanceTracker.getAllMetrics(),
            events: events.slice(0, 10),
            timestamp: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `myboard-debug-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    if (process.env.NODE_ENV === 'production') {
        return null;
    }

    return (
        <div className={styles.debugPanel} data-open={isOpen}>
            <button
                className={styles.toggle}
                onClick={() => setIsOpen(!isOpen)}
                title="Toggle debug panel (Shift+D)"
                aria-label="Toggle debug panel"
            >
                <span className={styles.toggleIcon}>{isOpen ? '✕' : '🔧'}</span>
                Debug
            </button>

            {isOpen && (
                <div className={styles.content}>
                    <div className={styles.header}>
                        <h3>Debug Panel</h3>
                        <div className={styles.actions}>
                            <button onClick={handleClearEvents} className={styles.btnSmall}>
                                Clear Events
                            </button>
                            <button onClick={handleExportState} className={styles.btnSmall}>
                                Export State
                            </button>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <h4>Widget Performance</h4>
                        {metrics.length === 0 ? (
                            <p className={styles.empty}>No widgets tracked yet</p>
                        ) : (
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th>Widget</th>
                                        <th>Status</th>
                                        <th>Load Time</th>
                                        <th>Errors</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metrics.map((m) => (
                                        <tr key={m.widgetId}>
                                            <td>{m.widgetId}</td>
                                            <td>
                                                <span className={`${styles.status} ${styles[m.status]}`}>
                                                    {m.status}
                                                </span>
                                            </td>
                                            <td>
                                                {m.loadDuration ? `${m.loadDuration.toFixed(0)}ms` : '-'}
                                            </td>
                                            <td>{m.errorCount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>

                    <div className={styles.section}>
                        <h4>Sample Events (Notes/Pomodoro/Taskboard)</h4>
                        {events.length === 0 ? (
                            <p className={styles.empty}>Interact with widgets to see events</p>
                        ) : (
                            <div className={styles.eventList}>
                                {events.map((event, idx) => (
                                    <div key={idx} className={styles.event}>
                                        <div className={styles.eventHeader}>
                                            <span className={styles.eventType}>
                                                {event.widgetId}:{event.type}
                                            </span>
                                            <span className={styles.eventTime}>
                                                {new Date(event.timestamp).toLocaleTimeString()}
                                            </span>
                                        </div>
                                        {event.data !== undefined && (
                                            <pre className={styles.eventData}>
                                                {JSON.stringify(event.data, null, 2)}
                                            </pre>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

