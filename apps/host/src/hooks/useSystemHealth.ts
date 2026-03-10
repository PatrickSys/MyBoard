import { useEffect, useState } from 'react';
import { runtimeKernel } from '../lib/runtime-kernel-singleton';
import { FEATURE_FLAGS } from '../config/feature-flags';

export type WidgetHealthView = {
  id: string;
  status: 'healthy' | 'warning' | 'disabled';
  crashCount: number;
  eps: number;
};

export function useSystemHealth(
  activeWidgetIds: string[],
  enabled = true
) {
  const [healthByWidget, setHealthByWidget] = useState<Record<string, WidgetHealthView>>({});

  const widgetIdsKey = activeWidgetIds.join(',');

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const pull = () => {
      const next: Record<string, WidgetHealthView> = {};
      const points = runtimeKernel.getTelemetryPoints({ limit: 1 });
      const globalEps = points[0]?.eventsPerSecond ?? 0;

      for (const widgetId of activeWidgetIds) {
        const health = runtimeKernel.getHealth(widgetId);
        const throttle = runtimeKernel.getThrottleState(widgetId);
        const widgetPoints = runtimeKernel.getTelemetryPoints({
          widgetId,
          limit: 1,
        });
        const eps = widgetPoints[0]?.eventsPerSecond ?? globalEps;
        const status =
          health.state === 'quarantined'
            ? 'disabled'
            : throttle.throttled
              ? 'warning'
              : 'healthy';

        next[widgetId] = {
          id: widgetId,
          status,
          crashCount: health.crashCountInWindow,
          eps,
        };
      }
      setHealthByWidget(next);
    };

    pull();
    if (!FEATURE_FLAGS.monitorPollingEnabled) {
      return;
    }
    const interval = setInterval(pull, 500);
    return () => clearInterval(interval);
  }, [widgetIdsKey, enabled]);

  return healthByWidget;
}
