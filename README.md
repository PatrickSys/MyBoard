# MyBoard

**A customizable dashboard that can host widgets from any framework** *(in development)*

MyBoard is a personal productivity dashboard built with Next.js that loads widgets as Web Components. The goal is to create a modular home where you can keep lightweight tools you actually use, built in different frameworks (React, Angular, Lit, or vanilla).

## What's Currently Working

- ✅ Next.js host application
- ✅ Nx monorepo setup with pnpm
- ✅ Development server with hot reload
- ✅ Dashboard with two demo widgets (Web Components)
- ✅ Lazy loader with dedupe + timeout
- ✅ Minimal contract: `widget-ready` / `widget-error`
- ✅ `/api/health` route

## Coming Soon

- 🔄 Real React Notes widget (bundled)
- 🔄 Real Lit Pomodoro widget (bundled)

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm nx dev host

# Open http://localhost:4200
```

## Project Structure

```
myboard/
  apps/
    host/           # Next.js dashboard app
  packages/
    widget-utils/   # shared widget lifecycle utils
```

## Contract (v0.1)

- Events:
  - `widget-ready` (bubbles) — widget booted
  - `widget-error` (bubbles, `{detail:{reason}}`) — host shows reason
- Widgets must emit `widget-ready` asynchronously from `connectedCallback` (e.g., `queueMicrotask`).

## Development

```bash
# Run the host app
pnpm nx dev host

# Build the host app
pnpm nx build host

# Run tests
pnpm nx test host
```

## Widgets and lazy-loading

- Demo widgets live under `apps/host/public/widgets/hello-widgets.js` and register `hello-notes` and `hello-timer`.
- The host lazy-loads widget scripts with a small loader that dedupes by URL and times out after 10s.
- To add a new widget in v0.1, extend `apps/host/src/config/widgets.ts` with `{ id, title, tag, url }` and ensure the script registers the tag.

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
