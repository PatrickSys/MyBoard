import { WidgetStore as IWidgetStore } from './types';

/**
 * Widget Store Implementation
 * 
 * Provides persistent state management for widgets with:
 * - Local storage persistence
 * - State subscriptions
 * - Transaction support
 * - Memory management
 */
export class WidgetStore implements IWidgetStore {
  private states: Map<string, any> = new Map();
  private subscribers: Map<string, Set<(state: any) => void>> = new Map();
  private persistenceKey = 'myboard-widget-states';

  constructor() {
    this.loadFromPersistence();
  }

  /**
   * Get widget state
   */
  public getState(widgetId: string): any {
    return this.states.get(widgetId);
  }

  /**
   * Set widget state
   */
  public setState(widgetId: string, state: any): void {
    const oldState = this.states.get(widgetId);
    this.states.set(widgetId, state);
    
    // Persist to localStorage
    this.saveToPersistence();
    
    // Notify subscribers
    const widgetSubscribers = this.subscribers.get(widgetId);
    if (widgetSubscribers) {
      widgetSubscribers.forEach(callback => {
        try {
          callback(state);
        } catch (error) {
          console.error(`Error in state subscriber for widget ${widgetId}:`, error);
        }
      });
    }
  }

  /**
   * Subscribe to state changes
   */
  public subscribe(widgetId: string, callback: (state: any) => void): () => void {
    if (!this.subscribers.has(widgetId)) {
      this.subscribers.set(widgetId, new Set());
    }
    
    this.subscribers.get(widgetId)!.add(callback);
    
    // Return unsubscribe function
    return () => {
      const widgetSubscribers = this.subscribers.get(widgetId);
      if (widgetSubscribers) {
        widgetSubscribers.delete(callback);
        
        // Clean up empty subscriber sets
        if (widgetSubscribers.size === 0) {
          this.subscribers.delete(widgetId);
        }
      }
    };
  }

  /**
   * Clear widget state
   */
  public clear(widgetId: string): void {
    this.states.delete(widgetId);
    this.subscribers.delete(widgetId);
    this.saveToPersistence();
  }

  /**
   * Update state with partial data
   */
  public updateState(widgetId: string, partialState: any): void {
    const currentState = this.getState(widgetId) || {};
    const newState = { ...currentState, ...partialState };
    this.setState(widgetId, newState);
  }

  /**
   * Get state for multiple widgets
   */
  public getMultipleStates(widgetIds: string[]): Record<string, any> {
    const result: Record<string, any> = {};
    widgetIds.forEach(id => {
      const state = this.getState(id);
      if (state !== undefined) {
        result[id] = state;
      }
    });
    return result;
  }

  /**
   * Set state for multiple widgets
   */
  public setMultipleStates(states: Record<string, any>): void {
    Object.entries(states).forEach(([widgetId, state]) => {
      this.setState(widgetId, state);
    });
  }

  /**
   * Get all widget states
   */
  public getAllStates(): Record<string, any> {
    const result: Record<string, any> = {};
    this.states.forEach((state, widgetId) => {
      result[widgetId] = state;
    });
    return result;
  }

  /**
   * Clear all states
   */
  public clearAll(): void {
    this.states.clear();
    this.subscribers.clear();
    this.saveToPersistence();
  }

  /**
   * Check if widget has state
   */
  public hasState(widgetId: string): boolean {
    return this.states.has(widgetId);
  }

  /**
   * Get state size in bytes (approximate)
   */
  public getStateSize(widgetId: string): number {
    const state = this.getState(widgetId);
    if (!state) return 0;
    
    try {
      return new Blob([JSON.stringify(state)]).size;
    } catch {
      return 0;
    }
  }

  /**
   * Get total store size
   */
  public getTotalSize(): number {
    try {
      const allStates = this.getAllStates();
      return new Blob([JSON.stringify(allStates)]).size;
    } catch {
      return 0;
    }
  }

  /**
   * Create a transaction for batch updates
   */
  public transaction(operations: (store: WidgetStore) => void): void {
    // Temporarily disable persistence
    const originalSave = this.saveToPersistence;
    this.saveToPersistence = () => {};
    
    try {
      operations(this);
    } finally {
      // Restore persistence and save once
      this.saveToPersistence = originalSave;
      this.saveToPersistence();
    }
  }

  /**
   * Export states as JSON
   */
  public export(): string {
    return JSON.stringify(this.getAllStates(), null, 2);
  }

  /**
   * Import states from JSON
   */
  public import(jsonData: string): void {
    try {
      const states = JSON.parse(jsonData);
      this.transaction(() => {
        this.clearAll();
        Object.entries(states).forEach(([widgetId, state]) => {
          this.setState(widgetId, state);
        });
      });
    } catch (error) {
      throw new Error(`Failed to import widget states: ${error}`);
    }
  }

  /**
   * Load states from localStorage
   */
  private loadFromPersistence(): void {
    try {
      const stored = localStorage.getItem(this.persistenceKey);
      if (stored) {
        const states = JSON.parse(stored);
        Object.entries(states).forEach(([widgetId, state]) => {
          this.states.set(widgetId, state);
        });
      }
    } catch (error) {
      console.warn('Failed to load widget states from localStorage:', error);
    }
  }

  /**
   * Save states to localStorage
   */
  private saveToPersistence(): void {
    try {
      const states = this.getAllStates();
      localStorage.setItem(this.persistenceKey, JSON.stringify(states));
    } catch (error) {
      console.warn('Failed to save widget states to localStorage:', error);
    }
  }
}

/**
 * Global widget store instance
 */
export const globalWidgetStore = new WidgetStore();