/**
 * @myboard/sdk - Widget Lifecycle Contract
 *
 * Minimal helpers for framework-agnostic widget development.
 */

// Lifecycle events
export const WIDGET_READY = 'widget-ready' as const;
export const WIDGET_ERROR = 'widget-error' as const;
export const WIDGET_CHANGE = 'widget-change' as const;

// Type exports
export type {
  WidgetChange,
  WidgetErrorDetail,
  WidgetTheme,
  WidgetEventMap,
} from './types';

export type { WidgetEvent } from './event-bus';
export type {
  WidgetCatalogResponse,
  WidgetInstallRecord,
  WidgetManifest,
  WidgetAutomationSchema,
  WidgetAutomationEventDefinition,
  WidgetAutomationActionDefinition,
  WidgetPermission,
  WidgetSettingsField,
  WidgetSettingsSchema,
} from './widget-manifest';
export type { WidgetCommandResult, WidgetCommandRequest } from './host-bridge';

// Import types for internal use
import type { WidgetChange, WidgetErrorDetail } from './types';
import { eventBus } from './event-bus';

// Event bus for widget-to-widget communication
export { eventBus } from './event-bus';
export * from './events';

// Centralized state management
export { widgetStore } from './widget-store';
export {
  dispatchWidgetCommand,
  getWidgetSettings,
  registerWidgetCommandHandler,
  registerHostBridge,
  requestHostCapability,
  setWidgetSettings,
} from './host-bridge';

/**
 * Emit when widget has successfully mounted and is ready to use.
 */
export function emitReady(target: Element): void {
  target.dispatchEvent(new CustomEvent(WIDGET_READY, { bubbles: true }));
}

/**
 * Emit when widget encounters an error during mount or operation.
 */
export function emitError(target: Element, reason: string): void {
  const detail: WidgetErrorDetail = { reason };
  target.dispatchEvent(
    new CustomEvent(WIDGET_ERROR, { bubbles: true, detail })
  );
}

/**
 * Emit when widget value changes (e.g., user interaction, data update).
 * Useful for widget-to-host communication.
 */
export function emitChange<T = unknown>(
  target: Element,
  value: T,
  meta?: Record<string, unknown>
): void {
  const detail: WidgetChange<T> = { value, meta };
  target.dispatchEvent(
    new CustomEvent(WIDGET_CHANGE, { bubbles: true, detail })
  );
}

export type HostNotification = {
  level: 'info' | 'warning' | 'error' | 'success';
  title: string;
  message?: string;
  sourceWidgetId?: string;
  timestamp?: number;
  code?: string;
};

export function notifyHost(notification: HostNotification): void {
  eventBus.publish('system', 'notification', {
    ...notification,
    timestamp: notification.timestamp ?? Date.now(),
  });
}
