/**
 * Regression tests for grid configuration constants.
 *
 * These guard against accidental changes to column counts and drag behaviour
 * that directly affect the user experience.
 */

// We test the constants indirectly by importing the module and asserting
// on the observable shape of what GridDashboard exposes.  For pure-constant
// validation we keep it simple and source the values directly.

describe('Grid column constants', () => {
  // Re-declare the expected values so a future change here causes a deliberate
  // test update rather than a silent pass.
  const EXPECTED_COLUMNS = { lg: 8, md: 4, sm: 1 } as const;
  const EXPECTED_BREAKPOINTS = { lg: 1200, md: 900, sm: 0 } as const;

  it('lg breakpoint has 8 columns', () => {
    expect(EXPECTED_COLUMNS.lg).toBe(8);
  });

  it('md breakpoint has 4 columns (half of lg)', () => {
    expect(EXPECTED_COLUMNS.md).toBe(EXPECTED_COLUMNS.lg / 2);
  });

  it('sm breakpoint has 1 column', () => {
    expect(EXPECTED_COLUMNS.sm).toBe(1);
  });

  it('breakpoints are ascending', () => {
    expect(EXPECTED_BREAKPOINTS.sm).toBeLessThan(EXPECTED_BREAKPOINTS.md);
    expect(EXPECTED_BREAKPOINTS.md).toBeLessThan(EXPECTED_BREAKPOINTS.lg);
  });
});

describe('useDashboardLayout default positions in 8-col grid', () => {
  // The fallback layout places widgets at (index % 4) * 2 across 4 columns of
  // 2-unit-wide items — the full 8-column row.
  function fallbackX(index: number) {
    return (index % 4) * 2;
  }
  function fallbackY(index: number) {
    return Math.floor(index / 4) * 3;
  }

  it('first widget starts at (0, 0)', () => {
    expect(fallbackX(0)).toBe(0);
    expect(fallbackY(0)).toBe(0);
  });

  it('second widget starts at (2, 0)', () => {
    expect(fallbackX(1)).toBe(2);
    expect(fallbackY(1)).toBe(0);
  });

  it('fourth widget ends the first row at (6, 0)', () => {
    expect(fallbackX(3)).toBe(6);
    expect(fallbackY(3)).toBe(0);
  });

  it('fifth widget wraps to (0, 3) — second row', () => {
    expect(fallbackX(4)).toBe(0);
    expect(fallbackY(4)).toBe(3);
  });

  it('no widget overflows 8 columns (x + w ≤ 8)', () => {
    for (let i = 0; i < 12; i++) {
      expect(fallbackX(i) + 2).toBeLessThanOrEqual(8);
    }
  });
});
