# MyBoard — v1

A polished, framework-agnostic dashboard. The host is Next.js, widgets are Web Components (React, Lit, or vanilla), composed at runtime with a tiny lifecycle contract.

## What’s included in v1

- React Grid Layout dashboard (2×2 responsive) with edit mode:
  - Drag/resize via card header handles
  - Keyboard: Shift+E to toggle edit, Shift+R to reset layout
  - Layout persistence in `localStorage`
- Widget loading via URLs with a minimal contract:
  - Events: `widget-ready` (bubbles) and `widget-error` (bubbles, `{ detail: { reason } }`)
  - Lazy loader dedupes by URL and times out after 10s
  - Slots show loading skeleton, error panel (with retry), and fade-in on ready
- Polished UI/UX:
  - Light theme, consistent borders/shadows, focus rings
  - Topbar with brand, mode chip, and actions
  - Status badges for loading/ready/error with subtle colored dot
- Two widgets (bundled to `apps/host/public/widgets`):
  - Notes (React): Enter-to-add, calm styling
  - Pomodoro (Lit): Larger time, slimmer bar anchored to bottom

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
      public/widgets/         # Built widget bundles (mb-notes.js, mb-pomodoro.js)
  packages/
    mb-notes/                 # React widget (Web Component)
    mb-pomodoro/              # Lit widget (Web Component)
    widget-utils/             # Contract helpers (emitReady, emitError)
```

## Contract (v1)

- Events:
  - `widget-ready` (bubbles) — widget booted
  - `widget-error` (bubbles, `{ detail: { reason } }`) — host displays error
- Emission guidance: emit `widget-ready` asynchronously from `connectedCallback` (e.g., `queueMicrotask`) to ensure listeners are attached.
- Helpers: `@myboard/widget-utils` exports `emitReady(el)` and `emitError(el, reason)`.

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

## Roadmap (post-v1)

- Angular Elements widget
- PWA basics (install + offline shell)
- Contract expansion (props/outputs/theme tokens)
- Optional persistence via Supabase

## License

Apache-2.0 — see [LICENSE](LICENSE)
