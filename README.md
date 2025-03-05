# UI-Tests-with-Playwright

This is a **CI integrated Playwright UI test suite**. Has a few tests related to end to end checkout flow of 'https://www.saucedemo.com/' website.

**Suite uses:**
1. **Cookie and session storage** feature to avoid login on every test.
2. **Tracing** is enabled.
3. **Reports** generated for each run with **videos for failed tests** and **screenshots** for all tests(can be updated).
4. **Environment variables** are used to handle secure data like, credentials.
5. **Github Actions and Workflows** are used for **CI**.
6. **Github environment secrets** are used to handle environment variables for tests running on pipeline.
7. Uses **page object model**.
8. Runs on Chromium, Firefox and Webkit by default.
9. **Eslint** and **Prettier** is used for linting and formatting.
10. **Husky** is used to check linting on every commit.
11. No implicit waits or timeouts.

**Running the tests locally:**
1. Clone the repo.
2. Run 'npm install' command.
3. Run 'npx playwright install' command.
4. Run 'npm run test' command.
5. Run 'npx playwright show-report' command to view the test report.

**Running the tests through GitHub UI without cloning the repo:**
1. Navigate to 'Actions' tab of the repo in GitHub.
2. In the 'Actions' list on the left hand side, select 'Playwright UI Test'.
3. Click the 'Run workflow' button on the right hand side.
4. Select the branch, (main is default).
5. Click 'Run workflow' button on the dialog.

**Viewing the test reports for tests run on pipeline:**
1. In the same 'Actions' page of the repo in GitHub, click on the test run under the workflow runs list.
2. In the run's page, notice the 'Artifacts' section.
3. Click download button for 'playwright-report', a zip file gets downloaded.
4. Unzip and open the folder and double click the 'index.html' file to view the report.
