import { test, expect } from "@playwright/test";

test.setTimeout(60000);

// // Test case for addition in Desmos calculator
test("test addition in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "Plus" }).click();
  await page.getByRole("button", { name: "1" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+2=/).first();
  await expect(resultLocator).toBeVisible();

  const resultText = (await resultLocator.innerText())
    .replace(/\s+/g, " ")
    .trim();
  expect(resultText).toContain("equals 2");
});

// Test case for multiplication in Desmos calculator
test("test multiplication in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Times" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+4/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });

  const resultText = (await resultLocator.innerText())
    .replace(/\s+/g, " ")
    .trim();

  expect(resultText).toContain("equals 4");
});

// Test case for subtraction in Desmos calculator
test("test subtraction in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "5" }).click();
  await page.getByRole("button", { name: "Minus" }).click();
  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+2/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });

  const resultText = (await resultLocator.innerText())
    .replace(/\s+/g, " ")
    .trim();

  expect(resultText).toContain("equals 2");
});

// Test case for division in Desmos calculator
test("test division in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "8" }).click();
  await page.getByRole("button", { name: "Divide" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+4/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });

  const resultText = (await resultLocator.innerText())
    .replace(/\s+/g, " ")
    .trim();

  expect(resultText).toContain("equals 4");
});

// Test case: Priority of operations (2 + 3 × 4 = 14)
test("test operator precedence in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Plus" }).click();
  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "Times" }).click();
  await page.getByRole("button", { name: "4" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+14/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });

  const resultText = (await resultLocator.innerText())
    .replace(/\s+/g, " ")
    .trim();

  expect(resultText).toContain("equals 14");
});

// Test case: Parentheses in Desmos calculator
test("test parentheses in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "Left Parenthesis" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Plus" }).click();
  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "Right Parenthesis" }).click();
  await page.getByRole("button", { name: "Times" }).click();
  await page.getByRole("button", { name: "4" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+20/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });

  const resultText = (await resultLocator.innerText())
    .replace(/\s+/g, " ")
    .trim();
  expect(resultText).toContain("equals 20");
});

// Test case: Devision by zero
test("test division by zero in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "5" }).click();
  await page.getByRole("button", { name: "Divide" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page
    .locator("span")
    .filter({ hasText: "undefined" })
    .first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });
});

// Test case: Negative number multiplication
test("test negative number multiplication in Desmos calculator", async ({
  page,
}) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "Minus" }).click();
  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "Times" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page.getByText(/equals\s+negative\s+6/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });
});

// Test case for decimal addition
test("test decimal addition in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "Decimal", exact: true }).click();
  await page.getByRole("button", { name: "5" }).click();
  await page.getByRole("button", { name: "Plus" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Decimal", exact: true }).click();
  await page.getByRole("button", { name: "5" }).click();
  await page.getByRole("button", { name: "Enter", exact: true }).click();

  const resultLocator = page.getByText(/equals\s+6/).first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });
});

// Test cos(60 degrees) * 2 = 1
test("test cos(60 degrees) * 2 = 1 in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "Cosine", exact: true }).click();
  await page.getByRole("button", { name: "6" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "Right Parenthesis" }).click();
  await page.getByRole("button", { name: "Times" }).click();
  await page.getByRole("button", { name: "2" }).click();
  await page.getByRole("button", { name: "Enter" }).click();

  const resultLocator = page
    .locator("span")
    .filter({ hasText: /^1(\.0+)?$/ })
    .first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });
});

// Test sin(30 degrees) = 0.5
test("test sin(30 degrees) in Desmos calculator", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=eng");

  await page.getByRole("button", { name: "Sine", exact: true }).click();
  await page.getByRole("button", { name: "3" }).click();
  await page.getByRole("button", { name: "0" }).click();
  await page.getByRole("button", { name: "Right Parenthesis" }).click();
  await page.getByRole("button", { name: "Enter", exact: true }).click();

  const resultLocator = page
    .locator("span")
    .filter({ hasText: /0\.5/ })
    .first();
  await resultLocator.waitFor({ state: "attached", timeout: 10000 });
});
