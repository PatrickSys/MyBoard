export type TelemetryPoint = {
  timestamp: number;
  eventsPerSecond: number;
  errorCount: number;
  averageRenderMs: number;
};

type BucketAggregate = {
  events: number;
  errors: number;
  renderTotalMs: number;
  renderSamples: number;
};

type WidgetBucketStore = Map<string, BucketAggregate>;

type TelemetryQuery = {
  widgetId?: string;
  from?: number;
  to?: number;
  limit?: number;
};

type TelemetryOptions = {
  maxPoints?: number;
  bucketMs?: number;
  now?: () => number;
};

const DEFAULT_BUCKET_MS = 1000;
const DEFAULT_MAX_POINTS = 600;

function emptyAggregate(): BucketAggregate {
  return {
    events: 0,
    errors: 0,
    renderTotalMs: 0,
    renderSamples: 0,
  };
}

function normalizeBucket(timestamp: number, bucketMs: number): number {
  return Math.floor(timestamp / bucketMs) * bucketMs;
}

export class WidgetTelemetryService {
  private readonly maxPoints: number;
  private readonly bucketMs: number;
  private readonly now: () => number;
  private buckets = new Map<number, WidgetBucketStore>();

  constructor(options: TelemetryOptions = {}) {
    this.maxPoints = options.maxPoints ?? DEFAULT_MAX_POINTS;
    this.bucketMs = options.bucketMs ?? DEFAULT_BUCKET_MS;
    this.now = options.now ?? (() => Date.now());
  }

  recordEvent(widgetId: string, timestamp = this.now()): void {
    this.mutateBucket(widgetId, timestamp, (aggregate) => {
      aggregate.events += 1;
    });
  }

  recordError(widgetId: string, timestamp = this.now()): void {
    this.mutateBucket(widgetId, timestamp, (aggregate) => {
      aggregate.errors += 1;
    });
  }

  recordRender(widgetId: string, durationMs: number, timestamp = this.now()): void {
    this.mutateBucket(widgetId, timestamp, (aggregate) => {
      aggregate.renderTotalMs += durationMs;
      aggregate.renderSamples += 1;
    });
  }

  query(query: TelemetryQuery = {}): TelemetryPoint[] {
    const from = query.from ?? Number.MIN_SAFE_INTEGER;
    const to = query.to ?? Number.MAX_SAFE_INTEGER;
    const timestamps = Array.from(this.buckets.keys())
      .filter((timestamp) => timestamp >= from && timestamp <= to)
      .sort((left, right) => left - right);

    const points = timestamps.map((timestamp) =>
      this.buildPoint(timestamp, query.widgetId)
    );

    if (!query.limit || query.limit >= points.length) {
      return points;
    }
    return points.slice(points.length - query.limit);
  }

  __resetForTests(): void {
    this.buckets.clear();
  }

  private mutateBucket(
    widgetId: string,
    timestamp: number,
    mutate: (aggregate: BucketAggregate) => void
  ): void {
    const bucketKey = normalizeBucket(timestamp, this.bucketMs);
    const widgets = this.buckets.get(bucketKey) ?? new Map<string, BucketAggregate>();
    const aggregate = widgets.get(widgetId) ?? emptyAggregate();
    mutate(aggregate);
    widgets.set(widgetId, aggregate);
    this.buckets.set(bucketKey, widgets);
    this.enforceRetention();
  }

  private buildPoint(timestamp: number, widgetId?: string): TelemetryPoint {
    const widgets = this.buckets.get(timestamp) ?? new Map<string, BucketAggregate>();
    const aggregate = widgetId
      ? widgets.get(widgetId) ?? emptyAggregate()
      : this.mergeAggregates(widgets);

    return {
      timestamp,
      eventsPerSecond: aggregate.events,
      errorCount: aggregate.errors,
      averageRenderMs:
        aggregate.renderSamples === 0
          ? 0
          : aggregate.renderTotalMs / aggregate.renderSamples,
    };
  }

  private mergeAggregates(widgets: WidgetBucketStore): BucketAggregate {
    const merged = emptyAggregate();
    for (const aggregate of widgets.values()) {
      merged.events += aggregate.events;
      merged.errors += aggregate.errors;
      merged.renderTotalMs += aggregate.renderTotalMs;
      merged.renderSamples += aggregate.renderSamples;
    }
    return merged;
  }

  private enforceRetention(): void {
    if (this.buckets.size <= this.maxPoints) return;
    const sorted = Array.from(this.buckets.keys()).sort((left, right) => left - right);
    while (sorted.length > this.maxPoints) {
      const oldest = sorted.shift();
      if (oldest === undefined) break;
      this.buckets.delete(oldest);
    }
  }
}

export const widgetTelemetryService = new WidgetTelemetryService();
