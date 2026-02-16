export type EventGovernanceDecision =
  | { allowed: true; throttled: false }
  | { allowed: false; throttled: true; code: 'EVENT_RATE_LIMITED'; reason: string };

export type EventGovernorState = {
  widgetId: string;
  tokens: number;
  throttled: boolean;
  lastRefillAt: number;
};

type EventGovernorOptions = {
  burstCapacity?: number;
  refillPerSecond?: number;
  now?: () => number;
  onThrottleChange?: (state: {
    widgetId: string;
    throttled: boolean;
    timestamp: number;
  }) => void;
};

const DEFAULT_BURST_CAPACITY = 30;
const DEFAULT_REFILL_PER_SECOND = 5;

export class EventGovernor {
  private readonly burstCapacity: number;
  private readonly refillPerSecond: number;
  private readonly now: () => number;
  private readonly onThrottleChange?: EventGovernorOptions['onThrottleChange'];
  private stateByWidget = new Map<string, EventGovernorState>();

  constructor(options: EventGovernorOptions = {}) {
    this.burstCapacity = options.burstCapacity ?? DEFAULT_BURST_CAPACITY;
    this.refillPerSecond = options.refillPerSecond ?? DEFAULT_REFILL_PER_SECOND;
    this.now = options.now ?? (() => Date.now());
    this.onThrottleChange = options.onThrottleChange;
  }

  canPublish(widgetId: string): EventGovernanceDecision {
    const state = this.refill(widgetId);
    if (state.tokens >= 1) {
      state.tokens -= 1;
      if (state.throttled) {
        state.throttled = false;
        this.onThrottleChange?.({
          widgetId,
          throttled: false,
          timestamp: this.now(),
        });
      }
      return { allowed: true, throttled: false };
    }

    if (!state.throttled) {
      state.throttled = true;
      this.onThrottleChange?.({
        widgetId,
        throttled: true,
        timestamp: this.now(),
      });
    }

    return {
      allowed: false,
      throttled: true,
      code: 'EVENT_RATE_LIMITED',
      reason: `${widgetId} exceeded ${this.burstCapacity} burst tokens`,
    };
  }

  getState(widgetId: string): EventGovernorState {
    return { ...this.refill(widgetId) };
  }

  listStates(): EventGovernorState[] {
    return Array.from(this.stateByWidget.values()).map((state) => ({ ...state }));
  }

  __resetForTests(): void {
    this.stateByWidget.clear();
  }

  private refill(widgetId: string): EventGovernorState {
    const now = this.now();
    const existing = this.stateByWidget.get(widgetId) ?? {
      widgetId,
      tokens: this.burstCapacity,
      throttled: false,
      lastRefillAt: now,
    };

    const elapsedMs = now - existing.lastRefillAt;
    if (elapsedMs > 0) {
      const replenished = (elapsedMs / 1000) * this.refillPerSecond;
      existing.tokens = Math.min(this.burstCapacity, existing.tokens + replenished);
      existing.lastRefillAt = now;
    }

    this.stateByWidget.set(widgetId, existing);
    return existing;
  }
}

export const eventGovernor = new EventGovernor();
