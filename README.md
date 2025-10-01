# MyBoard

**A customizable dashboard that can host widgets from any framework** *(Enhanced with comprehensive widget system)*

MyBoard is a personal productivity dashboard built with Next.js that loads widgets as Web Components. The goal is to create a modular home where you can keep lightweight tools you actually use, built in different frameworks (React, Angular, Lit, or vanilla).

## 🎯 New Features & Improvements

### 🚀 Core Widget System
- ✅ **Framework-agnostic widgets** - Build with React, Vue, Angular, Lit, or vanilla JS
- ✅ **Type-safe event communication** - Fully typed widget interactions
- ✅ **Hot Module Replacement** - Instant updates during development  
- ✅ **Performance monitoring** - Built-in metrics tracking and optimization
- ✅ **Error boundaries** - Isolated widget failures don't crash the dashboard

### 👥 User Experience Features
- ✅ **Drag & drop dashboard** - Intuitive widget positioning
- ✅ **Real-time widget updates** - Live configuration changes
- ✅ **Theme system** - Customizable appearance
- ✅ **Layout persistence** - Save and restore dashboard layouts
- ✅ **Widget marketplace ready** - Easy discovery and installation

### 🔧 Developer Experience Features  
- ✅ **Widget SDK** - Comprehensive development toolkit
- ✅ **Widget CLI/Generator** - Scaffold new widgets quickly
- ✅ **Debug tools** - Built-in performance and event monitoring
- ✅ **Documentation generation** - Auto-generated widget docs
- ✅ **Testing framework** - Widget-specific testing utilities

### 🏗️ Architecture Benefits (Solving SPA Pain Points)

**Traditional SPA Problems → MyBoard Solutions:**

1. **Monolithic builds** → Independent widget deployment
2. **Framework coupling** → Framework-agnostic architecture  
3. **Poor modularity** → Complete widget isolation
4. **Type safety issues** → Fully typed widget communication
5. **Performance issues** → Lazy loading and resource management
6. **Development complexity** → Simple widget development model

## What's Currently Working

- ✅ Next.js host application with modern UI
- ✅ Nx monorepo setup with pnpm
- ✅ **Widget System Architecture** with typed events
- ✅ **Drag & Drop Dashboard** with real-time positioning
- ✅ **Widget Registry & Lifecycle Management**
- ✅ **Performance Monitor** with metrics tracking
- ✅ **State Management** with persistence
- ✅ **Event Bus System** for widget communication
- ✅ Development server with hot reload
- ✅ **Example Widgets** (Notes, Todo, Calendar)

## Coming Soon

- 🔄 React Notes widget (Web Component version)
- 🔄 Lit Pomodoro Timer widget
- 🔄 Widget Marketplace/Gallery UI
- 🔄 Advanced theming system
- 🔄 Widget security sandbox
- 🔄 API health endpoint

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm nx dev host

# Open http://localhost:3000
```

## Project Structure

```
myboard/
  apps/
    host/                    # Next.js dashboard app
  packages/
    widget-system/          # Core widget framework
      src/
        types.ts            # Widget interfaces & types
        base-widget.ts      # Base widget class
        event-bus.ts        # Typed event system
        widget-registry.ts  # Widget management
        widget-store.ts     # State persistence
        performance-monitor.ts # Metrics tracking
    widgets/
      notes-widget/         # Example notes widget
  
## Widget Development

### Creating a New Widget

```typescript
import { BaseWidget } from '@myboard/widget-system';

export class MyWidget extends BaseWidget {
  constructor(id: string, name: string, version: string) {
    super(id, name, version);
  }

  protected async render(): Promise<void> {
    // Your widget implementation
    this.element.innerHTML = '<h1>My Custom Widget</h1>';
  }

  protected async cleanup(): Promise<void> {
    // Cleanup logic
  }
}
```

### Widget Manifest

```json
{
  "id": "my-widget",
  "name": "My Widget",
  "version": "1.0.0",
  "framework": "vanilla",
  "category": "productivity",
  "permissions": {
    "storage": true,
    "network": false
  },
  "defaultSize": {
    "width": 300,
    "height": 200
  }
}
```

### Event Communication

```typescript
// Emit typed events
this.emit({
  type: 'data-updated',
  source: this.id,
  data: { value: 'new data' },
  timestamp: Date.now(),
  id: 'unique-event-id'
});

// Listen for events
this.on('theme-changed', (event) => {
  console.log('Theme updated:', event.data);
});
```

## Development

The host app is a Next.js application that loads and manages Web Component widgets with a comprehensive widget system providing:

- **Type-safe architecture** with full TypeScript support
- **Performance monitoring** with real-time metrics
- **Development tools** for debugging and optimization
- **Framework flexibility** supporting any frontend framework

```bash
# Run the host app
pnpm nx dev host

# Build the host app  
pnpm nx build host

# Run tests
pnpm nx test host

# Lint code
pnpm nx lint host
```

## Widget System API

### Core Components

- **BaseWidget**: Foundation class for all widgets
- **EventBus**: Type-safe event communication system
- **WidgetRegistry**: Widget lifecycle and discovery management
- **WidgetStore**: Persistent state management with localStorage
- **PerformanceMonitor**: Real-time metrics and alerts

### Debug Tools

In development mode, access debug tools via:

```javascript
// Browser console
window.MyBoardDebug.registry.getAll()        // All widgets
window.MyBoardDebug.monitor.getPerformanceSummary()  // Performance stats
window.MyBoardDebug.eventBus.getEventHistory()       // Event history
```

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
