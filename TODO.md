# MyBoard TODO / Agent Handoff

This file is the persistent state required by AGENTS.md. Multiple AI agents work across sessions — update this before stopping.

---

## Current State (as of 2026-03-06)

**Active branch:** `feat/runtime-governance`
**PR:** #2 `feat/runtime-governance` → `main`
**Status:** Review complete. All P0/P1 blockers resolved. Ready for merge decision.

---

## PR #2 Review — What Was Done and Why

### Context
PR #2 adds a host runtime governance kernel: event throttling, widget quarantine, command routing, manifest policy, CSP header generation, and a shared SDK (`@myboard/sdk` replacing `@myboard/widget-utils`). It's the contract baseline that PRs #3-#6 depend on.

### Fixes Applied in This Session (commit c107473)

| Fix | File | Why |
|-----|------|-----|
| Define `__dirname` via `fileURLToPath` | `packages/mb-notes/vite.config.ts`, `packages/mb-pomodoro/vite.config.ts` | ESM files cannot use `__dirname` natively. Was causing build failures when Nx invokes vite from workspace root. `mb-counter` already had the correct pattern — aligned the other two. |
| Use `resolve(__dirname, ...)` for `outDir` | Same two files | Relative `outDir: '../../apps/host/public/widgets'` resolves against cwd (workspace root when called by Nx), placing output two levels above root. Absolute path is required. |
| `performanceTracker.markError(id)` in timeout path | `apps/host/src/components/WidgetSlot.tsx:60` | The 10s ready-timeout set error state but never marked the tracker, leaving widgets stuck in `'loading'` in the debug panel. The `onError` and `ensureLoaded` catch paths already called `markError` — this was a gap. |
| Remove unused singleton imports | `apps/host/src/lib/widget-runtime-kernel.ts` | `eventGovernor` and `widgetCommandRouter` singleton values were imported but `createRuntimeKernel` creates its own instances with custom options. Caused unnecessary module-level instantiation. |

### Bot-Reported Issues That Were Already Fixed on the Branch

These were flagged by Cursor/Codex against an earlier commit. All resolved before this session:

- **SRI set after appendChild**: `injectModuleScript` in `widget-loader.ts` now accepts `integrity` and sets it before `appendChild`. Fixed.
- **Runtime kernel not wired to SDK bridge**: `GridDashboard.tsx:14` calls `registerHostBridge(runtimeKernel.bridge)` at module level. Wired correctly.
- **WidgetSlot doesn't pass widgetId**: `ensureLoaded(url, { widgetId: id, expectedTag: tag })` — already there.
- **clearTimeout missing in catch**: Command router uses a `finally` block (lines 131-134) — better than a catch-only fix.

### Bot-Reported Issue That Is INVALID — Do Not "Fix"

**Cursor High: "SDK singletons split across widget bundles"**

This is wrong. The SDK uses `packages/sdk/src/shared-runtime.ts` which stores all shared state on `window.__MYBOARD_SDK_RUNTIME__`. Every widget bundle calls `getSharedSdkRuntime()` which reads from/writes to this global. Both the event bus subscribers and the host bridge registration flow through it. Per-widget bundling is intentional and correct. Cross-widget events work. Do NOT externalize `@myboard/sdk` or change the bundling approach.

### Full High-Risk File Review Results

All files from the runbook were read. No additional blockers found.

| File | Finding | Verdict |
|------|---------|---------|
| `widget-runtime-kernel.ts` | Factory pattern with injectable options; correct bridge exposure | Clean |
| `event-governor.ts` | Token-bucket throttle with correct state transitions | Clean |
| `widget-policy.ts` | `canLoad` is a thin alias for `canInstall` — redundant but harmless | Clean |
| `widget-csp.ts` | Correct CSP generation; feature-flagged off by default | Clean |
| `widget-install-store.ts` | SSR-guarded localStorage; policy checked before install; event emission | Clean |
| `widget-catalog.ts` | Thorough schema validation; duplicate detection | Clean |
| `GridDashboard.tsx` | Bridge registration at module level (correct for 'use client'); keyboard shortcuts safe | Clean |
| `telemetry-service.ts` | Clean time-bucket aggregation with retention enforcement | Clean |
| `widget-process-manager.ts` | Sliding-window crash tracking; persistent across reloads | Clean |
| SDK `shared-runtime.ts` | Key design: `window.__MYBOARD_SDK_RUNTIME__` shares bridge + event bus across bundles | Correct by design |
| `runtime-kernel-singleton.ts` | Creates kernel with manifest lookup; passes bridge to GridDashboard | Clean |

### One Forward-Looking Note (Not a Blocker)

`WIDGET_CATALOG` in `widget-catalog.ts` includes a `taskboard` widget (`url: '/widgets/mb-taskboard.js'`, `defaultInstalled: true`) but:
- No `packages/mb-taskboard/` exists
- `apps/host/src/config/widgets.ts` (the render list) does NOT include it
- So it will not be loaded or cause 404s currently

This is placeholder catalog data for PR #4. Leave it. When PR #4 adds the taskboard widget, it will also add the bundle and the entry in `widgets.ts`.

### Validation

- `pnpm nx build host` — passed, 7 static pages generated
- `pnpm nx test host` — 10/10 tests passed

---

## PR Merge Checklist for #2

- [x] No unresolved P0/P1
- [x] Intent matches changes (governance, command routing, policy, SDK upgrade)
- [x] Build passes
- [x] Tests pass (10/10)
- [x] Rollback: revert PR to remove governance kernel and return to widget-utils
- [x] Push fixes to remote and confirm CI passes (all checks green as of 2026-03-06)
- [ ] Owner merge decision

---

## PR Review Queue (from runbook)

PRs must be reviewed and merged in order — each depends on the previous:

| # | Branch | Target | Status |
|---|--------|--------|--------|
| #2 | `feat/runtime-governance` | `main` | Fixes committed, ready for CI + merge |
| #3 | `feat/shell-automation-monitor` | `feat/runtime-governance` | Not started — depends on #2 |
| #4 | `feat/widget-contract-adoption` | `feat/runtime-governance` | Not started — depends on #2, likely adds taskboard |
| #5 | `test/quality-hardening` | `feat/shell-automation-monitor` | Not started — depends on #3 |
| #6 | `chore/dev-runtime-reliability` | `main` | Not started |

---

## Architecture Decisions Made (Do Not Revisit Without Good Reason)

### SDK bundling: per-widget with shared global runtime
Each widget bundles `@myboard/sdk` inline. State is shared via `window.__MYBOARD_SDK_RUNTIME__`. This is intentional, tested, and correct. Do not externalize the SDK or serve a shared bundle.

### Governance kernel wiring
`registerHostBridge(runtimeKernel.bridge)` is called at module level in `GridDashboard.tsx`. This is the single wiring point. The kernel's `beforePublishEvent` and `dispatchWidgetCommand` go through the bridge into all widget SDK instances via the shared runtime.

### Feature flags
All governance is enabled by default. CSP reporting is off by default (`cspReportOnlyEnabled: false`). Do not flip CSP on without a `/api/security/csp-report` endpoint.

### Catalog vs render list
`WIDGET_CATALOG` (in `widget-catalog.ts`) is the full manifest registry including future widgets. `WIDGETS` (in `config/widgets.ts`) is the render list — only add a widget here when its bundle exists. These are intentionally separate.

---

## Residual Risks After PR #2

- Telemetry is in-memory only; lost on page reload. By design for now.
- `runtimeInstallEnabled: true` and `marketplaceEnabled: true` in feature flags but no marketplace UI yet — these guard code paths in PRs #3+.
- `useAutomationRuntime` hook referenced in the runbook does not exist yet — it is part of PR #3.
- No `hooks/` directory in host yet — part of PR #3.
