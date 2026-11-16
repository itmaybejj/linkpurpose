# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What is Link Purpose

Link Purpose adds visible icons and screen reader text to links that do something other than navigate within the site: external, new window, download, document, app protocol, email and phone links. It is a single dependency-free browser script, distributed standalone and inside the Editoria11y Drupal/WordPress integrations.

## Commands

```bash
npm run build        # scripts/pack.sh: eslint --fix, then uglify js/linkpurpose.js -> js/linkpurpose.min.js
npm run lint         # ESLint on js/linkpurpose.js
npm run lint:fix     # Auto-fix lint issues
npm test             # Playwright browser tests in Docker (works in the agent sandbox)
npm run test:host    # Same tests on the host's Playwright browsers
```

### Running tests

Browser tests use Playwright and live in `e2e/tests/`. `npm test` runs them in the official Playwright Docker image matching the installed `@playwright/test` version (pinned exactly, to share the already-pulled image with editoria11y). Filter by title with `npm test -- --grep "<title>"`. Output lands in `e2e/test-results/` (each failure has an `error-context.md` with the error and a page snapshot) and `e2e/report/` (both git-ignored).

**Agents: use `npm test`.** The macOS sandbox can block browsers from starting and block binding local ports, so `npm run test:host` may fail inside it. Docker runs outside the sandbox. The container has no network, so tests must not depend on the internet (`tests/fontawesome.htm` and `tests/material.htm` load remote icon fonts and are manual-only).

Test pages load `js/linkpurpose.js` directly (no build step), so source changes are testable immediately. Run `npm run build` before committing so `linkpurpose.min.js` matches.

## Architecture

Everything is in `js/linkpurpose.js`: one `LinkPurpose` class whose constructor merges options and runs. Static state (`LinkPurpose.options`, `LinkPurpose.unique`, `LinkPurpose.run`) lives on the class.

`LinkPurpose.run()` = `findLinks()` → `processLinks()` → `markLinks()`:

- `findLinks` collects roots (`options.roots`, plus `shadowComponents` shadow roots), applies `noRunIfPresent/Absent`, starts a MutationObserver when `watch` is on, and queries `baseSelector` minus `ignore` and already-processed links.
- `processLinks` matches each link against `options.purposes` (highest `priority` wins the icon; `newWindow` is always appended as a second hit) and builds `marks`. **This is the read phase**: layout/style reads (`getComputedStyle`, `getBoundingClientRect`) belong here, before any writes.
- `markLinks` writes classes, the icon span, the hidden `.link-purpose-text` description (`aria-describedby`), and wraps the last word in a `.link-purpose-nobreak` span so the icon cannot wrap alone. A final pass measures links and removes the nobreak where it overflowed the container.

### Performance rule

On a page with hundreds of links, interleaving DOM writes with layout-forcing reads (`getBoundingClientRect`, `offsetWidth`, `getComputedStyle`, `checkVisibility`) forces a style/layout pass per link. Keep reads batched before writes, and batch post-write measurements before any follow-up writes. Pure DOM-tree reads (`textContent`, `matches`, `querySelector`, sibling/child traversal) don't force layout.

### Files

- `css/linkpurpose.css` — base styles; also injected into shadow roots via `shadowCSS`
- `tests/index.htm` — main fixture page (positives, negatives, shadow DOM, edge cases); `tests/image.htm` — image link cases
- `e2e/tests/index.spec.mjs` — characterization tests for `tests/index.htm`; `e2e/tests/helpers.mjs` — `gotoProcessed()` waits for both run passes; `describeLink()` summarizes a link
- `e2e/server.mjs` — static server (repo root, port 8856); `scripts/test-docker.mjs` — Docker runner
- `index.md` — user documentation (GitHub Pages)
