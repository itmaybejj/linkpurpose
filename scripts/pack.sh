#!/bin/bash
set -euo pipefail

# Format JS and build .min file. Uses the project's local eslint and uglify-js.
cd "$(dirname "$0")/.."

npx eslint ./js/linkpurpose.js --fix
npx uglifyjs ./js/linkpurpose.js -c -m --output js/linkpurpose.min.js
