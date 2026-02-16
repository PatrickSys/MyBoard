'use client';

import React, { useState, useEffect } from 'react';
import { eventBus } from '@myboard/sdk';
import styles from './NotificationHub.module.scss';

type Notification = {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warning' | 'error';
  code?: string;
};

/**
 * Global Notification Hub for MyBoard OS.
 * 
 * Listens for 'system:notification' events and displays them as toasts.
 */
export default function NotificationHub() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe to system notifications
    const unsub = eventBus.subscribe('system', 'notification', (event) => {
      const payload = event.data as {
        title?: string;
        message?: string;
        severity?: Notification['severity'];
        level?: Notification['severity'];
        code?: string;
      };
      const title = payload.title ?? 'System Notification';
      const message = payload.message ?? '';
      const severity = payload.level ?? payload.severity ?? 'info';
      const id = `notif_${Date.now()}`;

      setNotifications(prev => {
        const exists = prev.some(
          n => n.title === title && n.message === message && n.severity === severity
        );
        if (exists) return prev;
        return [...prev, { id, title, message, severity, code: payload.code }].slice(-20);
      });

      // Auto-remove after 5 seconds
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, 5000);
    });

    return () => unsub();
  }, []);

  return (
    <div className={styles.container}>
      {notifications.map(n => (
        <div key={n.id} className={`${styles.toast} ${styles[n.severity]}`}>
          <div className={styles.title}>{n.title}</div>
          <div className={styles.message}>{n.message}</div>
          {n.code && <div className={styles.message}>{n.code}</div>}
        </div>
      ))}
    </div>
  );
}
