import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://ilarionhalushka.github.io/jekyll-ecommerce-demo/kkjhyfv');
  await page.getByRole('listitem').filter({ hasText: 'Sacha the Deer Sacha’s' }).getByRole('link').first().click();
  await page.getByRole('button', { name: 'Add to cart' }).click();
  await page.getByRole('button', { name: 'Checkout' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).click();
  await page.getByRole('textbox', { name: 'Full name' }).fill('tesdt');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('test@gmail.com');
  await page.locator('.snipcart-textbox').first().click();
  await page.getByRole('textbox', { name: 'Street address' }).fill('315 allée');
  await page.getByRole('listitem').filter({ hasText: '315 Allée Jacques' }).click();
  await page.getByRole('textbox', { name: 'Apt/Suite' }).click();
  await page.getByRole('button', { name: 'Continue to payment' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Card number' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'Card number' }).fill('4242 4242 4242 4242');
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'MM/YY' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'MM/YY' }).fill('05/30');
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'CVV' }).click();
  await page.locator('iframe').contentFrame().getByRole('textbox', { name: 'CVV' }).fill('666');
  await page.getByRole('button', { name: 'Place order' }).click();
});

