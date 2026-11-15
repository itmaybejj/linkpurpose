---
name: build
description: Build linkpurpose.min.js (eslint --fix, then uglify) and verify output
disable-model-invocation: true
---

Run the build and verify:

1. Run `npm run build` (runs `scripts/pack.sh`: `eslint --fix` on `js/linkpurpose.js`, then uglify-js to `js/linkpurpose.min.js`).
2. Confirm `js/linkpurpose.min.js` was rewritten and is non-empty: `ls -la js/linkpurpose.min.js`.
3. Report any lint errors or uglify warnings. `eslint --fix` may also rewrite `js/linkpurpose.js`; list those changes with `git diff --stat js/linkpurpose.js` so the user can review them.
4. If the build fails, run `npm run lint` separately to tell whether linting or minification failed.
5. Run the `test` skill afterwards when source changed.

Version bumps are manual: `LinkPurpose.version` in `js/linkpurpose.js` and `version` in `package.json` must match.
