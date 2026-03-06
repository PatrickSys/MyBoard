# MyBoard TODO / Agent Handoff

This file is the persistent state required by AGENTS.md. Multiple AI agents work across sessions — update this before stopping.

---

## Current State (as of 2026-03-06)

**Active branch:** `feat/shell-automation-monitor` (PR #3)
**PR #2:** `feat/runtime-governance` → `main` — **MERGED**
**PR #3:** All CI checks green (CI, GitGuardian, PR Hygiene). Ready for owner review and merge.

---

## PR #3 — All CI Green, Ready to Merge

**Branch:** `feat/shell-automation-monitor` → `main`
**Commit:** `d5d23c6 feat(host): add automation studio monitor and marketplace shell`
**PR:** https://github.com/PatrickSys/MyBoard/pull/3

### What PR #3 delivers

Track B of the v2 "MyBoard OS" milestone (SPEC.md section 12):

- **Automation Studio** (`Shift+A`): wire authoring overlay with visual SVG wires, persisted wire graph (`useAutomationStore`, localStorage), cycle detection, enable/disable/delete controls.
- **Automation Runtime** (`useAutomationRuntime`): subscribes to governed event bus, resolves matching wires, dispatches typed widget commands with hop-limit protection, success/failure notifications.
- **System Monitor** (`Shift+Esc`): floating panel showing per-widget health, throttle state, install/enable/force-kill/clear-quarantine controls via `useSystemHealth`.
- **Notification Hub**: toast center with severity levels, de-duplication, and history.
- **Dashboard Shell**: `DashboardHeader` with marketplace (`Shift+M`), settings, automation, and monitor shortcuts. `SafeWidgetSlot` error boundaries. `useDashboardLayout` for persisted/reconciled layout. `useWidgetCatalog` + `widgetInstallStore` for catalog-driven widget management.
- **WidgetSlot hardening**: passes `integrity` + `trustedOrigin` to `ensureLoaded` for SRI and origin checking.

### Key files added/changed by PR #3

| File | Purpose |
|------|---------|
| `apps/host/src/components/AutomationStudio.tsx` | Wire authoring UI overlay |
| `apps/host/src/components/SystemMonitor.tsx` | Health/operator controls panel |
| `apps/host/src/components/NotificationHub.tsx` | Toast + history notification center |
| `apps/host/src/components/DashboardHeader.tsx` | OS-shell header bar |
| `apps/host/src/components/WidgetMarketplace.tsx` | Widget install/browse overlay |
| `apps/host/src/components/WidgetSettingsPanel.tsx` | Per-widget settings |
| `apps/host/src/components/SafeWidgetSlot.tsx` | Error boundary wrapper |
| `apps/host/src/components/GridDashboard.tsx` | Major rewrite — shell integration, useEffect bridge |
| `apps/host/src/components/WidgetSlot.tsx` | integrity + trustedOrigin passthrough |
| `apps/host/src/hooks/useAutomationRuntime.ts` | Wire execution engine |
| `apps/host/src/hooks/useAutomationStore.ts` | Wire persistence + cycle detection |
| `apps/host/src/hooks/useSystemHealth.ts` | Health polling hook |
| `apps/host/src/hooks/useDashboardLayout.ts` | Persisted/reconciled layout |
| `apps/host/src/hooks/useWidgetCatalog.ts` | Catalog-driven widget management |
| `apps/host/src/hooks/useCardAnchors.ts` | Wire coordinate measurement |
| `apps/host/src/types/automation.ts` | AutomationWire type |

### Remaining review steps before merge

- [ ] Review using `internal-docs/private/implementation-archive/2026-02-16-phase2/owner-framework/pr-reviews/PR-3-AUTOMATION-SHELL.md`
- [ ] Validate high-value files: `useAutomationRuntime.ts`, `useAutomationStore.ts`, `AutomationStudio.tsx`, `SystemMonitor.tsx`, `useSystemHealth.ts`, `GridDashboard.tsx`
- [ ] Manual: open studio/monitor shortcuts (Shift+A, Shift+Esc, Shift+M) and verify key flows
- [ ] Owner merge decision

---

## After PR #3 Merges — Immediate Next Actions

### 1. Update local main

```bash
git checkout main && git pull origin main
```

### 2. Rebase PR #4 onto main

PR #4 (`feat/widget-contract-adoption`) still targets `feat/runtime-governance` on GitHub. Fix:

```bash
gh pr edit 4 --base main
git checkout feat/widget-contract-adoption
git rebase origin/main
# resolve conflicts if any
pnpm nx build host && pnpm nx test host
git push --force-with-lease
```

PR #4 delivers widget contract adoption — check its branch for details.

### 3. Rebase PR #5 onto main

PR #5 (`test/quality-hardening`) targets `feat/shell-automation-monitor`. After #3 merges, rebase onto main:

```bash
gh pr edit 5 --base main
git checkout test/quality-hardening
git rebase origin/main
pnpm nx build host && pnpm nx test host
git push --force-with-lease
```

### 4. PR #6 is independent

PR #6 (`chore/dev-runtime-reliability`) already targets `main`. Can be reviewed/merged anytime.

---

## PR Review Queue

| # | Branch | Target | Status | Action after #3 merges |
|---|--------|--------|--------|------------------------|
| #2 | `feat/runtime-governance` | `main` | **MERGED** | — |
| #3 | `feat/shell-automation-monitor` | `main` | **All CI green, ready to merge** | Merge |
| #4 | `feat/widget-contract-adoption` | `feat/runtime-governance` | Not started | `gh pr edit 4 --base main` + rebase |
| #5 | `test/quality-hardening` | `feat/shell-automation-monitor` | Not started | `gh pr edit 5 --base main` + rebase |
| #6 | `chore/dev-runtime-reliability` | `main` | Not started | Independent, review anytime |

---

## Architecture Decisions Made (Do Not Revisit Without Good Reason)

### SDK bundling: per-widget with shared global runtime
Each widget bundles `@myboard/sdk` inline. State is shared via `window.__MYBOARD_SDK_RUNTIME__`. This is intentional, tested, and correct. Do not externalize the SDK or serve a shared bundle.

### Governance kernel wiring (updated by PR #3)
PR #2 used module-level `registerHostBridge(runtimeKernel.bridge)`. PR #3 moves this to a `useEffect` in `GridDashboard` that extends the bridge with `requestHostCapability`, `getWidgetSettings`, and `setWidgetSettings`. This is the correct pattern because it needs reactive hook data.

### Feature flags
All governance is enabled by default. CSP reporting is off by default (`cspReportOnlyEnabled: false`). Do not flip CSP on without a `/api/security/csp-report` endpoint.

### Catalog vs render list
`WIDGET_CATALOG` (in `widget-catalog.ts`) is the full manifest registry including future widgets. `WIDGETS` (in `config/widgets.ts`) is the render list — only add a widget here when its bundle exists. These are intentionally separate.

### Bot-reported issue that is INVALID — Do Not "Fix"
**"SDK singletons split across widget bundles"** — The SDK uses `shared-runtime.ts` with `window.__MYBOARD_SDK_RUNTIME__`. Per-widget bundling is intentional.

---

## Residual Risks

- Telemetry is in-memory only; lost on page reload. By design for now.
- `WIDGET_CATALOG` includes a `taskboard` widget but no bundle exists — placeholder for PR #4.
- `act(...)` test warnings in `useWidgetCatalog` — cosmetic, not functional.
