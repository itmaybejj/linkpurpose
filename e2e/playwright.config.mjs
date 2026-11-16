import { defineConfig } from '@playwright/test';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// 8856, not editoria11y's 8855, so both suites can run at once.
const port = Number(process.env.E2E_PORT || 8856);

export default defineConfig({
  testDir: './tests',
  outputDir: './test-results',
  timeout: 30_000,
  // Every test loads its own page, so tests within a file can run in parallel.
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { outputFolder: './report', open: 'never' }]],
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    browserName: 'chromium',
    headless: true,
    trace: 'retain-on-failure'
  },
  webServer: {
    command: 'node e2e/server.mjs',
    url: `http://127.0.0.1:${port}/tests/index.htm`,
    reuseExistingServer: !process.env.CI,
    cwd: join(__dirname, '..')
  }
});
