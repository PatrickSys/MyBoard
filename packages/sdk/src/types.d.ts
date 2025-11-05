/**
 * Theme options that can be passed to widgets.
 */
export type WidgetTheme = 'light' | 'dark';

/**
 * Error event detail structure.
 */
export interface WidgetErrorDetail {
  reason: string;
}

/**
 * Change event detail structure for value updates.
 */
export interface WidgetChange<T = unknown> {
  value: T;
  meta?: Record<string, unknown>;
}

/**
 * Standard widget lifecycle events.
 */
export interface WidgetEventMap {
  'widget-ready': CustomEvent<void>;
  'widget-error': CustomEvent<WidgetErrorDetail>;
  'widget-change': CustomEvent<WidgetChange>;
}
