import { WidgetCommandRouter } from '../src/lib/widget-command-router';

describe('widget-command-router', () => {
  let now = 0;

  function createRouter() {
    return new WidgetCommandRouter({
      now: () => now,
      timeoutMs: 50,
      dedupeWindowMs: 1000,
      maxHopCount: 2,
    });
  }

  it('dispatches to registered handler', async () => {
    const router = createRouter();
    router.registerHandler('taskboard', 'task.create', async (request) => ({
      ok: true,
      result: request.payload?.title,
    }));

    const result = await router.dispatch({
      commandId: 'cmd-1',
      targetWidgetId: 'taskboard',
      commandType: 'task.create',
      payload: { title: 'Ship feature' },
    });

    expect(result).toEqual({ ok: true, result: 'Ship feature' });
  });

  it('rejects duplicate command ids inside dedupe window', async () => {
    const router = createRouter();
    router.registerHandler('taskboard', 'task.create', async () => ({ ok: true }));

    await router.dispatch({
      commandId: 'cmd-dup',
      targetWidgetId: 'taskboard',
      commandType: 'task.create',
    });

    const duplicate = await router.dispatch({
      commandId: 'cmd-dup',
      targetWidgetId: 'taskboard',
      commandType: 'task.create',
    });

    expect(duplicate.ok).toBe(false);
    if (!duplicate.ok) {
      expect(duplicate.code).toBe('COMMAND_DUPLICATE');
    }
  });

  it('enforces hop limit', async () => {
    const router = createRouter();
    const result = await router.dispatch({
      commandId: 'cmd-hop',
      targetWidgetId: 'taskboard',
      commandType: 'task.create',
      hopCount: 3,
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('COMMAND_HOP_LIMIT_EXCEEDED');
    }
  });

  it('times out slow handlers', async () => {
    const router = createRouter();
    router.registerHandler(
      'taskboard',
      'task.create',
      async () =>
        new Promise((resolve) => {
          setTimeout(() => resolve({ ok: true }), 100);
        })
    );

    const result = await router.dispatch({
      commandId: 'cmd-timeout',
      targetWidgetId: 'taskboard',
      commandType: 'task.create',
    });

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.code).toBe('COMMAND_TIMEOUT');
    }
  });
});
