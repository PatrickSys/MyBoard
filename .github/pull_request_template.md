## Description
What’s changing and why? Provide context and goals.

## Linked Issues
Closes #<issue-id>

## Screenshots
Before/After or GIFs for UI changes.

## Test Plan
List what you ran and what you verified:

```bash
# unit/integration tests
pnpm nx test host

# typecheck and build
pnpm nx build host

# manual verification (optional)
pnpm nx dev host  # verify key flows at http://localhost:4200
```

## Changes
- [ ] Summary bullets of notable changes
- [ ] Any breaking changes called out

## Checklist
- [ ] Commit messages are clear (e.g., feat(host): ...)
- [ ] Builds pass (`pnpm nx build host`)
- [ ] Tests added/updated and pass (`pnpm nx test host`)
- [ ] Lint/format pass (`pnpm exec eslint .`, `pnpm exec prettier --check .`)
- [ ] Updated docs where needed (e.g., `README.md`, `AGENTS.md`)
- [ ] Accessibility/Perf considered (if UI affects rendering)
- [ ] Security considered (no secrets committed; trusted widget sources)

## Notes for Reviewers
Call out areas that need special attention or where you’d like feedback.

