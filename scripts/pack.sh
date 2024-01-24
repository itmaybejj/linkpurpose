#!/bin/bash

# Format JS and build .min file 

npx eslint ./js/linkpurpose.js --fix
uglifyjs ./js/linkpurpose.js -c -m --output js/linkpurpose.min.js
