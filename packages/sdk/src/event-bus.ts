/**
 * Lightweight event bus for widget-to-widget communication.
 *
 * Enables widgets to publish and subscribe to events without tight coupling.
 * Events are namespaced by widget ID to prevent collisions.
 */

export interface WidgetEvent<T = unknown> {
    widgetId: string;
    type: string;
    data?: T;
    timestamp: number;
}

type EventHandler<T = unknown> = (event: WidgetEvent<T>) => void;

class EventBus {
    private subscribers = new Map<string, Set<EventHandler>>();

    /**
     * Publish an event from a widget.
     * Event type is automatically namespaced as `widgetId:eventType`.
     */
    publish<T = unknown>(widgetId: string, eventType: string, data?: T): void {
        const event: WidgetEvent<T> = {
            widgetId,
            type: eventType,
            data,
            timestamp: Date.now(),
        };

        // Namespace prevents collisions: 'notes:added' vs 'todos:added'
        const namespacedType = `${widgetId}:${eventType}`;
        const handlers = this.subscribers.get(namespacedType);

        if (handlers && handlers.size > 0) {
            handlers.forEach((handler) => {
                try {
                    handler(event);
                } catch (error) {
                    console.error(
                        `[EventBus] Error in handler for ${namespacedType}:`,
                        error
                    );
                }
            });
        }
    }

    /**
     * Subscribe to events from a specific widget.
     * Returns an unsubscribe function.
     */
    subscribe<T = unknown>(
        widgetId: string,
        eventType: string,
        handler: EventHandler<T>
    ): () => void {
        const namespacedType = `${widgetId}:${eventType}`;

        if (!this.subscribers.has(namespacedType)) {
            this.subscribers.set(namespacedType, new Set());
        }

        this.subscribers.get(namespacedType)!.add(handler as EventHandler);

        // Return unsubscribe function
        return () => {
            const handlers = this.subscribers.get(namespacedType);
            if (handlers) {
                handlers.delete(handler as EventHandler);
                if (handlers.size === 0) {
                    this.subscribers.delete(namespacedType);
                }
            }
        };
    }

    /**
     * Clear all subscriptions (useful for cleanup in tests).
     */
    clear(): void {
        this.subscribers.clear();
    }
}

/**
 * Global event bus instance for cross-widget communication.
 */
export const eventBus = new EventBus();

