import {
  dispatchWidgetCommand,
  getWidgetSettings,
  registerWidgetCommandHandler,
  registerHostBridge,
  requestHostCapability,
  setWidgetSettings,
} from './host-bridge';

describe('host-bridge', () => {
  it('delegates capability checks to registered bridge', async () => {
    registerHostBridge({
      requestHostCapability: (permission, widgetId) =>
        permission === 'events' && widgetId === 'notes',
    });

    await expect(requestHostCapability('events', 'notes')).resolves.toBe(true);
    await expect(requestHostCapability('network', 'notes')).resolves.toBe(false);
  });

  it('reads and writes settings through registered bridge', () => {
    let settingsState: Record<string, unknown> = {};
    registerHostBridge({
      getWidgetSettings: () => settingsState,
      setWidgetSettings: (_widgetId, next) => {
        settingsState = next as Record<string, unknown>;
      },
    });

    setWidgetSettings('notes', { showArchived: true });
    expect(getWidgetSettings('notes')).toEqual({ showArchived: true });
  });

  it('dispatches commands to host bridge when available', async () => {
    registerHostBridge({
      dispatchWidgetCommand: async (request) => ({
        ok: true,
        result: `${request.targetWidgetId}:${request.commandType}`,
      }),
    });

    const result = await dispatchWidgetCommand({
      commandId: 'cmd-1',
      targetWidgetId: 'taskboard',
      commandType: 'task.add',
      payload: { title: 'Write tests' },
    });

    expect(result).toEqual({ ok: true, result: 'taskboard:task.add' });
  });

  it('dispatches commands to locally registered handlers when host bridge is absent', async () => {
    registerHostBridge({});
    const unregister = registerWidgetCommandHandler('pomodoro', async (request) => ({
      ok: true,
      result: request.payload?.durationMinutes,
    }));

    const result = await dispatchWidgetCommand({
      commandId: 'cmd-2',
      targetWidgetId: 'pomodoro',
      commandType: 'timer.start',
      payload: { durationMinutes: 25 },
    });

    expect(result).toEqual({ ok: true, result: 25 });

    unregister();
  });
});

