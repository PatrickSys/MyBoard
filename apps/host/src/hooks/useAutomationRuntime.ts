import { useEffect, useMemo } from 'react';
import {
  dispatchWidgetCommand,
  eventBus,
  notifyHost,
  type WidgetCommandRequest,
} from '@myboard/sdk';
import { useAutomationStore } from './useAutomationStore';

const MAX_HOPS = 5;

function createCommandId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `cmd-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function useAutomationRuntime() {
  const { wires } = useAutomationStore();

  const sourceGroups = useMemo(() => {
    const grouped = new Map<string, typeof wires>();
    for (const wire of wires) {
      if (!wire.enabled) continue;
      const key = `${wire.sourceWidgetId}:${wire.sourceEvent}`;
      const current = grouped.get(key) ?? [];
      grouped.set(key, [...current, wire]);
    }
    return grouped;
  }, [wires]);

  useEffect(() => {
    const unsubs: Array<() => void> = [];

    for (const [sourceKey, wiresInGroup] of sourceGroups.entries()) {
      const separatorIndex = sourceKey.indexOf(':');
      const widgetId = sourceKey.slice(0, separatorIndex);
      const eventType = sourceKey.slice(separatorIndex + 1);

      const unsub = eventBus.subscribe(widgetId, eventType, async (event) => {
        for (const wire of wiresInGroup) {
          const traceId = `${sourceKey}:${event.timestamp}`;
          const upstreamHopCount =
            isObject(event.data) && typeof event.data.hopCount === 'number'
              ? event.data.hopCount
              : 0;
          const nextHopCount = upstreamHopCount + 1;
          if (nextHopCount > MAX_HOPS) {
            notifyHost({
              level: 'warning',
              title: 'Automation Skipped',
              message: `${wire.sourceWidgetId}.${wire.sourceEvent} exceeded hop limit`,
              sourceWidgetId: wire.sourceWidgetId,
              code: 'COMMAND_HOP_LIMIT_EXCEEDED',
            });
            continue;
          }
          const request: WidgetCommandRequest = {
            commandId: createCommandId(),
            traceId,
            sourceWidgetId: wire.sourceWidgetId,
            targetWidgetId: wire.targetWidgetId,
            commandType: wire.targetAction,
            payload: mergePayload(event.data, wire.payloadTemplate),
            hopCount: nextHopCount,
          };

          const result = await dispatchWidgetCommand(request);
          if (!result.ok) {
            notifyHost({
              level: 'error',
              title: 'Automation Failed',
              message: `${wire.targetWidgetId}.${wire.targetAction}: ${result.code}`,
              sourceWidgetId: wire.sourceWidgetId,
              code: result.code,
            });
            continue;
          }

          notifyHost({
            level: 'success',
            title: 'Automation Executed',
            message: `${wire.sourceWidgetId}.${wire.sourceEvent} -> ${wire.targetWidgetId}.${wire.targetAction}`,
            sourceWidgetId: wire.sourceWidgetId,
          });
        }
      });
      unsubs.push(unsub);
    }

    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  }, [sourceGroups]);
}

function mergePayload(
  sourceData: unknown,
  payloadTemplate: Record<string, unknown> | undefined
): Record<string, unknown> {
  const base = isObject(sourceData) ? sourceData : {};
  if (!payloadTemplate) return { ...base, hopCount: 1, maxHops: MAX_HOPS };
  return {
    ...base,
    ...payloadTemplate,
    hopCount: typeof payloadTemplate.hopCount === 'number' ? payloadTemplate.hopCount : 1,
    maxHops: MAX_HOPS,
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}
