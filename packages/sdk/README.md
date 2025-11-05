# @myboard/sdk

Minimal, framework-agnostic SDK for building MyBoard widgets.

## Overview

The MyBoard SDK provides three core features:

1. **Lifecycle Contract** - Standardized events for widget communication
2. **Event Bus** - Cross-widget communication without coupling
3. **Widget Store** - Centralized state management with persistence

## Installation

```bash
pnpm add @myboard/sdk
```

## Quick Start

### Basic Widget (Vanilla JS)

```typescript
import { emitReady, emitError } from '@myboard/sdk';

class MyWidget extends HTMLElement {
  connectedCallback() {
    try {
      this.innerHTML = `<div>Hello, MyBoard!</div>`;
      queueMicrotask(() => emitReady(this));
    } catch (e) {
      emitError(this, e.message);
    }
  }
}

customElements.define('my-widget', MyWidget);
```

### With State Persistence

```typescript
import { emitReady, widgetStore } from '@myboard/sdk';

const WIDGET_ID = 'my-widget';

class MyWidget extends HTMLElement {
  connectedCallback() {
    // Load persisted state
    const state = widgetStore.getState(WIDGET_ID) || { count: 0 };
    
    // Update state
    const newState = { count: state.count + 1 };
    widgetStore.setState(WIDGET_ID, newState);
    
    this.innerHTML = `<div>Count: ${newState.count}</div>`;
    queueMicrotask(() => emitReady(this));
  }
}

customElements.define('my-widget', MyWidget);
```

### Cross-Widget Communication

```typescript
import { emitReady, eventBus } from '@myboard/sdk';

const WIDGET_ID = 'listener-widget';

class ListenerWidget extends HTMLElement {
  private unsubscribe?: () => void;

  connectedCallback() {
    // Subscribe to events from another widget
    this.unsubscribe = eventBus.subscribe('notes', 'note-added', (event) => {
      console.log('Note added:', event.data);
      this.updateUI();
    });

    queueMicrotask(() => emitReady(this));
  }

  disconnectedCallback() {
    this.unsubscribe?.();
  }

  private updateUI() {
    // Update widget UI based on event
  }
}

customElements.define('listener-widget', ListenerWidget);
```

## API Reference

### Lifecycle Events

#### `emitReady(element: Element): void`

Emit when widget has successfully mounted and is ready to use.

```typescript
import { emitReady } from '@myboard/sdk';

queueMicrotask(() => emitReady(this));
```

#### `emitError(element: Element, reason: string): void`

Emit when widget encounters an error during mount or operation.

```typescript
import { emitError } from '@myboard/sdk';

try {
  // Widget initialization
} catch (e) {
  emitError(this, e.message);
}
```

#### `emitChange<T>(element: Element, value: T, meta?: Record<string, unknown>): void`

Emit when widget value changes (e.g., user interaction, data update).

```typescript
import { emitChange } from '@myboard/sdk';

function handleInput(value: string) {
  emitChange(this, value, { timestamp: Date.now() });
}
```

### Event Bus

Cross-widget communication system with namespaced events.

#### `eventBus.publish<T>(widgetId: string, eventType: string, data?: T): void`

Publish an event from your widget.

```typescript
import { eventBus } from '@myboard/sdk';

eventBus.publish('my-widget', 'data-updated', {
  value: 42,
  timestamp: Date.now(),
});
```

#### `eventBus.subscribe<T>(widgetId: string, eventType: string, handler: (event: WidgetEvent<T>) => void): () => void`

Subscribe to events from another widget. Returns an unsubscribe function.

```typescript
import { eventBus } from '@myboard/sdk';

const unsubscribe = eventBus.subscribe('notes', 'note-added', (event) => {
  console.log('Received event from notes widget:', event.data);
});

// Later: clean up subscription
unsubscribe();
```

#### Event Structure

```typescript
interface WidgetEvent<T = unknown> {
  widgetId: string;  // Source widget ID
  type: string;       // Event type
  data?: T;           // Event payload
  timestamp: number;  // Event timestamp
}
```

### Widget Store

Centralized state management with automatic localStorage persistence.

#### `widgetStore.getState<T>(widgetId: string): T | undefined`

Get current state for a widget.

```typescript
import { widgetStore } from '@myboard/sdk';

const state = widgetStore.getState<{ count: number }>('my-widget');
console.log(state?.count);
```

#### `widgetStore.setState<T>(widgetId: string, state: T): void`

Set state for a widget. Automatically persists and notifies subscribers.

```typescript
import { widgetStore } from '@myboard/sdk';

widgetStore.setState('my-widget', { count: 42 });
```

#### `widgetStore.subscribe<T>(widgetId: string, callback: (state: T) => void): () => void`

Subscribe to state changes for a specific widget. Returns unsubscribe function.

```typescript
import { widgetStore } from '@myboard/sdk';

const unsubscribe = widgetStore.subscribe('my-widget', (state) => {
  console.log('State updated:', state);
});

// Later: clean up subscription
unsubscribe();
```

#### `widgetStore.clearState(widgetId: string): void`

Clear state for a specific widget.

```typescript
import { widgetStore } from '@myboard/sdk';

widgetStore.clearState('my-widget');
```

## Framework Examples

### React

```tsx
import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { emitReady, widgetStore } from '@myboard/sdk';

const WIDGET_ID = 'my-widget';

function App() {
  const [state, setState] = useState(() => {
    return widgetStore.getState(WIDGET_ID) || { count: 0 };
  });

  useEffect(() => {
    widgetStore.setState(WIDGET_ID, state);
  }, [state]);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => setState(s => ({ count: s.count + 1 }))}>
        Increment
      </button>
    </div>
  );
}

class MyWidget extends HTMLElement {
  connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' });
    const mount = document.createElement('div');
    shadow.appendChild(mount);
    createRoot(mount).render(<App />);
    queueMicrotask(() => emitReady(this));
  }
}

customElements.define('my-widget', MyWidget);
```

### Lit

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { emitReady, widgetStore, eventBus } from '@myboard/sdk';

const WIDGET_ID = 'my-widget';

@customElement('my-widget')
export class MyWidget extends LitElement {
  @state() private count = 0;

  connectedCallback() {
    super.connectedCallback();
    const stored = widgetStore.getState<{ count: number }>(WIDGET_ID);
    this.count = stored?.count || 0;
    queueMicrotask(() => emitReady(this));
  }

  private handleIncrement() {
    this.count++;
    widgetStore.setState(WIDGET_ID, { count: this.count });
    eventBus.publish(WIDGET_ID, 'count-changed', { count: this.count });
  }

  render() {
    return html`
      <div>
        <p>Count: ${this.count}</p>
        <button @click=${this.handleIncrement}>Increment</button>
      </div>
    `;
  }
}
```

## TypeScript Types

All exports are fully typed:

```typescript
import type { 
  WidgetTheme,
  WidgetChange,
  WidgetErrorDetail,
  WidgetEvent,
  WidgetEventMap 
} from '@myboard/sdk';
```

## Best Practices

1. **Always emit `widget-ready`** - Use `queueMicrotask(() => emitReady(this))` after mounting
2. **Handle errors gracefully** - Wrap initialization in try/catch and use `emitError`
3. **Clean up subscriptions** - Unsubscribe from events in `disconnectedCallback`
4. **Namespace events** - Use descriptive event names: `'note-added'`, `'data-updated'`
5. **Keep state serializable** - Widget store uses `JSON.stringify` for persistence

## License

Apache-2.0

