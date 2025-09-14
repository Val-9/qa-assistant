import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  use: {
    baseURL: process.env.BASE_URL || 'https://staging.sweepnow.io',
    headless: true,
    trace: 'on-first-retry'
  },
  reporter: [['html', { outputFolder: 'playwright-report' }]]
});
