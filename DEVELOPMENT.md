# Setup
* Run `npm install` to gather dependencies.

# Testing

* `npm test` runs the Playwright browser tests (`e2e/`) in Docker. Filter with `npm test -- --grep "<title>"`.
* `npm run test:host` runs the same tests with Playwright browsers installed on the host (`npx playwright install chromium` first).
* Manual testing: open the pages in `tests/` in a browser. `tests/fontawesome.htm` and `tests/material.htm` need network access for their icon fonts.

## Browser tests in Docker

* Needs Docker Desktop (or a Docker daemon) running. The first run pulls `mcr.microsoft.com/playwright:v<version>-noble` (about 2 GB).
* `scripts/test-docker.mjs` reads the installed `@playwright/test` version and uses the image with the same tag. `@playwright/test` is pinned to the same version as editoria11y so both projects share one image; when upgrading, upgrade both.
* The container has no network, so tests must serve fixtures from this repository.
* Why Docker: AI coding agents run commands inside a macOS sandbox that can stop browsers from starting and block local ports. Docker containers run outside that sandbox.

# Distribution

* Update version numbers (`package.json` and `LinkPurpose.version` in `js/linkpurpose.js`).
* Run `npm run build` (`scripts/pack.sh`) to run ESLint and build the min file.
