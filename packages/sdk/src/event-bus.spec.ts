import { eventBus } from './event-bus';

describe('EventBus', () => {
    beforeEach(() => {
        eventBus.clear();
    });

    describe('publish/subscribe', () => {
        it('should deliver events to subscribers', () => {
            const handler = jest.fn();
            eventBus.subscribe('test-widget', 'test-event', handler);

            eventBus.publish('test-widget', 'test-event', { value: 42 });

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler).toHaveBeenCalledWith(
                expect.objectContaining({
                    widgetId: 'test-widget',
                    type: 'test-event',
                    data: { value: 42 },
                })
            );
        });

        it('should namespace events by widget ID', () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            eventBus.subscribe('widget-1', 'event', handler1);
            eventBus.subscribe('widget-2', 'event', handler2);

            eventBus.publish('widget-1', 'event');

            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).not.toHaveBeenCalled();
        });

        it('should handle multiple subscribers for same event', () => {
            const handler1 = jest.fn();
            const handler2 = jest.fn();

            eventBus.subscribe('widget', 'event', handler1);
            eventBus.subscribe('widget', 'event', handler2);

            eventBus.publish('widget', 'event');

            expect(handler1).toHaveBeenCalledTimes(1);
            expect(handler2).toHaveBeenCalledTimes(1);
        });

        it('should not call handler after unsubscribe', () => {
            const handler = jest.fn();
            const unsubscribe = eventBus.subscribe('widget', 'event', handler);

            eventBus.publish('widget', 'event');
            expect(handler).toHaveBeenCalledTimes(1);

            unsubscribe();
            eventBus.publish('widget', 'event');
            expect(handler).toHaveBeenCalledTimes(1);
        });

        it('should include timestamp in event', () => {
            const handler = jest.fn();
            eventBus.subscribe('widget', 'event', handler);

            const before = Date.now();
            eventBus.publish('widget', 'event');
            const after = Date.now();

            expect(handler).toHaveBeenCalledWith(
                expect.objectContaining({
                    timestamp: expect.any(Number),
                })
            );

            const event = handler.mock.calls[0][0];
            expect(event.timestamp).toBeGreaterThanOrEqual(before);
            expect(event.timestamp).toBeLessThanOrEqual(after);
        });
    });

    describe('error handling', () => {
        it('should catch errors in handlers and continue', () => {
            const handler1 = jest.fn(() => {
                throw new Error('Test error');
            });
            const handler2 = jest.fn();
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            eventBus.subscribe('widget', 'event', handler1);
            eventBus.subscribe('widget', 'event', handler2);

            eventBus.publish('widget', 'event');

            expect(handler1).toHaveBeenCalled();
            expect(handler2).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });

    describe('clear', () => {
        it('should remove all subscriptions', () => {
            const handler = jest.fn();
            eventBus.subscribe('widget', 'event', handler);

            eventBus.clear();
            eventBus.publish('widget', 'event');

            expect(handler).not.toHaveBeenCalled();
        });
    });
});

