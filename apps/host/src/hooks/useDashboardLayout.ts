import { useState, useEffect, useCallback } from 'react';
import type { WidgetManifest } from '@myboard/sdk';

type SavedLayout = { i: string; x: number; y: number; w: number; h: number }[];

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
 * Hook to manage the dashboard grid layout for the active page.
 *
 * Persistence is now owned by usePageStore. This hook:
 * - Accepts the page layout and page widget list
 * - Reconciles layout when widgets change
 * - Calls onLayoutChange / onResetLayout callbacks to propagate to the store
 */
export function useDashboardLayout(
  pageWidgets: ReadonlyArray<WidgetManifest>,
  pageLayout: SavedLayout,
  pageId: string,
  onLayoutChange: (layout: SavedLayout) => void,
  onResetLayout: () => void
) {
  const [layout, setLayout] = useState<SavedLayout>(pageLayout);

  // Re-initialize when active page changes
  useEffect(() => {
    setLayout(pageLayout);
  }, [pageId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Reconcile when widget list changes (e.g. add/remove widget from page)
  useEffect(() => {
    setLayout((prev) => reconcileLayout(prev, pageWidgets));
  }, [pageWidgets]);

  // Propagate layout changes to the page store
  useEffect(() => {
    onLayoutChange(layout);
  }, [layout]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleLayoutChange = useCallback((current: unknown, allLayouts: unknown) => {
    const nextLayout =
      ((allLayouts as { lg?: SavedLayout } | undefined)?.lg ?? (current as SavedLayout));
    // Filter out synthetic slot items so they never pollute the persisted layout
    setLayout(nextLayout.filter((entry) => !entry.i.startsWith('__slot_')));
  }, []);

  const addLayoutEntry = useCallback(
    (widgetId: string, pos: { x: number; y: number }) => {
      setLayout((prev) => [...prev, { i: widgetId, x: pos.x, y: pos.y, w: 2, h: 3 }]);
    },
    []
  );

  const resetLayout = useCallback(() => {
    const fresh = buildDefaultLayout(pageWidgets);
    setLayout(fresh);
    onResetLayout();
  }, [pageWidgets, onResetLayout]);

  return {
    layout,
    handleLayoutChange,
    addLayoutEntry,
    resetLayout,
  };
}
