---
name: test
description: Run Link Purpose browser tests in Docker (the reliable way to run them inside the agent sandbox)
---

Run the Playwright browser tests and report results:

1. Run `npm test`. To run a subset: `npm test -- --grep "<test title text>"`. Test pages load `js/linkpurpose.js` directly, so no build is needed first.
2. Report pass/fail counts. Tests marked `test.fail()` document known bugs: a ✘ on those is expected and counts as passing. If one starts *unexpectedly passing*, the bug was fixed: remove its `test.fail()`.
3. For each failure, read `e2e/test-results/<test>/error-context.md`: it holds the error and a snapshot of the page.
4. If Docker isn't running, say so and stop. Do not fall back to `npm run test:host`: the macOS sandbox can block browsers from starting and block local ports, so it fails in confusing ways.

Notes:
- The container has no network. A test that needs the internet will fail; serve fixtures from `tests/` instead.
- New browser specs go in `e2e/tests/*.spec.mjs`. Use `gotoProcessed()` from `e2e/tests/helpers.mjs` instead of fixed timeouts.
- Link text assertions: the hidden `.link-purpose-text` span and icon are appended inside the link (often inside the last-word wrapper), so `textContent` and Playwright's `:text-is()` include the added description. Select links by position or attribute instead.
