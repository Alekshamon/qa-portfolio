#  Playwright Cheat Sheet

This is a quick reference guide for using Playwright with useful commands and best practices for running and debugging tests.

##  Running Tests

npx playwright test

## Run all tests in the tests/ directory.

npx playwright test tests/example.spec.ts


## Run a specific test file.

npx playwright test --project=chromium

# Debugging & Modes

npx playwright test --headed
## Run tests in headed mode (visible browser).


npx playwright test --debug
## Run tests in debug mode with Playwright Inspector.


npx playwright test --trace on
## Enable tracing for failed tests (creates .zip trace files).


npx playwright test --ui
## Open the interactive Playwright Test Runner UI.


npx playwright test --grep "login"
## Run only tests with names matching the text.

# Setup & Tools

npx playwright install
## Install required browsers.


npx playwright codegen https://example.com
## Record browser interactions and generate test code.

npx playwright open-trace trace.zip
## Open and inspect a Playwright trace file.

# Useful Code Snippets

## Wait for an element to be visible

await page.locator('text=Login').waitFor({ state: 'visible' });
## Click a button

await page.getByRole('button', { name: 'Submit' }).click();
## Fill a text input

await page.fill('#email', 'user@example.com');

## Take a screenshot
await page.screenshot({ path: 'screenshot.png', fullPage: true });
