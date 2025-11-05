/**
 * Centralized state management for widgets.
 *
 * Provides framework-agnostic state persistence with localStorage backing.
 * Widgets can store state, subscribe to changes, and avoid managing their own persistence.
 */

type StateChangeCallback<T = unknown> = (state: T) => void;

class WidgetStore {
  private states = new Map<string, unknown>();
  private subscribers = new Map<string, Set<StateChangeCallback>>();
  private readonly storageKey = 'myboard-widget-states';

  constructor() {
    this.loadFromStorage();
  }

  /**
   * Get current state for a widget.
   */
  getState<T = unknown>(widgetId: string): T | undefined {
    return this.states.get(widgetId) as T | undefined;
  }

  /**
   * Set state for a widget. Automatically persists and notifies subscribers.
   */
  setState<T = unknown>(widgetId: string, state: T): void {
    this.states.set(widgetId, state);
    // Persist immediately on every setState - simpler than batching
    this.saveToStorage();
    this.notifySubscribers(widgetId, state);
  }

  /**
   * Subscribe to state changes for a specific widget.
   * Returns an unsubscribe function.
   */
  subscribe<T = unknown>(
    widgetId: string,
    callback: StateChangeCallback<T>
  ): () => void {
    if (!this.subscribers.has(widgetId)) {
      this.subscribers.set(widgetId, new Set());
    }

    this.subscribers.get(widgetId)!.add(callback as StateChangeCallback);

    // Return unsubscribe function
    return () => {
      const callbacks = this.subscribers.get(widgetId);
      if (callbacks) {
        callbacks.delete(callback as StateChangeCallback);
        if (callbacks.size === 0) {
          this.subscribers.delete(widgetId);
        }
      }
    };
  }

  /**
   * Clear state for a specific widget.
   */
  clearState(widgetId: string): void {
    this.states.delete(widgetId);
    this.subscribers.delete(widgetId);
    this.saveToStorage();
  }

  /**
   * Clear all widget states (useful for testing).
   */
  clearAll(): void {
    this.states.clear();
    this.subscribers.clear();
    this.saveToStorage();
  }

  /**
   * Notify all subscribers for a widget.
   */
  private notifySubscribers<T = unknown>(widgetId: string, state: T): void {
    const callbacks = this.subscribers.get(widgetId);
    if (callbacks && callbacks.size > 0) {
      callbacks.forEach((callback) => {
        try {
          callback(state);
        } catch (error) {
          console.error(
            `[WidgetStore] Error in subscriber for ${widgetId}:`,
            error
          );
        }
      });
    }
  }

  /**
   * Load states from localStorage.
   */
  private loadFromStorage(): void {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        Object.entries(parsed).forEach(([widgetId, state]) => {
          this.states.set(widgetId, state);
        });
      }
    } catch (error) {
      console.warn('[WidgetStore] Failed to load from localStorage:', error);
    }
  }

  /**
   * Save current states to localStorage.
   */
  private saveToStorage(): void {
    // Check if we're in a browser environment
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }

    try {
      const statesObj: Record<string, unknown> = {};
      this.states.forEach((state, widgetId) => {
        statesObj[widgetId] = state;
      });
      localStorage.setItem(this.storageKey, JSON.stringify(statesObj));
    } catch (error) {
      console.warn('[WidgetStore] Failed to save to localStorage:', error);
    }
  }
}

/**
 * Global widget store instance.
 */
export const widgetStore = new WidgetStore();
