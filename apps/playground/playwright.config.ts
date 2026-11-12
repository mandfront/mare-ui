import { defineConfig, devices } from '@playwright/test';

const port = 3100;
const baseURL = `http://localhost:${String(port)}`;

export default defineConfig({
  testDir: './tests',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: { baseURL, trace: 'retain-on-failure' },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
  webServer: {
    command: 'pnpm start',
    port,
    reuseExistingServer: !process.env.CI,
  },
});
