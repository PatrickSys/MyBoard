import { WidgetTelemetryService } from '../src/lib/telemetry-service';

describe('telemetry-service', () => {
  let now = 0;

  function createService() {
    return new WidgetTelemetryService({
      now: () => now,
      bucketMs: 1000,
      maxPoints: 3,
    });
  }

  it('records events/errors/render metrics by second bucket', () => {
    const telemetry = createService();

    telemetry.recordEvent('notes');
    telemetry.recordEvent('notes');
    telemetry.recordError('notes');
    telemetry.recordRender('notes', 120);
    telemetry.recordRender('notes', 80);

    const points = telemetry.query({ widgetId: 'notes' });
    expect(points).toHaveLength(1);
    expect(points[0]).toEqual(
      expect.objectContaining({
        eventsPerSecond: 2,
        errorCount: 1,
        averageRenderMs: 100,
      })
    );
  });

  it('supports global aggregation across widgets', () => {
    const telemetry = createService();

    telemetry.recordEvent('notes');
    telemetry.recordEvent('pomodoro');
    telemetry.recordError('pomodoro');

    const points = telemetry.query();
    expect(points[0].eventsPerSecond).toBe(2);
    expect(points[0].errorCount).toBe(1);
  });

  it('evicts oldest points past retention', () => {
    const telemetry = createService();

    telemetry.recordEvent('notes');
    now += 1000;
    telemetry.recordEvent('notes');
    now += 1000;
    telemetry.recordEvent('notes');
    now += 1000;
    telemetry.recordEvent('notes');

    const points = telemetry.query({ widgetId: 'notes' });
    expect(points).toHaveLength(3);
  });
});
