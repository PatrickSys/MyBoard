import { WidgetProcessManager } from '../src/lib/widget-process-manager';

describe('widget-process-manager', () => {
  let now = 0;
  let manager: WidgetProcessManager;

  beforeEach(() => {
    now = 0;
    localStorage.clear();
    manager = new WidgetProcessManager({
      now: () => now,
      crashThreshold: 3,
      crashWindowMs: 5 * 60 * 1000,
      storageKey: 'test.widget-process-manager',
    });
    manager.__resetForTests();
  });

  it('quarantines widget after crash threshold in window', () => {
    manager.recordCrash('notes', 'widget-error');
    now += 1000;
    manager.recordCrash('notes', 'widget-error');
    now += 1000;
    const health = manager.recordCrash('notes', 'widget-error');

    expect(health.state).toBe('quarantined');
    expect(health.crashCountInWindow).toBe(3);
    expect(manager.isQuarantined('notes')).toBe(true);
  });

  it('does not quarantine when crashes fall outside window', () => {
    manager.recordCrash('notes');
    now += 6 * 60 * 1000;
    manager.recordCrash('notes');
    now += 1000;
    const health = manager.recordCrash('notes');

    expect(health.state).toBe('healthy');
    expect(health.crashCountInWindow).toBe(2);
  });

  it('clears quarantine explicitly', () => {
    manager.quarantine('pomodoro', 'MANUAL');
    const cleared = manager.clearQuarantine('pomodoro');

    expect(cleared.state).toBe('healthy');
    expect(cleared.crashCountInWindow).toBe(0);
    expect(manager.isQuarantined('pomodoro')).toBe(false);
  });
});
