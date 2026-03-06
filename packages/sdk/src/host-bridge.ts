import type { WidgetPermission } from './widget-manifest';
import { widgetStore } from './widget-store';
import type { WidgetEvent } from './event-bus';
import { getSharedSdkRuntime } from './shared-runtime';

type HostBridge = {
  requestHostCapability?: (
    permission: WidgetPermission,
    widgetId?: string
  ) => boolean | Promise<boolean>;
  getWidgetSettings?: <T = unknown>(widgetId: string) => T | undefined;
  setWidgetSettings?: <T = unknown>(widgetId: string, settings: T) => void;
  beforePublishEvent?: (event: WidgetEvent<unknown>) => boolean;
  dispatchWidgetCommand?: (
    request: WidgetCommandRequest
  ) => WidgetCommandResult | Promise<WidgetCommandResult>;
  registerWidgetCommandHandler?: (
    widgetId: string,
    handler: WidgetCommandHandler
  ) => () => void;
};

export type WidgetCommandRequest = {
  commandId: string;
  traceId?: string;
  sourceWidgetId?: string;
  targetWidgetId: string;
  commandType: string;
  payload?: Record<string, unknown>;
  hopCount?: number;
};

export type WidgetCommandSuccess = {
  ok: true;
  result?: unknown;
};

export type WidgetCommandFailure = {
  ok: false;
  code: string;
  reason: string;
};

export type WidgetCommandResult = WidgetCommandSuccess | WidgetCommandFailure;

type WidgetCommandHandler = (
  request: WidgetCommandRequest
) => WidgetCommandResult | Promise<WidgetCommandResult>;

const sharedRuntime = getSharedSdkRuntime();

const settingsStateKey = (widgetId: string) => `${widgetId}:settings`;

function getBridge(): HostBridge {
  return sharedRuntime.bridge as HostBridge;
}

function getCommandHandlers(): Map<string, WidgetCommandHandler> {
  return sharedRuntime.commandHandlers as Map<string, WidgetCommandHandler>;
}

export function registerHostBridge(nextBridge: HostBridge): void {
  sharedRuntime.bridge = nextBridge;
}

export async function requestHostCapability(
  permission: WidgetPermission,
  widgetId?: string
): Promise<boolean> {
  const bridge = getBridge();
  if (!bridge.requestHostCapability) {
    return permission === 'storage' || permission === 'events';
  }
  return Boolean(await bridge.requestHostCapability(permission, widgetId));
}

export function getWidgetSettings<T = unknown>(widgetId: string): T | undefined {
  const bridge = getBridge();
  if (bridge.getWidgetSettings) {
    return bridge.getWidgetSettings<T>(widgetId);
  }
  return widgetStore.getState<T>(settingsStateKey(widgetId));
}

export function setWidgetSettings<T = unknown>(widgetId: string, settings: T): void {
  const bridge = getBridge();
  if (bridge.setWidgetSettings) {
    bridge.setWidgetSettings(widgetId, settings);
    return;
  }
  widgetStore.setState(settingsStateKey(widgetId), settings);
}

export function shouldPublishEvent(event: WidgetEvent<unknown>): boolean {
  const bridge = getBridge();
  if (!bridge.beforePublishEvent) return true;
  try {
    return bridge.beforePublishEvent(event);
  } catch (error) {
    if (typeof process === 'undefined' || process.env?.NODE_ENV !== 'production') {
      console.warn('[host-bridge] beforePublishEvent failed; dropping event', error);
    }
    return false;
  }
}

export function registerWidgetCommandHandler(
  widgetId: string,
  handler: WidgetCommandHandler
): () => void {
  const bridge = getBridge();
  if (bridge.registerWidgetCommandHandler) {
    return bridge.registerWidgetCommandHandler(widgetId, handler);
  }

  const commandHandlers = getCommandHandlers();
  commandHandlers.set(widgetId, handler);
  return () => {
    if (commandHandlers.get(widgetId) === handler) {
      commandHandlers.delete(widgetId);
    }
  };
}

export async function dispatchWidgetCommand(
  request: WidgetCommandRequest
): Promise<WidgetCommandResult> {
  const bridge = getBridge();
  if (bridge.dispatchWidgetCommand) {
    return bridge.dispatchWidgetCommand(request);
  }

  const commandHandlers = getCommandHandlers();
  const handler = commandHandlers.get(request.targetWidgetId);
  if (!handler) {
    return {
      ok: false,
      code: 'COMMAND_TARGET_NOT_FOUND',
      reason: `No command handler registered for ${request.targetWidgetId}`,
    };
  }

  try {
    const result = await handler(request);
    return result;
  } catch (error) {
    return {
      ok: false,
      code: 'COMMAND_HANDLER_ERROR',
      reason: error instanceof Error ? error.message : 'unknown-handler-error',
    };
  }
}

