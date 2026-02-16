import type { WidgetManifest } from '@myboard/sdk';
import { createRuntimeKernel } from '../src/lib/widget-runtime-kernel';
import { WidgetProcessManager } from '../src/lib/widget-process-manager';
import { EventGovernor } from '../src/lib/event-governor';
import { WidgetTelemetryService } from '../src/lib/telemetry-service';

const manifest: WidgetManifest = {
  id: 'taskboard',
  title: 'Task Board',
  tag: 'mb-taskboard',
  url: '/widgets/mb-taskboard.js',
  version: '1.0.0',
  permissions: ['storage', 'events'],
  automation: {
    events: [{ key: 'task-created', label: 'Task Created' }],
    actions: [{ key: 'task.create', label: 'Create Task' }],
  },
};

describe('widget-runtime-kernel', () => {
  let now = 0;

  function createKernel() {
    const processManager = new WidgetProcessManager({
      now: () => now,
      storageKey: 'test.kernel.process',
    });
    processManager.__resetForTests();

    const telemetry = new WidgetTelemetryService({
      now: () => now,
    });
    const governor = new EventGovernor({
      now: () => now,
      burstCapacity: 2,
      refillPerSecond: 1,
    });

    return createRuntimeKernel({
      now: () => now,
      getManifestById: (widgetId) => (widgetId === 'taskboard' ? manifest : undefined),
      processManager,
      telemetry,
      governor,
    });
  }

  it('blocks command dispatch when target action is not declared', async () => {
    const kernel = createKernel();
    const result = await kernel.bridge.dispatchWidgetCommand({
      commandId: 'cmd-1',
      targetWidgetId: 'taskboard',
      commandType: 'task.delete',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('COMMAND_ACTION_NOT_DECLARED');
    }
  });

  it('dispatches command to registered handler when declared', async () => {
    const kernel = createKernel();
    kernel.registerCommandHandler('taskboard', 'task.create', async (request) => ({
      ok: true,
      result: request.payload?.title,
    }));

    const result = await kernel.bridge.dispatchWidgetCommand({
      commandId: 'cmd-2',
      targetWidgetId: 'taskboard',
      commandType: 'task.create',
      payload: { title: 'Write docs' },
    });

    expect(result).toEqual({ ok: true, result: 'Write docs' });
  });

  it('applies throttling in event governance hook', () => {
    const kernel = createKernel();
    expect(
      kernel.bridge.beforePublishEvent({
        widgetId: 'taskboard',
        type: 'task-created',
        timestamp: now,
      })
    ).toBe(true);
    expect(
      kernel.bridge.beforePublishEvent({
        widgetId: 'taskboard',
        type: 'task-created',
        timestamp: now,
      })
    ).toBe(true);
    const blocked = kernel.bridge.beforePublishEvent({
      widgetId: 'taskboard',
      type: 'task-created',
      timestamp: now,
    });
    expect(blocked).toBe(false);
  });
});
