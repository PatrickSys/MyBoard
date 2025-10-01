import { WidgetPerformanceMonitor as IWidgetPerformanceMonitor, WidgetMetrics } from './types';
import { globalEventBus } from './event-bus';

/**
 * Widget Performance Monitor
 * 
 * Tracks and monitors widget performance with:
 * - Real-time metrics collection
 * - Memory usage tracking
 * - Error monitoring
 * - Performance alerts
 * - Historical data
 */
export class WidgetPerformanceMonitor implements IWidgetPerformanceMonitor {
  private metrics: Map<string, WidgetMetrics> = new Map();
  private metricsHistory: Map<string, WidgetMetrics[]> = new Map();
  private maxHistorySize = 50;
  private alertThresholds = {
    loadTime: 5000, // 5 seconds
    renderTime: 1000, // 1 second
    memoryUsage: 100 * 1024 * 1024, // 100MB
    errorCount: 5
  };

  constructor() {
    this.setupEventListeners();
    this.startPeriodicCollection();
  }

  /**
   * Track widget metrics
   */
  public track(widgetId: string, metrics: Partial<WidgetMetrics>): void {
    const currentMetrics = this.metrics.get(widgetId) || this.createDefaultMetrics();
    const updatedMetrics = { ...currentMetrics, ...metrics };
    
    this.metrics.set(widgetId, updatedMetrics);
    this.addToHistory(widgetId, updatedMetrics);
    this.checkThresholds(widgetId, updatedMetrics);

    globalEventBus.emit({
      type: 'widget-metrics-updated',
      source: 'performance-monitor',
      data: { widgetId, metrics: updatedMetrics },
      timestamp: Date.now(),
      id: `metrics-${Date.now()}`
    });
  }

  /**
   * Get metrics for a widget
   */
  public getMetrics(widgetId: string): WidgetMetrics | undefined {
    return this.metrics.get(widgetId);
  }

  /**
   * Get all metrics
   */
  public getAllMetrics(): Record<string, WidgetMetrics> {
    const result: Record<string, WidgetMetrics> = {};
    this.metrics.forEach((metrics, widgetId) => {
      result[widgetId] = metrics;
    });
    return result;
  }

  /**
   * Get metrics history for a widget
   */
  public getMetricsHistory(widgetId: string): WidgetMetrics[] {
    return this.metricsHistory.get(widgetId) || [];
  }

  /**
   * Get performance summary
   */
  public getPerformanceSummary(): {
    totalWidgets: number;
    activeWidgets: number;
    averageLoadTime: number;
    averageMemoryUsage: number;
    totalErrors: number;
    slowestWidget: string | null;
  } {
    const allMetrics = Array.from(this.metrics.entries());
    
    if (allMetrics.length === 0) {
      return {
        totalWidgets: 0,
        activeWidgets: 0,
        averageLoadTime: 0,
        averageMemoryUsage: 0,
        totalErrors: 0,
        slowestWidget: null
      };
    }

    const activeWidgets = allMetrics.filter(([, metrics]) => metrics.isActive);
    const totalLoadTime = allMetrics.reduce((sum, [, metrics]) => sum + metrics.loadTime, 0);
    const totalMemoryUsage = allMetrics.reduce((sum, [, metrics]) => sum + metrics.memoryUsage, 0);
    const totalErrors = allMetrics.reduce((sum, [, metrics]) => sum + metrics.errorCount, 0);
    
    const slowestWidget = allMetrics.reduce((slowest, [widgetId, metrics]) => {
      return !slowest || metrics.loadTime > slowest.metrics.loadTime 
        ? { widgetId, metrics } 
        : slowest;
    }, null as { widgetId: string; metrics: WidgetMetrics } | null);

    return {
      totalWidgets: allMetrics.length,
      activeWidgets: activeWidgets.length,
      averageLoadTime: totalLoadTime / allMetrics.length,
      averageMemoryUsage: totalMemoryUsage / allMetrics.length,
      totalErrors,
      slowestWidget: slowestWidget?.widgetId || null
    };
  }

  /**
   * Start monitoring a widget
   */
  public startMonitoring(widgetId: string): void {
    const startTime = performance.now();
    
    this.track(widgetId, {
      loadTime: 0,
      renderTime: 0,
      memoryUsage: 0,
      errorCount: 0,
      isActive: true
    });

    // Monitor for widget-ready event to calculate load time
    globalEventBus.once('widget-ready', (event) => {
      if (event.source === widgetId) {
        const loadTime = performance.now() - startTime;
        this.track(widgetId, { loadTime });
      }
    });

    // Monitor for errors
    globalEventBus.on('widget-error', (event) => {
      if (event.source === widgetId) {
        const currentMetrics = this.getMetrics(widgetId);
        if (currentMetrics) {
          this.track(widgetId, {
            errorCount: currentMetrics.errorCount + 1,
            lastError: new Error(event.data.error)
          });
        }
      }
    });
  }

  /**
   * Stop monitoring a widget
   */
  public stopMonitoring(widgetId: string): void {
    const currentMetrics = this.getMetrics(widgetId);
    if (currentMetrics) {
      this.track(widgetId, { isActive: false });
    }
  }

  /**
   * Clear metrics for a widget
   */
  public clearMetrics(widgetId: string): void {
    this.metrics.delete(widgetId);
    this.metricsHistory.delete(widgetId);
  }

  /**
   * Set performance thresholds
   */
  public setThresholds(thresholds: Partial<typeof this.alertThresholds>): void {
    this.alertThresholds = { ...this.alertThresholds, ...thresholds };
  }

  /**
   * Get current thresholds
   */
  public getThresholds(): typeof this.alertThresholds {
    return { ...this.alertThresholds };
  }

  /**
   * Export metrics as JSON
   */
  public exportMetrics(): string {
    return JSON.stringify({
      metrics: this.getAllMetrics(),
      history: Object.fromEntries(this.metricsHistory),
      thresholds: this.alertThresholds,
      timestamp: Date.now()
    }, null, 2);
  }

  /**
   * Create default metrics
   */
  private createDefaultMetrics(): WidgetMetrics {
    return {
      loadTime: 0,
      renderTime: 0,
      memoryUsage: 0,
      errorCount: 0,
      isActive: false
    };
  }

  /**
   * Add metrics to history
   */
  private addToHistory(widgetId: string, metrics: WidgetMetrics): void {
    if (!this.metricsHistory.has(widgetId)) {
      this.metricsHistory.set(widgetId, []);
    }
    
    const history = this.metricsHistory.get(widgetId)!;
    history.push({ ...metrics });
    
    // Trim history if too long
    if (history.length > this.maxHistorySize) {
      history.shift();
    }
  }

  /**
   * Check performance thresholds and emit alerts
   */
  private checkThresholds(widgetId: string, metrics: WidgetMetrics): void {
    const alerts: string[] = [];
    
    if (metrics.loadTime > this.alertThresholds.loadTime) {
      alerts.push(`Slow load time: ${metrics.loadTime}ms`);
    }
    
    if (metrics.renderTime > this.alertThresholds.renderTime) {
      alerts.push(`Slow render time: ${metrics.renderTime}ms`);
    }
    
    if (metrics.memoryUsage > this.alertThresholds.memoryUsage) {
      alerts.push(`High memory usage: ${(metrics.memoryUsage / 1024 / 1024).toFixed(2)}MB`);
    }
    
    if (metrics.errorCount > this.alertThresholds.errorCount) {
      alerts.push(`High error count: ${metrics.errorCount}`);
    }

    if (alerts.length > 0) {
      globalEventBus.emit({
        type: 'widget-performance-alert',
        source: 'performance-monitor',
        data: { widgetId, alerts, metrics },
        timestamp: Date.now(),
        id: `alert-${Date.now()}`
      });
    }
  }

  /**
   * Setup event listeners for automatic monitoring
   */
  private setupEventListeners(): void {
    globalEventBus.on('widget-registered', (event) => {
      this.startMonitoring(event.data.widgetId);
    });

    globalEventBus.on('widget-unregistered', (event) => {
      this.stopMonitoring(event.data.widgetId);
    });

    globalEventBus.on('widget-ready', (event) => {
      if (event.data.loadTime) {
        this.track(event.source, {
          loadTime: event.data.loadTime,
          isActive: true
        });
      }
    });
  }

  /**
   * Start periodic memory usage collection
   */
  private startPeriodicCollection(): void {
    setInterval(() => {
      if ('memory' in performance) {
        const memInfo = (performance as any).memory;
        
        this.metrics.forEach((metrics, widgetId) => {
          if (metrics.isActive) {
            // Estimate widget memory usage (simplified)
            const estimatedUsage = memInfo.usedJSHeapSize / this.metrics.size;
            this.track(widgetId, { memoryUsage: estimatedUsage });
          }
        });
      }
    }, 10000); // Every 10 seconds
  }
}

/**
 * Global performance monitor instance
 */
export const globalPerformanceMonitor = new WidgetPerformanceMonitor();