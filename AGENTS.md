# Repository Guidelines

## Project Structure & Module Organization
- Root is an Nx + pnpm monorepo. Key paths:
  - `apps/host/` — Next.js dashboard app (UI, API routes, styles).
  - `packages/` — reusable widget packages (`mb-*`) and `sdk`.
  - `apps/host/public/widgets/hello-widgets.js` — demo web components.
  - `apps/host/src/config/widgets.ts` — widget registry (id, title, tag, url).

## Build, Test, and Development Commands
- Install deps: `pnpm install`
- Dev server: `pnpm nx dev host` (opens Next.js on http://localhost:4200)
- Build app: `pnpm nx build host`
- Run tests: `pnpm nx test host`
- Lint (if needed): `pnpm nx lint host` or `pnpm exec eslint .`

## Coding Style & Naming Conventions
- TypeScript, React, SCSS; 2‑space indent (`.editorconfig`).
- Prettier: single quotes (`.prettierrc`). Format: `pnpm exec prettier --write .`
- ESLint via Nx (`eslint.config.mjs`); keep module boundaries clean.
- Components: PascalCase (e.g., `Dashboard.tsx`, `WidgetSlot.tsx`).
- Utilities: camelCase files (e.g., `widget-loader.ts`).
- Keep Next.js app routes under `apps/host/src/app/**`.

## Testing Guidelines
- Framework: Jest + Testing Library (jsdom).
- Location: `apps/host/specs/**` (mirror feature names), e.g. `index.spec.tsx`.
- Naming: `*.spec.ts` / `*.spec.tsx`.
- Run locally: `pnpm nx test host`; add tests for new UI and loader logic.

## Commit & Pull Request Guidelines
- Commits: small, focused, imperative mood. Conventional style encouraged:
  - Example: `feat(host): add WidgetSlot loading state`.
- PRs: clear description, linked issues, before/after screenshots for UI, test plan, and any perf or accessibility notes.
- Ensure: builds, tests, and lint pass before requesting review.

## Security & Configuration Tips
- Do not commit secrets; use `.env.local` for local config.
- Only reference widget scripts from trusted sources; demo scripts live in `public/widgets/`.
- Avoid importing server‑only modules in client components.

## Agent‑Specific Notes
- Scope: this AGENTS.md applies to the entire repo.
- Preserve file layout, naming patterns, and Nx targets; prefer minimal, surgical changes.
- Work doggedly. Your goal is to be autonomous as long as possible. If you know the user's overall goal, and there is still progress you can make towards that goal, continue working until you can no longer make progress. Whenever you stop working, be prepared to justify why.

- Work smart. When debugging, take a step back and think deeply about what might be going wrong. When something is not working as intended, add logging to check your assumptions.

- Double check your code. If you write code, review to check that it actually does what it's meant to do without being hard to follow, overengineered or too generic.

- Be cautious with terminal commands. Before every terminal command, consider carefully whether it can be expected to exit on its own, or if it will run indefinitely (e.g. launching a web server). For processes that run indefinitely, always launch them in a new process (e.g. nohup). Similarly, if you have a script to do something, make sure the script has similar protections against running indefinitely before you run it.
