type ProcessState = 'healthy' | 'quarantined';

export type WidgetHealth = {
  widgetId: string;
  state: ProcessState;
  crashCountInWindow: number;
  crashes: number[];
  quarantineReason?: string;
  updatedAt: number;
};

type PersistedState = {
  version: 1;
  records: WidgetHealth[];
};

type ProcessManagerOptions = {
  storageKey?: string;
  crashThreshold?: number;
  crashWindowMs?: number;
  now?: () => number;
};

const DEFAULT_STORAGE_KEY = 'myboard.widget-processes.v1';

function defaultHealth(widgetId: string, now: number): WidgetHealth {
  return {
    widgetId,
    state: 'healthy',
    crashCountInWindow: 0,
    crashes: [],
    updatedAt: now,
  };
}

export class WidgetProcessManager {
  private records = new Map<string, WidgetHealth>();
  private readonly storageKey: string;
  private readonly crashThreshold: number;
  private readonly crashWindowMs: number;
  private readonly now: () => number;

  constructor(options: ProcessManagerOptions = {}) {
    this.storageKey = options.storageKey ?? DEFAULT_STORAGE_KEY;
    this.crashThreshold = options.crashThreshold ?? 3;
    this.crashWindowMs = options.crashWindowMs ?? 5 * 60 * 1000;
    this.now = options.now ?? (() => Date.now());
    this.load();
  }

  getHealth(widgetId: string): WidgetHealth {
    const existing = this.records.get(widgetId);
    if (existing) {
      const normalized = this.normalizeRecord(existing);
      this.records.set(widgetId, normalized);
      return normalized;
    }
    const created = defaultHealth(widgetId, this.now());
    this.records.set(widgetId, created);
    return created;
  }

  isQuarantined(widgetId: string): boolean {
    return this.getHealth(widgetId).state === 'quarantined';
  }

  recordCrash(widgetId: string, reason?: string): WidgetHealth {
    const now = this.now();
    const current = this.getHealth(widgetId);
    const crashes = [...current.crashes, now].filter((timestamp) => now - timestamp <= this.crashWindowMs);
    const next: WidgetHealth = {
      ...current,
      crashes,
      crashCountInWindow: crashes.length,
      updatedAt: now,
    };

    if (crashes.length >= this.crashThreshold) {
      next.state = 'quarantined';
      next.quarantineReason = reason ?? 'CRASH_THRESHOLD_REACHED';
    }

    this.records.set(widgetId, next);
    this.persist();
    return next;
  }

  quarantine(widgetId: string, reason = 'MANUAL_QUARANTINE'): WidgetHealth {
    const now = this.now();
    const current = this.getHealth(widgetId);
    const next: WidgetHealth = {
      ...current,
      state: 'quarantined',
      quarantineReason: reason,
      updatedAt: now,
    };
    this.records.set(widgetId, next);
    this.persist();
    return next;
  }

  clearQuarantine(widgetId: string): WidgetHealth {
    const now = this.now();
    const current = this.getHealth(widgetId);
    const next: WidgetHealth = {
      ...current,
      state: 'healthy',
      quarantineReason: undefined,
      crashCountInWindow: 0,
      crashes: [],
      updatedAt: now,
    };
    this.records.set(widgetId, next);
    this.persist();
    return next;
  }

  listHealth(): WidgetHealth[] {
    return Array.from(this.records.values()).map((record) => this.normalizeRecord(record));
  }

  __resetForTests(): void {
    this.records.clear();
    this.persist();
  }

  private normalizeRecord(record: WidgetHealth): WidgetHealth {
    const now = this.now();
    const crashes = record.crashes.filter((timestamp) => now - timestamp <= this.crashWindowMs);
    // Auto-heal crash-threshold quarantines once all crash timestamps age out of the window.
    // Manual quarantines (FORCE_KILL, MANUAL_QUARANTINE) are kept until explicitly cleared.
    const autoQuarantined = record.quarantineReason === 'CRASH_THRESHOLD_REACHED';
    const state =
      autoQuarantined && crashes.length < this.crashThreshold ? 'healthy' : record.state;
    return {
      ...record,
      crashes,
      crashCountInWindow: crashes.length,
      state,
      quarantineReason: state === 'healthy' ? undefined : record.quarantineReason,
      updatedAt: record.updatedAt,
    };
  }

  private persist(): void {
    if (typeof window === 'undefined') return;
    try {
      const payload: PersistedState = {
        version: 1,
        records: this.listHealth(),
      };
      window.localStorage.setItem(this.storageKey, JSON.stringify(payload));
    } catch {
      // Ignore storage errors in restricted contexts.
    }
  }

  private load(): void {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem(this.storageKey);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PersistedState;
      if (parsed.version !== 1 || !Array.isArray(parsed.records)) return;
      for (const record of parsed.records) {
        if (!record?.widgetId) continue;
        this.records.set(record.widgetId, this.normalizeRecord(record));
      }
    } catch {
      this.records.clear();
    }
  }
}

export const widgetProcessManager = new WidgetProcessManager();
