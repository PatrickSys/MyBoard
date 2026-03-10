'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import type { Command } from '../hooks/useCommandRegistry';
import styles from './CommandPalette.module.scss';

interface CommandPaletteProps {
  isOpen: boolean;
  commands: Command[];
  onClose: () => void;
}

const GROUP_ORDER: Command['group'][] = [
  'Navigation', 'Pages', 'Widgets', 'Layout', 'Settings', 'Dev',
];

export default function CommandPalette({ isOpen, commands, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((cmd) =>
      `${cmd.label} ${cmd.description ?? ''} ${cmd.group}`.toLowerCase().includes(q)
    );
  }, [commands, query]);

  const grouped = useMemo(
    () =>
      GROUP_ORDER.map((group) => ({
        group,
        items: filtered.filter((cmd) => cmd.group === group),
      })).filter((g) => g.items.length > 0),
    [filtered]
  );

  const flatItems = useMemo(() => grouped.flatMap((g) => g.items), [grouped]);

  const itemIndices = useMemo(() => {
    const map = new Map<string, number>();
    let idx = 0;
    for (const { items } of grouped) {
      for (const cmd of items) {
        map.set(cmd.id, idx++);
      }
    }
    return map;
  }, [grouped]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll selected item into view
  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  // Animation — exact WidgetPicker pattern
  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnimating(true)));
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setAnimating(false);
      const t = setTimeout(() => {
        setVisible(false);
        setQuery('');
        setSelectedIndex(0);
      }, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const count = flatItems.length;
      if (e.key === 'ArrowDown' || e.key === 'Tab') {
        e.preventDefault();
        setSelectedIndex((i) => (i + 1) % Math.max(1, count));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((i) => (i - 1 + Math.max(1, count)) % Math.max(1, count));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const cmd = flatItems[selectedIndex];
        if (cmd) cmd.action();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    },
    [flatItems, selectedIndex, onClose]
  );

  const handleBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
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
      aria-label="Command palette"
    >
      <div
        className={`${styles.panel} ${animating ? styles.panelOpen : ''}`}
        onKeyDown={handleKeyDown}
      >
        {/* Search row */}
        <div className={styles.searchRow}>
          <svg
            className={styles.searchIcon}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            ref={inputRef}
            className={styles.searchInput}
            placeholder="Search commands…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search commands"
            autoComplete="off"
            spellCheck={false}
          />
          <span className={styles.escBadge}>Esc</span>
        </div>

        {/* Results */}
        <div className={styles.results} role="listbox">
          {flatItems.length === 0 ? (
            <div className={styles.empty}>
              {query.trim()
                ? `No commands match \u201c${query}\u201d`
                : 'No commands available'}
            </div>
          ) : (
            grouped.map(({ group, items }) => (
              <div key={group}>
                <div className={styles.groupHeader}>{group}</div>
                {items.map((cmd) => {
                  const idx = itemIndices.get(cmd.id) ?? 0;
                  return (
                    <button
                      key={cmd.id}
                      ref={(el) => { itemRefs.current[idx] = el; }}
                      role="option"
                      aria-selected={selectedIndex === idx}
                      className={`${styles.item} ${selectedIndex === idx ? styles.itemSelected : ''}`}
                      onClick={() => cmd.action()}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <span className={styles.itemText}>
                        <span className={styles.itemLabel}>{cmd.label}</span>
                        {cmd.description && (
                          <span className={styles.itemDesc}>{cmd.description}</span>
                        )}
                      </span>
                      {cmd.shortcutHint && (
                        <span className={styles.shortcutBadge}>{cmd.shortcutHint}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
