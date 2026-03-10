import { useState, useEffect, useCallback, useRef } from 'react';
import type { WidgetManifest } from '@myboard/sdk';
import { findSwapTarget, applySwap, buildLiveDragLayout } from '../lib/swapLayout';

type SavedLayout = { i: string; x: number; y: number; w: number; h: number }[];

/**
 * Generates a default layout based on manifest defaults or fallback logic.
 */
function buildDefaultLayout(widgets: ReadonlyArray<WidgetManifest>): SavedLayout {
  return widgets.map((widget, index) => {
    const defaults = widget.layoutDefaults;
    const fallbackX = (index % 4) * 2;
    const fallbackY = Math.floor(index / 4) * 3;
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
  let changed = false;
  const result = widgets.map((widget, index) => {
    const existing = byId.get(widget.id);
    if (existing) return existing;
    changed = true;
    const defaults = widget.layoutDefaults;
    const fallbackX = (index % 4) * 2;
    const fallbackY = Math.floor(index / 4) * 3;
    return {
      i: widget.id,
      x: defaults?.x ?? fallbackX,
      y: defaults?.y ?? fallbackY,
      w: defaults?.w ?? 2,
      h: defaults?.h ?? 3,
    };
  });
  // Return the same reference when nothing changed so that the useEffect
  // dependency on `layout` does not trigger an unnecessary re-render cycle.
  return changed ? result : current;
}

/**
 * Hook to manage the dashboard grid layout for the active page.
 *
 * Persistence is owned by usePageStore. This hook:
 * - Accepts the page layout and page widget list
 * - Reconciles layout when widgets change
 * - Calls onLayoutChange / onResetLayout callbacks to propagate to the store
 * - Manages drag-swap behaviour: during drag, other items are frozen in
 *   place (no push); on drop, the overlapped item swaps to the dragged
 *   item's original position
 */
export function useDashboardLayout(
  pageWidgets: ReadonlyArray<WidgetManifest>,
  pageLayout: SavedLayout,
  pageId: string,
  onLayoutChange: (layout: SavedLayout) => void,
  onResetLayout: () => void
) {
  const [layout, setLayout] = useState<SavedLayout>(pageLayout);
  // Non-null during an active drag: reflects pre-drag positions for all items
  // except the dragged one, which tracks the live cursor position.
  const [liveDragLayout, setLiveDragLayout] = useState<SavedLayout | null>(null);

  // Refs used to coordinate drag suppression without triggering extra renders.
  const isDraggingRef = useRef(false);
  // Suppresses the single onLayoutChange RGL fires after onDragStop, which
  // would otherwise overwrite the swap result with RGL's own pushed layout.
  const skipNextLayoutChangeRef = useRef(false);
  const dragOrigRef = useRef<SavedLayout[number] | null>(null);
  const preDragLayoutRef = useRef<SavedLayout>([]);

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

  /**
   * Passed to RGL's onLayoutChange.
   *
   * Suppressed while a drag is in progress and for the single RGL-computed
   * layout event that fires immediately after onDragStop — that event would
   * otherwise overwrite the swap result.
   */
  const handleLayoutChange = useCallback((current: unknown, allLayouts: unknown) => {
    if (isDraggingRef.current) return;
    if (skipNextLayoutChangeRef.current) {
      skipNextLayoutChangeRef.current = false;
      return;
    }
    const nextLayout =
      ((allLayouts as { lg?: SavedLayout } | undefined)?.lg ?? (current as SavedLayout));
    setLayout(nextLayout.filter((entry) => !entry.i.startsWith('__slot_')));
  }, []);

  /**
   * Called when a drag begins. Snapshots the current layout so we can
   * restore non-dragged items to their original positions during drag.
   */
  const onDragStart = useCallback(
    (_currentLayout: unknown, oldItem: SavedLayout[number]) => {
      isDraggingRef.current = true;
      dragOrigRef.current = { ...oldItem };
      preDragLayoutRef.current = layout.map((l) => ({ ...l }));
      setLiveDragLayout(layout.map((l) => ({ ...l })));
    },
    [layout]
  );

  /**
   * Called on every drag move. Updates only the dragged item's position;
   * all other items remain at their pre-drag coordinates, eliminating the
   * push-to-side effect.
   */
  const onDrag = useCallback(
    (_currentLayout: unknown, _oldItem: unknown, newItem: SavedLayout[number]) => {
      setLiveDragLayout(buildLiveDragLayout(preDragLayoutRef.current, newItem));
    },
    []
  );

  /**
   * Called when the drag ends. Computes the final layout:
   * - If the drop centre overlaps another item → pure swap.
   * - Otherwise → dragged item lands at its drop position; all others unchanged.
   *
   * skipNextLayoutChangeRef is set to suppress RGL's own post-drop
   * onLayoutChange callback, which arrives after this handler returns.
   */
  const onDragStop = useCallback(
    (_currentLayout: unknown, _oldItem: unknown, newItem: SavedLayout[number]) => {
      isDraggingRef.current = false;
      skipNextLayoutChangeRef.current = true;

      const orig = dragOrigRef.current;
      const preDrag = preDragLayoutRef.current;

      let finalLayout: SavedLayout;
      if (orig && preDrag.length > 0) {
        const target = findSwapTarget(preDrag, newItem, newItem.i);
        if (target) {
          finalLayout = applySwap(preDrag, newItem.i, { x: orig.x, y: orig.y }, target);
        } else {
          finalLayout = preDrag.map((item) =>
            item.i === newItem.i ? { ...item, x: newItem.x, y: newItem.y } : item
          );
        }
      } else {
        finalLayout = preDrag.length > 0 ? preDrag : layout;
      }

      setLayout(finalLayout);
      setLiveDragLayout(null);
      dragOrigRef.current = null;
      preDragLayoutRef.current = [];
    },
    [layout]
  );

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
    /** Use this as the `layouts` prop on RGL — equals `liveDragLayout` during drag. */
    displayLayout: liveDragLayout ?? layout,
    handleLayoutChange,
    addLayoutEntry,
    resetLayout,
    onDragStart,
    onDrag,
    onDragStop,
  };
}
