/**
 * Pure layout manipulation utilities for swap-drag behaviour.
 *
 * All functions are side-effect free and have no React dependencies,
 * which makes them straightforward to unit-test in isolation.
 */

export type LayoutItem = { i: string; x: number; y: number; w: number; h: number };
export type Layout = LayoutItem[];

/** Returns the geometric centre of a layout item. */
function itemCenter(item: LayoutItem): { cx: number; cy: number } {
  return { cx: item.x + item.w / 2, cy: item.y + item.h / 2 };
}

/**
 * Finds the first item in `layout` whose bounding box contains the
 * centre-point of `dropped`.
 *
 * The dragged item itself (`draggedId`) and any synthetic slot items
 * (prefixed `__slot_`) are excluded from consideration.
 */
export function findSwapTarget(
  layout: Layout,
  dropped: LayoutItem,
  draggedId: string
): LayoutItem | undefined {
  const { cx, cy } = itemCenter(dropped);
  return layout.find(
    (item) =>
      item.i !== draggedId &&
      !item.i.startsWith('__slot_') &&
      cx >= item.x &&
      cx < item.x + item.w &&
      cy >= item.y &&
      cy < item.y + item.h
  );
}

/**
 * Returns a new layout where:
 * - `draggedId` is moved to `target`'s (x, y), keeping its own size.
 * - `target.i` is moved to `origPos`, keeping its own size.
 * - All other items are unchanged.
 *
 * Both items retain their original dimensions — this is an intentional
 * design choice so that layouts with mixed-size widgets still work.
 */
export function applySwap(
  layout: Layout,
  draggedId: string,
  origPos: { x: number; y: number },
  target: LayoutItem
): Layout {
  return layout.map((item) => {
    if (item.i === draggedId) return { ...item, x: target.x, y: target.y };
    if (item.i === target.i) return { ...item, x: origPos.x, y: origPos.y };
    return item;
  });
}

/**
 * Returns a copy of `preDrag` where the dragged item is updated to
 * `current`'s live position.  All other items stay at their pre-drag
 * positions, which prevents the "push" effect during drag.
 */
export function buildLiveDragLayout(preDrag: Layout, current: LayoutItem): Layout {
  return preDrag.map((item) =>
    item.i === current.i
      ? { ...item, x: current.x, y: current.y, w: current.w, h: current.h }
      : item
  );
}
