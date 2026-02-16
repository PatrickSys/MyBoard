import type {
  WidgetCommandRequest,
  WidgetCommandResult,
  WidgetManifest,
} from '@myboard/sdk';
import { canDispatchCommand } from './widget-policy';
import { EventGovernor, eventGovernor } from './event-governor';
import {
  widgetTelemetryService,
  type WidgetTelemetryService,
  type TelemetryPoint,
} from './telemetry-service';
import {
  widgetProcessManager,
  type WidgetHealth,
  type WidgetProcessManager,
} from './widget-process-manager';
import {
  WidgetCommandRouter,
  widgetCommandRouter,
} from './widget-command-router';
import { FEATURE_FLAGS } from '../config/feature-flags';

export const KERNEL_EVENT = 'myboard:kernel-event';

type KernelEventDetail =
  | {
      type: 'widget-throttle-changed';
      widgetId: string;
      throttled: boolean;
      timestamp: number;
    }
  | {
      type: 'widget-quarantined';
      widgetId: string;
      reason: string;
      timestamp: number;
    }
  | {
      type: 'command-failed';
      widgetId: string;
      code: string;
      reason: string;
      timestamp: number;
    };

type RuntimeKernelOptions = {
  getManifestById: (widgetId: string) => WidgetManifest | undefined;
  processManager?: WidgetProcessManager;
  governor?: EventGovernor;
  telemetry?: WidgetTelemetryService;
  commandRouter?: WidgetCommandRouter;
  now?: () => number;
};

type CommandHandler = (
  request: WidgetCommandRequest
) => WidgetCommandResult | Promise<WidgetCommandResult>;

function emitKernelEvent(detail: KernelEventDetail): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(KERNEL_EVENT, { detail }));
}

function createCommandId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `cmd-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createRuntimeKernel(options: RuntimeKernelOptions) {
  const now = options.now ?? (() => Date.now());
  const processManager = options.processManager ?? widgetProcessManager;
  const telemetry = options.telemetry ?? widgetTelemetryService;

  const governor =
    options.governor ??
    new EventGovernor({
      onThrottleChange: ({ widgetId, throttled, timestamp }) => {
        emitKernelEvent({
          type: 'widget-throttle-changed',
          widgetId,
          throttled,
          timestamp,
        });
      },
    });

  const commandRouter =
    options.commandRouter ??
    new WidgetCommandRouter({
      canDispatch: (request) => {
        const manifest = options.getManifestById(request.targetWidgetId);
        return canDispatchCommand(manifest, request.commandType);
      },
    });

  function beforePublishEvent(event: {
    widgetId: string;
    type: string;
    timestamp: number;
  }): boolean {
    if (FEATURE_FLAGS.telemetryEnabled) {
      telemetry.recordEvent(event.widgetId, event.timestamp);
    }

    if (!FEATURE_FLAGS.kernelGovernanceEnabled) {
      return true;
    }

    if (processManager.isQuarantined(event.widgetId)) {
      if (FEATURE_FLAGS.telemetryEnabled) {
        telemetry.recordError(event.widgetId, event.timestamp);
      }
      emitKernelEvent({
        type: 'widget-quarantined',
        widgetId: event.widgetId,
        reason: 'WIDGET_QUARANTINED',
        timestamp: event.timestamp,
      });
      return false;
    }

    const decision = governor.canPublish(event.widgetId);
    if (!decision.allowed) {
      if (FEATURE_FLAGS.telemetryEnabled) {
        telemetry.recordError(event.widgetId, event.timestamp);
      }
      emitKernelEvent({
        type: 'command-failed',
        widgetId: event.widgetId,
        code: decision.code,
        reason: decision.reason,
        timestamp: event.timestamp,
      });
      return false;
    }
    return true;
  }

  async function dispatchWidgetCommand(
    request: WidgetCommandRequest
  ): Promise<WidgetCommandResult> {
    const commandId = request.commandId || createCommandId();
    const finalized: WidgetCommandRequest = {
      ...request,
      commandId,
      hopCount: request.hopCount ?? 0,
    };
    const targetWidgetId = finalized.targetWidgetId;
    const issuedAt = now();

    if (!FEATURE_FLAGS.commandBusEnabled) {
      return {
        ok: false,
        code: 'COMMAND_BUS_DISABLED',
        reason: 'Command bus disabled by feature flag',
      };
    }

    if (FEATURE_FLAGS.telemetryEnabled) {
      telemetry.recordEvent('host', issuedAt);
    }

    if (processManager.isQuarantined(targetWidgetId)) {
      const failure: WidgetCommandResult = {
        ok: false,
        code: 'COMMAND_TARGET_QUARANTINED',
        reason: `${targetWidgetId} is quarantined`,
      };
      if (FEATURE_FLAGS.telemetryEnabled) {
        telemetry.recordError('host', issuedAt);
      }
      emitKernelEvent({
        type: 'command-failed',
        widgetId: targetWidgetId,
        code: failure.code,
        reason: failure.reason,
        timestamp: issuedAt,
      });
      return failure;
    }

    const result = await commandRouter.dispatch(finalized);
    if (!result.ok) {
      if (FEATURE_FLAGS.telemetryEnabled) {
        telemetry.recordError(targetWidgetId, issuedAt);
      }
      if (result.code === 'COMMAND_HANDLER_ERROR' || result.code === 'COMMAND_TIMEOUT') {
        processManager.recordCrash(targetWidgetId, result.code);
      }
      emitKernelEvent({
        type: 'command-failed',
        widgetId: targetWidgetId,
        code: result.code,
        reason: result.reason,
        timestamp: issuedAt,
      });
    }
    return result;
  }

  return {
    bridge: {
      beforePublishEvent,
      dispatchWidgetCommand,
      registerWidgetCommandHandler(widgetId: string, handler: CommandHandler) {
        return commandRouter.registerHandler(widgetId, '*', handler);
      },
    },
    registerCommandHandler(widgetId: string, commandType: string, handler: CommandHandler) {
      return commandRouter.registerHandler(widgetId, commandType, handler);
    },
    recordRenderMetric(widgetId: string, durationMs: number) {
      if (!FEATURE_FLAGS.telemetryEnabled) return;
      telemetry.recordRender(widgetId, durationMs, now());
    },
    getTelemetryPoints(query?: {
      widgetId?: string;
      from?: number;
      to?: number;
      limit?: number;
    }): TelemetryPoint[] {
      return telemetry.query(query);
    },
    getHealth(widgetId: string): WidgetHealth {
      return processManager.getHealth(widgetId);
    },
    listHealth(): WidgetHealth[] {
      return processManager.listHealth();
    },
    quarantine(widgetId: string, reason = 'MANUAL_QUARANTINE'): WidgetHealth {
      const health = processManager.quarantine(widgetId, reason);
      emitKernelEvent({
        type: 'widget-quarantined',
        widgetId,
        reason,
        timestamp: now(),
      });
      return health;
    },
    clearQuarantine(widgetId: string): WidgetHealth {
      return processManager.clearQuarantine(widgetId);
    },
    getThrottleState(widgetId: string) {
      return governor.getState(widgetId);
    },
    listThrottleStates() {
      return governor.listStates();
    },
  };
}
