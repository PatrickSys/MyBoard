# MyBoard

**A customizable dashboard that can host widgets from any framework** *(in development)*

MyBoard is a personal productivity dashboard built with Next.js that loads widgets as Web Components. The goal is to create a modular home where you can keep lightweight tools you actually use, built in different frameworks (React, Angular, Lit, or vanilla).

## What's Currently Working

- ✅ Next.js host application
- ✅ Nx monorepo setup with pnpm
- ✅ Development server with hot reload
- ✅ Basic project structure

## Coming Soon

- 🔄 React Notes widget (Web Component)
- 🔄 Lit Pomodoro Timer widget
- 🔄 Minimal widget lifecycle contract (`widget-ready` / `widget-error`)
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
    host/           # Next.js dashboard app
  packages/         # (planned) shared utilities
```

## Development

The host app is a Next.js application that will eventually load and manage Web Component widgets. Currently, it's a basic Next.js setup ready for widget integration.

```bash
# Run the host app
pnpm nx dev host

# Build the host app
pnpm nx build host

# Run tests
pnpm nx test host
```

## License

Licensed under the Apache License, Version 2.0. See [LICENSE](LICENSE) for details.
