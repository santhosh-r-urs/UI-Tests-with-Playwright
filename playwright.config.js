import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
    testDir: './tests',
    timeout: 30000,
    retries: 1,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        ignoreHTTPSErrors: true,
        video: 'retain-on-failure',
    },
    projects: [
        {
            name: 'setup',
            testMatch: '**/*.setup.js',
          },
        {
            name: 'chromium',
            use: { browserName: 'chromium',
                storageState: 'playwright/.auth/standard_user.json'
             },
            dependencies: ['setup'],
        },
        // {
        //     name: 'firefox',
        //     use: { browserName: 'firefox',
        //         storageState: 'playwright/.auth/standard_user.json'
        //      },
        //     dependencies: ['setup'],
        // },
        // {
        //     name: 'webkit',
        //     use: { browserName: 'webkit',
        //         storageState: 'playwright/.auth/standard_user.json'
        //      },
        //     dependencies: ['setup'],
        // },
    ],
});