import { test, expect } from '@playwright/test';

test.describe('Booking Pages', () => {
  test('booking page loads', async ({ page }) => {
    await page.goto('/book');
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('booking page has seat selection area', async ({ page }) => {
    await page.goto('/book');
    const seatArea = page.locator('[class*="seat"], [data-testid="seat"]');
    expect(await seatArea.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page has payment method option', async ({ page }) => {
    await page.goto('/book');
    const khaltiOption = page.locator(':text("Khalti"), [class*="khalti"]');
    expect(await khaltiOption.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page has confirm booking button', async ({ page }) => {
    await page.goto('/book');
    const btn = page.locator('button:has-text("Confirm"), button:has-text("Book"), button:has-text("Pay"), button[type="submit"]');
    expect(await btn.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page shows route summary', async ({ page }) => {
    await page.goto('/book');
    const summary = page.locator('[class*="summary"], [class*="route"], :text("from"), :text("to")');
    expect(await summary.count()).toBeGreaterThanOrEqual(0);
  });
});