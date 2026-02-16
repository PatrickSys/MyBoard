import { EventGovernor } from '../src/lib/event-governor';

describe('event-governor', () => {
  let now = 0;

  function createGovernor() {
    return new EventGovernor({
      burstCapacity: 3,
      refillPerSecond: 1,
      now: () => now,
    });
  }

  it('allows events within burst capacity and throttles overflow', () => {
    const governor = createGovernor();

    expect(governor.canPublish('notes').allowed).toBe(true);
    expect(governor.canPublish('notes').allowed).toBe(true);
    expect(governor.canPublish('notes').allowed).toBe(true);
    const blocked = governor.canPublish('notes');

    expect(blocked.allowed).toBe(false);
    expect(blocked.throttled).toBe(true);
  });

  it('refills tokens over time', () => {
    const governor = createGovernor();

    governor.canPublish('notes');
    governor.canPublish('notes');
    governor.canPublish('notes');
    expect(governor.canPublish('notes').allowed).toBe(false);

    now += 2000;
    expect(governor.canPublish('notes').allowed).toBe(true);
    expect(governor.canPublish('notes').allowed).toBe(true);
    expect(governor.canPublish('notes').allowed).toBe(false);
  });

  it('isolates rate limits by widget', () => {
    const governor = createGovernor();

    governor.canPublish('notes');
    governor.canPublish('notes');
    governor.canPublish('notes');
    expect(governor.canPublish('notes').allowed).toBe(false);

    expect(governor.canPublish('pomodoro').allowed).toBe(true);
  });
});
