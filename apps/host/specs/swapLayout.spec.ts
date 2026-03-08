/**
 * Unit tests for apps/host/src/lib/swapLayout.ts
 *
 * These are pure-function tests — no React, no DOM.
 * They guard the core drag-swap logic that determines how widgets
 * are repositioned when one is dragged on top of another.
 */

import { findSwapTarget, applySwap, buildLiveDragLayout } from '../src/lib/swapLayout';
import type { Layout } from '../src/lib/swapLayout';

// ---------------------------------------------------------------------------
// findSwapTarget
// ---------------------------------------------------------------------------

describe('findSwapTarget', () => {
  const layout: Layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 3 }, // occupies cols 0-1, rows 0-2
    { i: 'b', x: 2, y: 0, w: 2, h: 3 }, // occupies cols 2-3, rows 0-2
    { i: 'c', x: 4, y: 0, w: 2, h: 3 }, // occupies cols 4-5, rows 0-2
  ];

  it('finds the item whose bounding box contains the dropped item centre', () => {
    // dropped at x:2,y:0 → centre (3, 1.5) → inside 'b' [x:2..4, y:0..3]
    const dropped = { i: 'drag', x: 2, y: 0, w: 2, h: 3 };
    expect(findSwapTarget(layout, dropped, 'drag')?.i).toBe('b');
  });

  it('resolves to the correct target when centre is at the edge of a cell', () => {
    // dropped at x:4,y:0 → centre (5, 1.5) → inside 'c' [x:4..6, y:0..3]
    const dropped = { i: 'drag', x: 4, y: 0, w: 2, h: 3 };
    expect(findSwapTarget(layout, dropped, 'drag')?.i).toBe('c');
  });

  it('excludes the dragged item itself', () => {
    // 'a' dragging on top of itself — should not self-target
    const dropped = { i: 'a', x: 0, y: 0, w: 2, h: 3 };
    const target = findSwapTarget(layout, dropped, 'a');
    expect(target?.i).not.toBe('a');
  });

  it('excludes __slot_ items', () => {
    const layoutWithSlot: Layout = [
      ...layout,
      { i: '__slot_0', x: 6, y: 0, w: 2, h: 3 },
    ];
    // centre (7, 1.5) is inside the slot item — must not be returned
    const dropped = { i: 'drag', x: 6, y: 0, w: 2, h: 3 };
    expect(findSwapTarget(layoutWithSlot, dropped, 'drag')).toBeUndefined();
  });

  it('returns undefined when the drop centre is in an empty area', () => {
    const dropped = { i: 'drag', x: 6, y: 0, w: 2, h: 3 }; // centre (7, 1.5) — empty
    expect(findSwapTarget(layout, dropped, 'drag')).toBeUndefined();
  });

  it('returns undefined for an empty layout', () => {
    const dropped = { i: 'drag', x: 0, y: 0, w: 2, h: 3 };
    expect(findSwapTarget([], dropped, 'drag')).toBeUndefined();
  });

  it('centre exactly on item boundary (right edge) is outside — returns undefined', () => {
    // item 'a' occupies x:0..2; a centre at exactly x=2 is NOT inside (cx < x + w is false)
    const dropped = { i: 'drag', x: 1, y: 0, w: 2, h: 3 }; // centre cx = 2 — boundary
    // cx >= 0 && cx < 2 → 2 < 2 is false → 'a' is not a target
    // cx >= 2 && cx < 4 → true → 'b' is the target
    expect(findSwapTarget(layout, dropped, 'drag')?.i).toBe('b');
  });
});

// ---------------------------------------------------------------------------
// applySwap
// ---------------------------------------------------------------------------

describe('applySwap', () => {
  const layout: Layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 3 },
    { i: 'b', x: 2, y: 0, w: 4, h: 6 }, // larger widget to confirm sizes are preserved
    { i: 'c', x: 6, y: 0, w: 2, h: 3 },
  ];

  it('places the dragged item at the target position', () => {
    const target = layout[1]!; // b at (2, 0)
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    const a = result.find((item) => item.i === 'a')!;
    expect(a.x).toBe(2);
    expect(a.y).toBe(0);
  });

  it('places the target item at the dragged item original position', () => {
    const target = layout[1]!; // b at (2, 0)
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    const b = result.find((item) => item.i === 'b')!;
    expect(b.x).toBe(0);
    expect(b.y).toBe(0);
  });

  it('preserves the size of the dragged item', () => {
    const target = layout[1]!;
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    const a = result.find((item) => item.i === 'a')!;
    expect(a.w).toBe(2); // a's own width
    expect(a.h).toBe(3); // a's own height
  });

  it('preserves the size of the target item', () => {
    const target = layout[1]!; // b: w=4, h=6
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    const b = result.find((item) => item.i === 'b')!;
    expect(b.w).toBe(4);
    expect(b.h).toBe(6);
  });

  it('does not modify unrelated items', () => {
    const target = layout[1]!;
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    const c = result.find((item) => item.i === 'c')!;
    expect(c.x).toBe(6);
    expect(c.y).toBe(0);
    expect(c.w).toBe(2);
    expect(c.h).toBe(3);
  });

  it('returns a new array and does not mutate the input', () => {
    const target = layout[1]!;
    const original = layout.map((item) => ({ ...item }));
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    expect(result).not.toBe(layout);
    // input is unchanged
    expect(layout).toEqual(original);
  });

  it('result has the same number of items as the input', () => {
    const target = layout[1]!;
    const result = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    expect(result).toHaveLength(layout.length);
  });

  it('double swap restores the original layout', () => {
    const target = layout[1]!; // b
    // First swap: a ↔ b
    const after1 = applySwap(layout, 'a', { x: 0, y: 0 }, target);
    // Second swap back: b is now at (0,0), a is at (2,0)
    const newA = after1.find((item) => item.i === 'a')!;
    const newB = after1.find((item) => item.i === 'b')!;
    const after2 = applySwap(after1, 'b', { x: newB.x, y: newB.y }, newA);
    // Positions should be back to original
    expect(after2.find((item) => item.i === 'a')!.x).toBe(0);
    expect(after2.find((item) => item.i === 'b')!.x).toBe(2);
  });
});

// ---------------------------------------------------------------------------
// buildLiveDragLayout
// ---------------------------------------------------------------------------

describe('buildLiveDragLayout', () => {
  const preDrag: Layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 3 },
    { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    { i: 'c', x: 4, y: 0, w: 2, h: 3 },
  ];

  it('replaces the dragged item with its current live position', () => {
    const current = { i: 'a', x: 4, y: 3, w: 2, h: 3 };
    const result = buildLiveDragLayout(preDrag, current);
    const a = result.find((item) => item.i === 'a')!;
    expect(a.x).toBe(4);
    expect(a.y).toBe(3);
  });

  it('keeps all non-dragged items at their pre-drag positions (no push)', () => {
    const current = { i: 'a', x: 2, y: 0, w: 2, h: 3 }; // overlapping b
    const result = buildLiveDragLayout(preDrag, current);
    const b = result.find((item) => item.i === 'b')!;
    // b must stay at its original position, not be pushed
    expect(b.x).toBe(2);
    expect(b.y).toBe(0);
    const c = result.find((item) => item.i === 'c')!;
    expect(c.x).toBe(4);
  });

  it('updates the live size of the dragged item when resizing during drag', () => {
    const current = { i: 'a', x: 0, y: 0, w: 4, h: 6 }; // wider/taller
    const result = buildLiveDragLayout(preDrag, current);
    const a = result.find((item) => item.i === 'a')!;
    expect(a.w).toBe(4);
    expect(a.h).toBe(6);
  });

  it('returns a new array (no mutation of preDrag)', () => {
    const original = preDrag.map((item) => ({ ...item }));
    const current = { i: 'a', x: 4, y: 3, w: 2, h: 3 };
    const result = buildLiveDragLayout(preDrag, current);
    expect(result).not.toBe(preDrag);
    expect(preDrag).toEqual(original); // original untouched
  });

  it('result has the same length as preDrag', () => {
    const current = { i: 'b', x: 6, y: 3, w: 2, h: 3 };
    expect(buildLiveDragLayout(preDrag, current)).toHaveLength(preDrag.length);
  });
});
