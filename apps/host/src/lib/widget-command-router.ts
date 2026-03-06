import type { WidgetCommandRequest, WidgetCommandResult } from '@myboard/sdk';

type CommandHandler = (
  request: WidgetCommandRequest
) => WidgetCommandResult | Promise<WidgetCommandResult>;

type CommandRouterOptions = {
  now?: () => number;
  timeoutMs?: number;
  maxHopCount?: number;
  dedupeWindowMs?: number;
  canDispatch?: (
    request: WidgetCommandRequest
  ) => { allowed: true } | { allowed: false; code: string; reason: string };
};

const DEFAULT_TIMEOUT_MS = 2000;
const DEFAULT_MAX_HOP_COUNT = 5;
const DEFAULT_DEDUPE_WINDOW_MS = 30_000;

export class WidgetCommandRouter {
  private readonly now: () => number;
  private readonly timeoutMs: number;
  private readonly maxHopCount: number;
  private readonly dedupeWindowMs: number;
  private readonly canDispatch?: CommandRouterOptions['canDispatch'];
  private handlers = new Map<string, Map<string, CommandHandler>>();
  private seenCommands = new Map<string, number>();

  constructor(options: CommandRouterOptions = {}) {
    this.now = options.now ?? (() => Date.now());
    this.timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;
    this.maxHopCount = options.maxHopCount ?? DEFAULT_MAX_HOP_COUNT;
    this.dedupeWindowMs = options.dedupeWindowMs ?? DEFAULT_DEDUPE_WINDOW_MS;
    this.canDispatch = options.canDispatch;
  }

  registerHandler(
    widgetId: string,
    commandType: string,
    handler: CommandHandler
  ): () => void {
    const byCommand = this.handlers.get(widgetId) ?? new Map<string, CommandHandler>();
    byCommand.set(commandType, handler);
    this.handlers.set(widgetId, byCommand);
    return () => {
      const current = this.handlers.get(widgetId);
      if (!current) return;
      if (current.get(commandType) !== handler) return;
      current.delete(commandType);
      if (current.size === 0) {
        this.handlers.delete(widgetId);
      }
    };
  }

  async dispatch(request: WidgetCommandRequest): Promise<WidgetCommandResult> {
    this.cleanupSeen();
    const now = this.now();

    if (this.seenCommands.has(request.commandId)) {
      return {
        ok: false,
        code: 'COMMAND_DUPLICATE',
        reason: `Command ${request.commandId} already processed`,
      };
    }

    const hopCount = request.hopCount ?? 0;
    if (hopCount > this.maxHopCount) {
      return {
        ok: false,
        code: 'COMMAND_HOP_LIMIT_EXCEEDED',
        reason: `Hop count ${hopCount} exceeds limit ${this.maxHopCount}`,
      };
    }

    if (this.canDispatch) {
      const decision = this.canDispatch(request);
      if (!decision.allowed) {
        return {
          ok: false,
          code: decision.code,
          reason: decision.reason,
        };
      }
    }

    const byCommand = this.handlers.get(request.targetWidgetId);
    if (!byCommand) {
      return {
        ok: false,
        code: 'COMMAND_TARGET_NOT_FOUND',
        reason: `No handlers found for ${request.targetWidgetId}`,
      };
    }

    const handler = byCommand.get(request.commandType) ?? byCommand.get('*');
    if (!handler) {
      return {
        ok: false,
        code: 'COMMAND_ACTION_NOT_FOUND',
        reason: `${request.targetWidgetId} does not handle ${request.commandType}`,
      };
    }

    this.seenCommands.set(request.commandId, now);

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    try {
      const timeoutPromise = new Promise<WidgetCommandResult>((resolve) => {
        timeoutId = globalThis.setTimeout(
          () =>
            resolve({
              ok: false,
              code: 'COMMAND_TIMEOUT',
              reason: `Command timed out after ${this.timeoutMs}ms`,
            }),
          this.timeoutMs
        );
      });

      const result = await Promise.race([Promise.resolve(handler(request)), timeoutPromise]);
      return result;
    } catch (error) {
      return {
        ok: false,
        code: 'COMMAND_HANDLER_ERROR',
        reason: error instanceof Error ? error.message : 'unknown-handler-error',
      };
    } finally {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    }
  }

  __resetForTests(): void {
    this.handlers.clear();
    this.seenCommands.clear();
  }

  private cleanupSeen(): void {
    const now = this.now();
    for (const [commandId, seenAt] of this.seenCommands.entries()) {
      if (now - seenAt > this.dedupeWindowMs) {
        this.seenCommands.delete(commandId);
      }
    }
  }
}

export const widgetCommandRouter = new WidgetCommandRouter();
