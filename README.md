# MyBoard — v1.1

A modern, framework-agnostic widget dashboard showcasing micro-frontend architecture, cross-widget communication, and centralized state management.

## What's included in v1.1

### Dashboard Features
- React Grid Layout with responsive 4/2/1 column design
- Edit mode: Drag/resize widgets, keyboard shortcuts (Shift+E, Shift+R)
- Light/dark theme toggle with CSS custom properties
- Layout persistence in localStorage
- Smooth widget loading with skeleton animations
- Performance tracking with load time display (dev mode)

### Widget System
- **Event Bus**: Cross-widget communication without tight coupling
- **Widget Store**: Centralized state management with localStorage persistence  
- **Performance Tracker**: Lightweight monitoring of load times and errors
- **Debug Panel**: Development tools (Shift+D) showing metrics, events, and state

### Included Widgets
- **Notes** (React): Quick note-taking with persistent storage
- **Pomodoro** (Lit): Focus timer with work/break intervals
- **Counter** (Lit): Demonstrates event bus by tracking notes added

### Developer Experience
- Type-safe SDK (`@myboard/sdk`) for widget development
- Framework-agnostic: Works with React, Lit, Angular, vanilla JS
- Hot reload during development
- Comprehensive documentation and examples

## Quick start

```bash
# Install dependencies
pnpm install

# Start the host (Next.js on http://localhost:4200)
pnpm nx dev host

# Production build (builds widgets, then host)
pnpm nx build host
```

## Project structure

```
myboard/
  apps/
    host/                     # Next.js dashboard app
      src/
        components/           # Dashboard, WidgetSlot, DebugPanel
        lib/                  # widget-loader, performance-tracker
      public/widgets/         # Built widget bundles
  packages/
    sdk/                      # Widget SDK (events, store, event bus)
    mb-notes/                 # Notes widget (React)
    mb-pomodoro/              # Pomodoro timer (Lit)
    mb-counter/               # Counter widget (Lit) - demonstrates system
```

## Widget Contract

### Lifecycle Events
- `widget-ready` — Widget successfully mounted
- `widget-error` — Widget encountered an error
- `widget-change` — Widget value changed

### SDK Features
- **Event Bus**: `eventBus.publish()` / `eventBus.subscribe()` for cross-widget communication
- **Widget Store**: `widgetStore.getState()` / `widgetStore.setState()` for persistent state
- **Type Safety**: Full TypeScript support with comprehensive types

See [`packages/sdk/README.md`](packages/sdk/README.md) for detailed API documentation.

## Widgets and lazy loading

- Widget registry: `apps/host/src/config/widgets.ts` lists `{ id, title, tag, url }` for each widget
- Loader: `apps/host/src/lib/widget-loader.ts` dedupes in-flight loads per URL and enforces a timeout
- Slot behavior: loading skeleton → ready fade-in; error panel with up to 3 retries

## Adding a widget

1) Create a package under `packages/<your-widget>/` and expose a Custom Element:
   - Define your element (e.g., `customElements.define('mb-foo', MbFooElement)`).
   - Emit `widget-ready` when mounted; `widget-error` on failure.
2) Configure Vite to output directly to the host’s public widgets directory:

```ts
// vite.config.ts (example)
import { defineConfig } from 'vite';
export default defineConfig({
  build: {
    lib: { entry: 'src/index.ts', formats: ['es'], fileName: () => 'mb-foo.js' },
    outDir: '../../apps/host/public/widgets',
    emptyOutDir: false,
  },
});
```

3) Register the widget in `apps/host/src/config/widgets.ts`:

```ts
{ id: 'foo', title: 'Foo', tag: 'mb-foo', url: '/widgets/mb-foo.js' }
```

4) Security note: Only reference widget scripts you trust.

## Accessibility

- Focus rings enabled on interactive controls
- Status badge uses `aria-live="polite"` to announce changes
- Keep destructive actions labeled (e.g., `aria-label="Delete note"`)

## Deployment

- Host is a standard Next.js app; deploy with your preferred provider (e.g., Vercel)
- Ensure built widget bundles exist in `apps/host/public/widgets/`

## Architecture Highlights

### Micro-Frontend Pattern
- Independent widget deployment
- Framework-agnostic design
- Runtime composition
- Error isolation

### State Management
- Centralized widget store
- Automatic localStorage persistence
- Reactive subscriptions
- Cross-widget event bus

### Developer Experience
- Type-safe SDK
- Performance monitoring
- Debug panel (dev mode)
- Hot module reload

## Keyboard Shortcuts

- `Shift+E` — Toggle edit mode
- `Shift+R` — Reset layout
- `Shift+D` — Toggle debug panel (dev mode)

## Roadmap

- [ ] Widget marketplace/discovery
- [ ] Widget configuration UI
- [ ] Angular Elements example widget
- [ ] PWA support (offline, installable)
- [ ] Backend integration (Supabase/Auth)
- [ ] Comprehensive test coverage

## License

Apache-2.0 — see [LICENSE](LICENSE)
