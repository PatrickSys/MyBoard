/**
 * Lightweight performance tracking for widgets.
 *
 * Tracks only what's actually useful: load times and error counts.
 */

export interface WidgetPerformance {
  widgetId: string;
  loadStartTime: number;
  loadEndTime?: number;
  loadDuration?: number;
  errorCount: number;
  status: 'loading' | 'ready' | 'error';
}

class PerformanceTracker {
  private metrics = new Map<string, WidgetPerformance>();

  /**
   * Start tracking a widget load.
   */
  startTracking(widgetId: string): void {
    this.metrics.set(widgetId, {
      widgetId,
      loadStartTime: performance.now(),
      errorCount: 0,
      status: 'loading',
    });
  }

  /**
   * Mark widget as ready and record load time.
   */
  markReady(widgetId: string): void {
    const metric = this.metrics.get(widgetId);
    if (metric) {
      const now = performance.now();
      metric.loadEndTime = now;
      metric.loadDuration = now - metric.loadStartTime;
      metric.status = 'ready';
    }
  }

  /**
   * Mark widget as errored and increment error count.
   */
  markError(widgetId: string): void {
    const metric = this.metrics.get(widgetId);
    if (metric) {
      metric.errorCount += 1;
      metric.status = 'error';
    }
  }

  /**
   * Get performance data for a widget.
   */
  getMetrics(widgetId: string): WidgetPerformance | undefined {
    return this.metrics.get(widgetId);
  }

  /**
   * Get all performance metrics.
   */
  getAllMetrics(): WidgetPerformance[] {
    return Array.from(this.metrics.values());
  }

  /**
   * Clear metrics for a specific widget.
   */
  clear(widgetId: string): void {
    this.metrics.delete(widgetId);
  }

  /**
   * Clear all metrics.
   */
  clearAll(): void {
    this.metrics.clear();
  }
}

/**
 * Global performance tracker instance.
 */
export const performanceTracker = new PerformanceTracker();

