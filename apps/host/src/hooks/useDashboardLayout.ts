import { useState, useEffect, useCallback } from 'react';
import type { WidgetManifest } from '@myboard/sdk';

type SavedLayout = { i: string; x: number; y: number; w: number; h: number }[];

const STORAGE_KEY = 'myboard.layout';
const DEFAULT_LAYOUT: SavedLayout = [
  { i: 'notes', x: 0, y: 0, w: 2, h: 3 },
  { i: 'pomodoro', x: 2, y: 0, w: 2, h: 3 },
  { i: 'counter', x: 0, y: 3, w: 2, h: 2 },
];

/**
 * Generates a default layout based on manifest defaults or fallback logic.
 */
function buildDefaultLayout(widgets: ReadonlyArray<WidgetManifest>): SavedLayout {
  return widgets.map((widget, index) => {
    const defaults = widget.layoutDefaults;
    const fallbackX = index % 2 === 0 ? 0 : 2;
    const fallbackY = Math.floor(index / 2) * 3;
    return {
      i: widget.id,
      x: defaults?.x ?? fallbackX,
      y: defaults?.y ?? fallbackY,
      w: defaults?.w ?? 2,
      h: defaults?.h ?? 3,
    };
  });
}

/**
 * Merges the current layout with the active widgets list.
 * Preserves existing positions for known widgets, adds defaults for new ones.
 */
function reconcileLayout(
  current: SavedLayout,
  widgets: ReadonlyArray<WidgetManifest>
): SavedLayout {
  if (widgets.length === 0) return current;

  const byId = new Map(current.map((entry) => [entry.i, entry] as const));
  return widgets.map((widget, index) => {
    const existing = byId.get(widget.id);
    if (existing) return existing;
    const defaults = widget.layoutDefaults;
    const fallbackX = index % 2 === 0 ? 0 : 2;
    const fallbackY = Math.floor(index / 2) * 3;
    return {
      i: widget.id,
      x: defaults?.x ?? fallbackX,
      y: defaults?.y ?? fallbackY,
      w: defaults?.w ?? 2,
      h: defaults?.h ?? 3,
    };
  });
}

/**
 * Hook to manage the dashboard grid layout.
 * 
 * Responsibilities:
 * - Load/Save layout from localStorage
 * - Reconcile layout when active widgets change
 * - Provide handlers for layout changes (drag/resize)
 */
export function useDashboardLayout(activeWidgets: ReadonlyArray<WidgetManifest>) {
  const [layout, setLayout] = useState<SavedLayout>(DEFAULT_LAYOUT);

  // Load from storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setLayout(JSON.parse(saved) as SavedLayout);
    } catch {
      // ignore
    }
  }, []);

  // Save to storage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layout));
    } catch {
      // ignore
    }
  }, [layout]);

  // Reconcile when widget list changes (e.g. install/uninstall)
  useEffect(() => {
    setLayout((prev) => reconcileLayout(prev, activeWidgets));
  }, [activeWidgets]);

  const handleLayoutChange = useCallback((current: unknown, allLayouts: unknown) => {
    const nextLayout =
      ((allLayouts as { lg?: SavedLayout } | undefined)?.lg ?? (current as SavedLayout));
    setLayout(nextLayout);
  }, []);

  const resetLayout = useCallback(() => {
    setLayout(buildDefaultLayout(activeWidgets));
  }, [activeWidgets]);

  return {
    layout,
    handleLayoutChange,
    resetLayout,
  };
}
