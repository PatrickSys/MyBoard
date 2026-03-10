/**
 * Integration tests for apps/host/src/hooks/useDashboardLayout.ts
 *
 * These tests use renderHook to exercise the hook with real React lifecycle.
 * They cover:
 *   - Initial layout wiring
 *   - Page-switch re-initialisation
 *   - Widget-list reconciliation
 *   - Drag swap: two items swap when the dragged item overlaps a target
 *   - Drag free-drop: item lands freely when no overlap is found
 *   - Live drag layout: non-dragged items are frozen during drag (no push)
 *   - Post-drag cleanup: live layout is cleared after drag stops
 *   - onLayoutChange propagation to the page store
 *   - handleLayoutChange is suppressed during drag and for the first
 *     call after drag stops (prevents RGL from overwriting the swap)
 */

import { renderHook, act } from '@testing-library/react';
import { useDashboardLayout } from '../src/hooks/useDashboardLayout';
import type { WidgetManifest } from '@myboard/sdk';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type LayoutItem = { i: string; x: number; y: number; w: number; h: number };
type Layout = LayoutItem[];

/** Creates a minimal WidgetManifest stub sufficient for the hook. */
function makeWidget(id: string): WidgetManifest {
  return { id, title: id, tag: id, url: '', version: '1.0.0' } as unknown as WidgetManifest;
}

function makeLayout(ids: string[]): Layout {
  return ids.map((id, i) => ({
    i: id,
    x: (i % 4) * 2,
    y: Math.floor(i / 4) * 3,
    w: 2,
    h: 3,
  }));
}

const noop = () => undefined;

// ---------------------------------------------------------------------------
// Initial layout
// ---------------------------------------------------------------------------

describe('useDashboardLayout — initial layout', () => {
  it('exposes the provided pageLayout immediately', () => {
    const layout = makeLayout(['a', 'b']);
    const { result } = renderHook(() =>
      useDashboardLayout([makeWidget('a'), makeWidget('b')], layout, 'p1', noop, noop)
    );
    expect(result.current.layout).toEqual(layout);
  });

  it('displayLayout equals layout when not dragging', () => {
    const layout = makeLayout(['a']);
    const { result } = renderHook(() =>
      useDashboardLayout([makeWidget('a')], layout, 'p1', noop, noop)
    );
    expect(result.current.displayLayout).toEqual(result.current.layout);
  });
});

// ---------------------------------------------------------------------------
// Page switch
// ---------------------------------------------------------------------------

describe('useDashboardLayout — page switch', () => {
  it('resets to the new page layout when pageId changes', () => {
    const layout1 = [{ i: 'a', x: 0, y: 0, w: 2, h: 3 }];
    const layout2 = [{ i: 'b', x: 4, y: 6, w: 2, h: 3 }];

    // Each page only exposes the widgets that belong to it, so reconciliation
    // does not inject unexpected extra entries into the layout.
    const { result, rerender } = renderHook(
      ({
        pageId,
        pageLayout,
        widgets,
      }: {
        pageId: string;
        pageLayout: Layout;
        widgets: ReturnType<typeof makeWidget>[];
      }) => useDashboardLayout(widgets, pageLayout, pageId, noop, noop),
      { initialProps: { pageId: 'p1', pageLayout: layout1, widgets: [makeWidget('a')] } }
    );

    expect(result.current.layout).toEqual(layout1);

    rerender({ pageId: 'p2', pageLayout: layout2, widgets: [makeWidget('b')] });
    expect(result.current.layout).toEqual(layout2);
  });
});

// ---------------------------------------------------------------------------
// Widget reconciliation
// ---------------------------------------------------------------------------

describe('useDashboardLayout — widget reconciliation', () => {
  it('adds default layout entry for a newly added widget', () => {
    const layout = makeLayout(['a']);
    const widgets1 = [makeWidget('a')];
    const widgets2 = [makeWidget('a'), makeWidget('b')];

    const { result, rerender } = renderHook(
      ({ widgets }: { widgets: WidgetManifest[] }) =>
        useDashboardLayout(widgets, layout, 'p1', noop, noop),
      { initialProps: { widgets: widgets1 } }
    );

    expect(result.current.layout.map((l) => l.i)).toEqual(['a']);

    rerender({ widgets: widgets2 });
    expect(result.current.layout.map((l) => l.i)).toContain('b');
  });
});

// ---------------------------------------------------------------------------
// Drag — swap behaviour
// ---------------------------------------------------------------------------

describe('useDashboardLayout — drag swap', () => {
  const baseLayout: Layout = [
    { i: 'a', x: 0, y: 0, w: 2, h: 3 },
    { i: 'b', x: 2, y: 0, w: 2, h: 3 },
  ];

  it('swaps two items when the dragged item centre overlaps a target', () => {
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        baseLayout,
        'p1',
        noop,
        noop
      )
    );

    act(() => {
      // Start dragging 'a' from (0,0)
      result.current.onDragStart(baseLayout, baseLayout[0]!);
    });

    act(() => {
      // Drop 'a' at (2,0) — centre (3, 1.5) falls inside 'b' [x:2..4, y:0..3]
      result.current.onDragStop(baseLayout, baseLayout[0]!, {
        i: 'a',
        x: 2,
        y: 0,
        w: 2,
        h: 3,
      });
    });

    const a = result.current.layout.find((item) => item.i === 'a')!;
    const b = result.current.layout.find((item) => item.i === 'b')!;
    expect(a.x).toBe(2); // 'a' moved to 'b' original position
    expect(b.x).toBe(0); // 'b' moved to 'a' original position
  });

  it('preserves both items sizes after a swap', () => {
    const mixedLayout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 4, h: 6 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        mixedLayout,
        'p1',
        noop,
        noop
      )
    );

    act(() => { result.current.onDragStart(mixedLayout, mixedLayout[0]!); });
    act(() => {
      result.current.onDragStop(mixedLayout, mixedLayout[0]!, {
        i: 'a',
        x: 2,
        y: 0,
        w: 2,
        h: 3,
      });
    });

    const a = result.current.layout.find((item) => item.i === 'a')!;
    const b = result.current.layout.find((item) => item.i === 'b')!;
    expect(a.w).toBe(2); // 'a' keeps its own size
    expect(b.w).toBe(4); // 'b' keeps its own size
    expect(b.h).toBe(6);
  });

  it('does not affect a third unrelated item during a swap', () => {
    const threeLayout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
      { i: 'c', x: 4, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b'), makeWidget('c')],
        threeLayout,
        'p1',
        noop,
        noop
      )
    );

    act(() => { result.current.onDragStart(threeLayout, threeLayout[0]!); });
    act(() => {
      result.current.onDragStop(threeLayout, threeLayout[0]!, {
        i: 'a',
        x: 2,
        y: 0,
        w: 2,
        h: 3,
      });
    });

    const c = result.current.layout.find((item) => item.i === 'c')!;
    expect(c.x).toBe(4); // unchanged
  });
});

// ---------------------------------------------------------------------------
// Drag — free drop (no overlap target)
// ---------------------------------------------------------------------------

describe('useDashboardLayout — free drop', () => {
  it('moves the dragged item to the drop position when no overlap is found', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        noop,
        noop
      )
    );

    act(() => { result.current.onDragStart(layout, layout[0]!); });
    act(() => {
      // Drop 'a' at (6,0) — no other widget there
      result.current.onDragStop(layout, layout[0]!, {
        i: 'a',
        x: 6,
        y: 0,
        w: 2,
        h: 3,
      });
    });

    const a = result.current.layout.find((item) => item.i === 'a')!;
    const b = result.current.layout.find((item) => item.i === 'b')!;
    expect(a.x).toBe(6); // moved freely
    expect(b.x).toBe(2); // unchanged
  });
});

// ---------------------------------------------------------------------------
// Drag — live layout (no push)
// ---------------------------------------------------------------------------

describe('useDashboardLayout — live drag layout', () => {
  it('sets displayLayout to the live position during drag', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        noop,
        noop
      )
    );

    act(() => {
      result.current.onDragStart(layout, layout[0]!);
      result.current.onDrag(layout, layout[0]!, { i: 'a', x: 4, y: 0, w: 2, h: 3 });
    });

    const liveA = result.current.displayLayout.find((item) => item.i === 'a')!;
    expect(liveA.x).toBe(4); // 'a' at live position
  });

  it('keeps non-dragged items frozen at pre-drag positions during drag', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        noop,
        noop
      )
    );

    act(() => {
      result.current.onDragStart(layout, layout[0]!);
      // 'a' dragged onto 'b' position — 'b' must NOT be pushed
      result.current.onDrag(layout, layout[0]!, { i: 'a', x: 2, y: 0, w: 2, h: 3 });
    });

    const liveB = result.current.displayLayout.find((item) => item.i === 'b')!;
    expect(liveB.x).toBe(2); // frozen at original position
  });

  it('clears live layout after drag stops (displayLayout equals layout)', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        noop,
        noop
      )
    );

    act(() => {
      result.current.onDragStart(layout, layout[0]!);
      result.current.onDrag(layout, layout[0]!, { i: 'a', x: 4, y: 0, w: 2, h: 3 });
      result.current.onDragStop(layout, layout[0]!, { i: 'a', x: 4, y: 0, w: 2, h: 3 });
    });

    expect(result.current.displayLayout).toEqual(result.current.layout);
  });
});

// ---------------------------------------------------------------------------
// handleLayoutChange suppression
// ---------------------------------------------------------------------------

describe('useDashboardLayout — handleLayoutChange suppression', () => {
  it('ignores RGL layout events fired during a drag', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        noop,
        noop
      )
    );

    act(() => { result.current.onDragStart(layout, layout[0]!); });

    // Simulate RGL firing onLayoutChange mid-drag with a pushed layout
    const pushedLayout: Layout = [
      { i: 'a', x: 2, y: 0, w: 2, h: 3 }, // pushed
      { i: 'b', x: 4, y: 0, w: 2, h: 3 }, // pushed
    ];
    act(() => {
      result.current.handleLayoutChange(pushedLayout, { lg: pushedLayout });
    });

    // Layout must not have changed — the event was suppressed
    expect(result.current.layout).toEqual(layout);
  });

  it('ignores the first RGL layout event that fires after drag stops', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        noop,
        noop
      )
    );

    // Perform a swap
    act(() => { result.current.onDragStart(layout, layout[0]!); });
    act(() => {
      result.current.onDragStop(layout, layout[0]!, { i: 'a', x: 2, y: 0, w: 2, h: 3 });
    });

    const swappedLayout = result.current.layout;
    const aAfterSwap = swappedLayout.find((item) => item.i === 'a')!;
    expect(aAfterSwap.x).toBe(2); // swap succeeded

    // Now RGL fires its own post-drag layout change with the pushed (non-swapped) result
    const rglComputedPushed: Layout = [
      { i: 'a', x: 2, y: 0, w: 2, h: 3 },
      { i: 'b', x: 4, y: 0, w: 2, h: 3 }, // pushed, not swapped
    ];
    act(() => {
      result.current.handleLayoutChange(rglComputedPushed, { lg: rglComputedPushed });
    });

    // The swap result must survive — the post-drag RGL event was swallowed
    const b = result.current.layout.find((item) => item.i === 'b')!;
    expect(b.x).toBe(0); // b is at a's original position (swap), not pushed to x:4
  });

  it('accepts layout changes normally once the suppression window is over', () => {
    const layout: Layout = [{ i: 'a', x: 0, y: 0, w: 2, h: 3 }];
    const { result } = renderHook(() =>
      useDashboardLayout([makeWidget('a')], layout, 'p1', noop, noop)
    );

    // No drag happened — handleLayoutChange should work as normal
    const newLayout: Layout = [{ i: 'a', x: 4, y: 0, w: 2, h: 3 }];
    act(() => {
      result.current.handleLayoutChange(newLayout, { lg: newLayout });
    });

    expect(result.current.layout.find((item) => item.i === 'a')!.x).toBe(4);
  });
});

// ---------------------------------------------------------------------------
// onLayoutChange propagation
// ---------------------------------------------------------------------------

describe('useDashboardLayout — onLayoutChange propagation', () => {
  it('calls onLayoutChange with the swap result after drag stops', () => {
    const layout: Layout = [
      { i: 'a', x: 0, y: 0, w: 2, h: 3 },
      { i: 'b', x: 2, y: 0, w: 2, h: 3 },
    ];
    const onLayoutChange = jest.fn();
    const { result } = renderHook(() =>
      useDashboardLayout(
        [makeWidget('a'), makeWidget('b')],
        layout,
        'p1',
        onLayoutChange,
        noop
      )
    );

    onLayoutChange.mockClear(); // ignore the initial propagation

    act(() => { result.current.onDragStart(layout, layout[0]!); });
    act(() => {
      result.current.onDragStop(layout, layout[0]!, { i: 'a', x: 2, y: 0, w: 2, h: 3 });
    });

    const lastCall = onLayoutChange.mock.calls.at(-1)?.[0] as Layout;
    const a = lastCall?.find((item: LayoutItem) => item.i === 'a');
    const b = lastCall?.find((item: LayoutItem) => item.i === 'b');
    expect(a?.x).toBe(2);
    expect(b?.x).toBe(0);
  });
});
