/**
 * MyBoard Widget System
 * 
 * A comprehensive widget framework that addresses key pain points in traditional SPAs:
 * 
 * 🚀 DEVELOPER EXPERIENCE:
 * - Framework-agnostic widget development
 * - Type-safe widget communication
 * - Hot module replacement
 * - Built-in performance monitoring
 * - Comprehensive debugging tools
 * 
 * 👥 USER EXPERIENCE:
 * - Drag and drop dashboard
 * - Real-time widget configuration
 * - Theme system
 * - Layout persistence
 * - Widget marketplace
 * 
 * 🏗️ ARCHITECTURE BENEFITS:
 * - Micro-frontend architecture
 * - Independent widget deployment
 * - Resource isolation
 * - Lazy loading
 * - Error boundaries
 */

// Core exports
export * from './types';
export { BaseWidget } from './base-widget';
export { EventBus, globalEventBus } from './event-bus';
export { WidgetRegistry, globalWidgetRegistry } from './widget-registry';
export { WidgetStore, globalWidgetStore } from './widget-store';
export { WidgetPerformanceMonitor, globalPerformanceMonitor } from './performance-monitor';

// Convenience exports
export {
  globalEventBus as eventBus,
  globalWidgetRegistry as registry,
  globalWidgetStore as store,
  globalPerformanceMonitor as monitor
} from './index';

// Version
export const VERSION = '0.1.0';

/**
 * Initialize the widget system
 */
export function initializeWidgetSystem(config?: {
  enablePerformanceMonitoring?: boolean;
  enableDebugging?: boolean;
  maxHistorySize?: number;
}) {
  const {
    enablePerformanceMonitoring = true,
    enableDebugging = process.env.NODE_ENV === 'development',
    maxHistorySize = 100
  } = config || {};

  if (enableDebugging) {
    // Add debugging utilities to window object
    if (typeof window !== 'undefined') {
      (window as any).MyBoardDebug = {
        eventBus: globalEventBus,
        registry: globalWidgetRegistry,
        store: globalWidgetStore,
        monitor: globalPerformanceMonitor,
        getEventHistory: () => globalEventBus.getEventHistory(),
        getPerformanceSummary: () => globalPerformanceMonitor.getPerformanceSummary(),
        exportMetrics: () => globalPerformanceMonitor.exportMetrics(),
        exportStates: () => globalWidgetStore.export()
      };
      
      console.log('🔧 MyBoard Debug tools available at window.MyBoardDebug');
    }
  }

  // Set up global error handling
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      globalEventBus.emit({
        type: 'global-error',
        source: 'window',
        data: {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
          error: event.error
        },
        timestamp: Date.now(),
        id: `global-error-${Date.now()}`
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      globalEventBus.emit({
        type: 'unhandled-promise-rejection',
        source: 'window',
        data: {
          reason: event.reason,
          promise: event.promise
        },
        timestamp: Date.now(),
        id: `unhandled-rejection-${Date.now()}`
      });
    });
  }

  console.log(`🎯 MyBoard Widget System v${VERSION} initialized`);
  
  return {
    eventBus: globalEventBus,
    registry: globalWidgetRegistry,
    store: globalWidgetStore,
    monitor: globalPerformanceMonitor
  };
}