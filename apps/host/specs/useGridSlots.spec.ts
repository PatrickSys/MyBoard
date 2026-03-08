import { renderHook } from '@testing-library/react';
import { useGridSlots } from '../src/hooks/useGridSlots';

type Layout = { i: string; x: number; y: number; w: number; h: number }[];

describe('useGridSlots', () => {
  describe('when not visible', () => {
    it('returns empty array', () => {
      const { result } = renderHook(() => useGridSlots([], 8, false));
      expect(result.current).toEqual([]);
    });
  });

  describe('empty layout', () => {
    it('places a slot at the origin', () => {
      const { result } = renderHook(() => useGridSlots([], 8, true));
      expect(result.current.length).toBeGreaterThan(0);
      const first = result.current[0];
      expect(first.x).toBe(0);
      expect(first.y).toBe(0);
    });

    it('slots do not exceed MAX_SLOTS (8)', () => {
      const { result } = renderHook(() => useGridSlots([], 8, true));
      expect(result.current.length).toBeLessThanOrEqual(8);
    });

    it('slot ids are prefixed with __slot_', () => {
      const { result } = renderHook(() => useGridSlots([], 8, true));
      for (const slot of result.current) {
        expect(slot.id).toMatch(/^__slot_/);
      }
    });
  });

  describe('slot non-overlap with existing widgets', () => {
    it('does not place a slot on top of an existing widget', () => {
      const layout: Layout = [{ i: 'a', x: 0, y: 0, w: 2, h: 3 }];
      const { result } = renderHook(() => useGridSlots(layout, 8, true));
      for (const slot of result.current) {
        const overlapsA =
          slot.x < 2 &&
          slot.x + slot.w > 0 &&
          slot.y < 3 &&
          slot.y + slot.h > 0;
        expect(overlapsA).toBe(false);
      }
    });

    it('does not place slots that overlap each other', () => {
      const { result } = renderHook(() => useGridSlots([], 8, true));
      const slots = result.current;
      for (let i = 0; i < slots.length; i++) {
        for (let j = i + 1; j < slots.length; j++) {
          const a = slots[i];
          const b = slots[j];
          const overlaps =
            a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y < b.y + b.h &&
            a.y + a.h > b.y;
          expect(overlaps).toBe(false);
        }
      }
    });
  });

  describe('8-column grid slot placement', () => {
    it('fits slots within 8 columns', () => {
      const { result } = renderHook(() => useGridSlots([], 8, true));
      for (const slot of result.current) {
        expect(slot.x + slot.w).toBeLessThanOrEqual(8);
      }
    });

    it('places slots in column gaps when grid is partially filled', () => {
      // Two 2-wide widgets at x=0 and x=2 — columns 4..7 should have free slots
      const layout: Layout = [
        { i: 'a', x: 0, y: 0, w: 2, h: 3 },
        { i: 'b', x: 2, y: 0, w: 2, h: 3 },
      ];
      const { result } = renderHook(() => useGridSlots(layout, 8, true));
      const hasSlotInFreeColumns = result.current.some(
        (s) => s.x >= 4 && s.y === 0
      );
      expect(hasSlotInFreeColumns).toBe(true);
    });

    it('places a slot after the last row when all columns are filled', () => {
      // Fill all 8 columns of row 0
      const layout: Layout = [
        { i: 'a', x: 0, y: 0, w: 2, h: 3 },
        { i: 'b', x: 2, y: 0, w: 2, h: 3 },
        { i: 'c', x: 4, y: 0, w: 2, h: 3 },
        { i: 'd', x: 6, y: 0, w: 2, h: 3 },
      ];
      const { result } = renderHook(() => useGridSlots(layout, 8, true));
      const slotBelowRow = result.current.some((s) => s.y >= 3);
      expect(slotBelowRow).toBe(true);
    });
  });

  describe('guarantees at least one slot', () => {
    it('still returns a slot when the layout is completely packed', () => {
      // Fill a huge number of cells to exhaust MAX_SLOTS — should still have ≥1
      const layout: Layout = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          layout.push({ i: `w${row}_${col}`, x: col * 2, y: row * 3, w: 2, h: 3 });
        }
      }
      const { result } = renderHook(() => useGridSlots(layout, 8, true));
      expect(result.current.length).toBeGreaterThan(0);
    });
  });
});
