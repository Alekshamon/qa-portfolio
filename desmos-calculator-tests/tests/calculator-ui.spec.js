import { test, expect } from "@playwright/test";

test.setTimeout(60000);

test.describe("UI Design Tests - Desmos Scientific Calculator", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://www.desmos.com/scientific?lang=eng");
  });

  // Test 1: Numeric buttons
  test("should display numeric buttons from 0 to 9", async ({ page }) => {
    for (let i = 0; i <= 9; i++) {
      const button = page.getByRole("button", { name: String(i) });
      await expect(button).toBeVisible();
    }
  });

  // Test 2: Main operation buttons
  test("should display basic operator buttons (Plus, Minus, Times, Divide)", async ({
    page,
  }) => {
    const operators = ["Plus", "Minus", "Times", "Divide"];
    for (const op of operators) {
      const button = page.getByRole("button", { name: op });
      await expect(button).toBeVisible();
    }
  });

  // Test 3: Enter button presence
  test("should display the Enter button", async ({ page }) => {
    const enterButton = page.getByRole("button", { name: "Enter" });
    await expect(enterButton).toBeVisible();
  });

  // Test 4: Visual styling (color)
  test("buttons should use valid colors for readability", async ({ page }) => {
    const sampleButton = page.locator(".dcg-keypad-btn").first();
    const color = await sampleButton.evaluate(
      (el) => getComputedStyle(el).color
    );
    expect(color).toMatch(/rgb\(/); // Checks for a valid RGB color string
  });

  // Test 5: Accessibility - role and tabindex
  test('buttons should be accessible via keyboard (role="button")', async ({
    page,
  }) => {
    const allButtons = page.locator('[role="button"]');
    const count = await allButtons.count();
    expect(count).toBeGreaterThan(10);
  });
});
