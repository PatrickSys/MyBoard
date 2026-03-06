import { widgetStore } from './widget-store';

describe('WidgetStore', () => {
    beforeEach(() => {
        widgetStore.clearAll();
        localStorage.clear();
    });

    describe('getState/setState', () => {
        it('should store and retrieve state', () => {
            const state = { count: 42, name: 'test' };
            widgetStore.setState('widget-1', state);

            const retrieved = widgetStore.getState('widget-1');
            expect(retrieved).toEqual(state);
        });

        it('should return undefined for non-existent widget', () => {
            const state = widgetStore.getState('non-existent');
            expect(state).toBeUndefined();
        });

        it('should persist state to localStorage', () => {
            widgetStore.setState('widget-1', { value: 123 });

            const stored = localStorage.getItem('myboard-widget-states');
            expect(stored).toBeTruthy();

            const parsed = JSON.parse(stored!);
            expect(parsed['widget-1']).toEqual({ value: 123 });
        });

        it('should load state from localStorage on initialization', () => {
            // Manually set localStorage
            localStorage.setItem(
                'myboard-widget-states',
                JSON.stringify({ 'widget-1': { loaded: true } })
            );

            // Create a new instance (in real use, this would be on page load)
            const state = widgetStore.getState('widget-1');
            expect(state).toEqual({ loaded: true });
        });

        it('should handle multiple widgets independently', () => {
            widgetStore.setState('widget-1', { value: 1 });
            widgetStore.setState('widget-2', { value: 2 });

            expect(widgetStore.getState('widget-1')).toEqual({ value: 1 });
            expect(widgetStore.getState('widget-2')).toEqual({ value: 2 });
        });
    });

    describe('subscribe', () => {
        it('should notify subscribers of state changes', () => {
            const callback = jest.fn();
            widgetStore.subscribe('widget-1', callback);

            widgetStore.setState('widget-1', { count: 1 });

            expect(callback).toHaveBeenCalledTimes(1);
            expect(callback).toHaveBeenCalledWith({ count: 1 });
        });

        it('should support multiple subscribers', () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            widgetStore.subscribe('widget-1', callback1);
            widgetStore.subscribe('widget-1', callback2);

            widgetStore.setState('widget-1', { value: 42 });

            expect(callback1).toHaveBeenCalledWith({ value: 42 });
            expect(callback2).toHaveBeenCalledWith({ value: 42 });
        });

        it('should not notify after unsubscribe', () => {
            const callback = jest.fn();
            const unsubscribe = widgetStore.subscribe('widget-1', callback);

            widgetStore.setState('widget-1', { count: 1 });
            expect(callback).toHaveBeenCalledTimes(1);

            unsubscribe();
            widgetStore.setState('widget-1', { count: 2 });
            expect(callback).toHaveBeenCalledTimes(1);
        });

        it('should only notify subscribers of specific widget', () => {
            const callback1 = jest.fn();
            const callback2 = jest.fn();

            widgetStore.subscribe('widget-1', callback1);
            widgetStore.subscribe('widget-2', callback2);

            widgetStore.setState('widget-1', { value: 1 });

            expect(callback1).toHaveBeenCalled();
            expect(callback2).not.toHaveBeenCalled();
        });

        it('should catch errors in callbacks and continue', () => {
            const callback1 = jest.fn(() => {
                throw new Error('Test error');
            });
            const callback2 = jest.fn();
            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            widgetStore.subscribe('widget-1', callback1);
            widgetStore.subscribe('widget-1', callback2);

            widgetStore.setState('widget-1', { value: 1 });

            expect(callback1).toHaveBeenCalled();
            expect(callback2).toHaveBeenCalled();
            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
        });
    });

    describe('clearState', () => {
        it('should remove state for specific widget', () => {
            widgetStore.setState('widget-1', { value: 1 });
            widgetStore.setState('widget-2', { value: 2 });

            widgetStore.clearState('widget-1');

            expect(widgetStore.getState('widget-1')).toBeUndefined();
            expect(widgetStore.getState('widget-2')).toEqual({ value: 2 });
        });

        it('should persist clear to localStorage', () => {
            widgetStore.setState('widget-1', { value: 1 });
            widgetStore.clearState('widget-1');

            const stored = localStorage.getItem('myboard-widget-states');
            const parsed = JSON.parse(stored!);

            expect(parsed['widget-1']).toBeUndefined();
        });
    });

    describe('clearAll', () => {
        it('should remove all widget states', () => {
            widgetStore.setState('widget-1', { value: 1 });
            widgetStore.setState('widget-2', { value: 2 });

            widgetStore.clearAll();

            expect(widgetStore.getState('widget-1')).toBeUndefined();
            expect(widgetStore.getState('widget-2')).toBeUndefined();
        });

        it('should persist clear to localStorage', () => {
            widgetStore.setState('widget-1', { value: 1 });
            widgetStore.clearAll();

            const stored = localStorage.getItem('myboard-widget-states');
            const parsed = JSON.parse(stored!);

            expect(parsed).toEqual({});
        });
    });

    describe('error handling', () => {
        it('should handle localStorage errors gracefully', () => {
            const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
            const setItemSpy = jest
                .spyOn(Storage.prototype, 'setItem')
                .mockImplementation(() => {
                    throw new Error('Storage quota exceeded');
                });

            // Should not throw
            expect(() => {
                widgetStore.setState('widget-1', { large: 'data' });
            }).not.toThrow();

            expect(consoleSpy).toHaveBeenCalled();

            consoleSpy.mockRestore();
            setItemSpy.mockRestore();
        });
    });
});

