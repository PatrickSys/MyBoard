'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import type { WidgetManifest } from '@myboard/sdk';
import styles from './WidgetPicker.module.scss';
import WidgetThumbnail from './WidgetThumbnail';

type Props = {
  isOpen: boolean;
  /** Installed + enabled widgets not already on the current page */
  widgets: WidgetManifest[];
  onClose: () => void;
  onAdd: (widgetId: string) => void;
  onOpenMarketplace: () => void;
};

function widgetAvatar(id: string, title: string): { bg: string; initials: string } {
  let hash = 0;
  for (let i = 0; i < id.length; i++) { hash = (hash << 5) - hash + id.charCodeAt(i); hash |= 0; }
  const hue = Math.abs(hash) % 360;
  const bg = `hsl(${hue}, 55%, 42%)`;
  const initials = title.replace(/[^a-zA-Z\s]/g, '').split(/\s+/).filter(Boolean)
    .slice(0, 2).map(w => w[0].toUpperCase()).join('') || title.slice(0, 2).toUpperCase();
  return { bg, initials };
}

export default function WidgetPicker({
  isOpen,
  widgets,
  onClose,
  onAdd,
  onOpenMarketplace,
}: Props) {
  const [query, setQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? widgets.filter((w) =>
        `${w.title} ${w.description ?? ''}`.toLowerCase().includes(query.trim().toLowerCase())
      )
    : widgets;

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
      setTimeout(() => searchRef.current?.focus(), 100);
    } else {
      setAnimating(false);
      const t = setTimeout(() => {
        setVisible(false);
        setQuery('');
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) onClose();
    },
    [onClose]
  );

  if (!visible) return null;

  return (
    <div
      className={`${styles.overlay} ${animating ? styles.overlayOpen : ''}`}
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="Add widget to page"
    >
      <div ref={panelRef} className={`${styles.panel} ${animating ? styles.panelOpen : ''}`}>
        <div className={styles.header}>
          <span className={styles.title}>Add to Page</span>
          <button className={`btn--ghost ${styles.closeBtn}`} onClick={onClose} aria-label="Close">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {widgets.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="3" />
                <path d="M12 8v8M8 12h8" />
              </svg>
            </div>
            <p className={styles.emptyText}>All installed widgets are already on this page.</p>
            <button className="btn--primary" onClick={() => { onClose(); onOpenMarketplace(); }}>
              Browse Marketplace
            </button>
          </div>
        ) : (
          <>
            <div className={styles.searchWrap}>
              <input
                ref={searchRef}
                className={styles.search}
                placeholder="Search widgets..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className={styles.list}>
              {filtered.length === 0 && (
                <div className={styles.noResults}>No match for &ldquo;{query}&rdquo;</div>
              )}
              {filtered.map((w) => {
                const { bg, initials } = widgetAvatar(w.id, w.title);
                return (
                  <button
                    key={w.id}
                    className={styles.item}
                    onClick={() => { onAdd(w.id); onClose(); }}
                  >
                    <WidgetThumbnail
                      tag={w.tag}
                      url={w.url}
                      integrity={w.integrity}
                      fallbackBg={bg}
                      fallbackInitials={initials}
                    />
                    <span className={styles.itemText}>
                      <span className={styles.itemName}>{w.title}</span>
                      {w.description && (
                        <span className={styles.itemDesc}>{w.description}</span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
            <div className={styles.footer}>
              <button
                className="btn--ghost"
                onClick={() => { onClose(); onOpenMarketplace(); }}
              >
                Open Marketplace
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
