import { WidgetEvent, WidgetEventHandler } from './types';

/**
 * Event Bus for Widget Communication
 * 
 * Provides typed, centralized event handling for widgets with:
 * - Type-safe event emission and handling
 * - Event filtering and routing
 * - Performance monitoring
 * - Memory leak prevention
 */
export class EventBus {
  private listeners: Map<string, Set<WidgetEventHandler>> = new Map();
  private eventHistory: WidgetEvent[] = [];
  private maxHistorySize = 100;

  /**
   * Emit an event to all registered listeners
   */
  public emit<T = any>(event: WidgetEvent<T>): void {
    // Add to event history for debugging
    this.eventHistory.push(event);
    if (this.eventHistory.length > this.maxHistorySize) {
      this.eventHistory.shift();
    }

    // Get listeners for this event type
    const eventListeners = this.listeners.get(event.type);
    if (!eventListeners || eventListeners.size === 0) {
      return;
    }

    // Execute all listeners
    eventListeners.forEach(handler => {
      try {
        handler(event);
      } catch (error) {
        console.error(`Error in event handler for ${event.type}:`, error);
        
        // Emit error event
        this.emit({
          type: 'event-handler-error',
          source: 'event-bus',
          data: { 
            originalEvent: event, 
            error: error instanceof Error ? error.message : String(error)
          },
          timestamp: Date.now(),
          id: `error-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        });
      }
    });
  }

  /**
   * Register an event listener
   */
  public on<T = any>(eventType: string, handler: WidgetEventHandler<T>): void {
    if (!this.listeners.has(eventType)) {
      this.listeners.set(eventType, new Set());
    }
    
    this.listeners.get(eventType)!.add(handler);
  }

  /**
   * Remove an event listener
   */
  public off<T = any>(eventType: string, handler: WidgetEventHandler<T>): void {
    const eventListeners = this.listeners.get(eventType);
    if (eventListeners) {
      eventListeners.delete(handler);
      
      // Clean up empty listener sets
      if (eventListeners.size === 0) {
        this.listeners.delete(eventType);
      }
    }
  }

  /**
   * Remove all listeners for a specific event type
   */
  public removeAllListeners(eventType?: string): void {
    if (eventType) {
      this.listeners.delete(eventType);
    } else {
      this.listeners.clear();
    }
  }

  /**
   * Get all event types with active listeners
   */
  public getActiveEventTypes(): string[] {
    return Array.from(this.listeners.keys());
  }

  /**
   * Get listener count for an event type
   */
  public getListenerCount(eventType: string): number {
    return this.listeners.get(eventType)?.size || 0;
  }

  /**
   * Get recent event history for debugging
   */
  public getEventHistory(): readonly WidgetEvent[] {
    return [...this.eventHistory];
  }

  /**
   * Clear event history
   */
  public clearHistory(): void {
    this.eventHistory = [];
  }

  /**
   * Clear all listeners and history
   */
  public clear(): void {
    this.listeners.clear();
    this.eventHistory = [];
  }

  /**
   * Create a filtered event listener that only responds to events matching criteria
   */
  public onFiltered<T = any>(
    eventType: string,
    filter: (event: WidgetEvent<T>) => boolean,
    handler: WidgetEventHandler<T>
  ): void {
    const filteredHandler: WidgetEventHandler<T> = (event) => {
      if (filter(event)) {
        handler(event);
      }
    };
    
    this.on(eventType, filteredHandler);
  }

  /**
   * Create a one-time event listener that removes itself after first execution
   */
  public once<T = any>(eventType: string, handler: WidgetEventHandler<T>): void {
    const onceHandler: WidgetEventHandler<T> = (event) => {
      handler(event);
      this.off(eventType, onceHandler);
    };
    
    this.on(eventType, onceHandler);
  }

  /**
   * Wait for an event and return a promise
   */
  public waitFor<T = any>(
    eventType: string, 
    timeout?: number,
    filter?: (event: WidgetEvent<T>) => boolean
  ): Promise<WidgetEvent<T>> {
    return new Promise((resolve, reject) => {
      let timeoutId: NodeJS.Timeout | undefined;
      
      const handler: WidgetEventHandler<T> = (event) => {
        if (!filter || filter(event)) {
          if (timeoutId) {
            clearTimeout(timeoutId);
          }
          this.off(eventType, handler);
          resolve(event);
        }
      };
      
      this.on(eventType, handler);
      
      if (timeout) {
        timeoutId = setTimeout(() => {
          this.off(eventType, handler);
          reject(new Error(`Timeout waiting for event: ${eventType}`));
        }, timeout);
      }
    });
  }
}

/**
 * Global Event Bus instance for cross-widget communication
 */
export const globalEventBus = new EventBus();