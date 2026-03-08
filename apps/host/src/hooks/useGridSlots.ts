import { useMemo } from 'react';

type SavedLayout = { i: string; x: number; y: number; w: number; h: number }[];

export type SlotPosition = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
};

const DEFAULT_H = 3;
const MAX_SLOTS = 8;

/**
 * Computes empty slot positions where new widgets can be placed.
 *
 * Improvements over the previous version:
 * - Scans every column position (x = 0…columns-1), not just even columns.
 * - Prefers 2-wide slots but falls back to 1-wide for tight gaps.
 * - Uses a `slotOccupied` set so placed slots never overlap each other.
 * - Raises MAX_SLOTS to 8 for better empty-page coverage.
 */
export function useGridSlots(
  layout: SavedLayout,
  columns: number,
  isVisible: boolean
): SlotPosition[] {
  return useMemo(() => {
    if (!isVisible) return [];

    // Build widget occupancy
    const occupied = new Set<string>();
    let maxY = 0;
    for (const item of layout) {
      for (let col = item.x; col < item.x + item.w; col++) {
        for (let row = item.y; row < item.y + item.h; row++) {
          occupied.add(`${col},${row}`);
        }
      }
      maxY = Math.max(maxY, item.y + item.h);
    }

    const slots: SlotPosition[] = [];
    const slotOccupied = new Set<string>();

    const isFree = (x: number, y: number, w: number): boolean => {
      for (let col = x; col < x + w; col++) {
        for (let row = y; row < y + DEFAULT_H; row++) {
          if (occupied.has(`${col},${row}`) || slotOccupied.has(`${col},${row}`)) return false;
        }
      }
      return true;
    };

    const placeSlot = (x: number, y: number, w: number) => {
      slots.push({ id: `__slot_${slots.length}`, x, y, w, h: DEFAULT_H });
      for (let col = x; col < x + w; col++) {
        for (let row = y; row < y + DEFAULT_H; row++) {
          slotOccupied.add(`${col},${row}`);
        }
      }
    };

    // Scan row by row, column by column. The slotOccupied set ensures
    // previously placed slots are not revisited even when y step is 1.
    for (let y = 0; y <= maxY + DEFAULT_H && slots.length < MAX_SLOTS; y++) {
      for (let x = 0; x < columns && slots.length < MAX_SLOTS; x++) {
        if (slotOccupied.has(`${x},${y}`)) continue;

        // Prefer 2-wide; fall back to 1-wide for single-column gaps
        const preferredWidths = x + 2 <= columns ? [2, 1] : [1];
        for (const w of preferredWidths) {
          if (isFree(x, y, w)) {
            placeSlot(x, y, w);
            break;
          }
        }
      }
    }

    // Guarantee at least one slot so the page is never completely blank
    if (slots.length === 0) {
      slots.push({
        id: '__slot_0',
        x: 0,
        y: maxY,
        w: Math.min(2, columns),
        h: DEFAULT_H,
      });
    }

    return slots;
  }, [layout, columns, isVisible]);
}
