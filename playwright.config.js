import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 5000,
  retries: 0,
  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    screenshot: 'on' // It is ON for now, can ideally be 'only-on-failure'
  },
  reporter: [['list'], ['html', { outputFile: 'test-results.html' }]],
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.js'
    },
    {
      name: 'chromium',
      use: {
        browserName: 'chromium',
        storageState: 'playwright/.auth/standard_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        storageState: 'playwright/.auth/standard_user.json'
      },
      dependencies: ['setup']
    },
    {
      name: 'webkit',
      use: {
        browserName: 'webkit',
        storageState: 'playwright/.auth/standard_user.json'
      },
      dependencies: ['setup']
    }
  ]
});
