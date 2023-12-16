import { defineConfig } from '@playwright/test'

import process from 'node:process'

export default defineConfig({
  // reporter: 'list',
  testDir: './tests/playwright',
  timeout: 120 * 1_000,
  use: {
    baseURL: 'http://localhost:3000',
    headless: true,
    ignoreHTTPSErrors: true,
    viewport: {
      height: 720,
      width: 1_280,
    },
  },
  webServer: {
    command: 'pnpm run dev --port 3000',
    port: 3_000,
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1_000,
  },
})
