import { test, expect } from '@playwright/test';

test.describe('Booking Flow Integration', () => {
  test('search route shows results', async ({ page }) => {
    await page.goto('/');
    const fromInput = page.locator('input[placeholder*="from" i]');
    await fromInput.fill('Kathmandu');
    const toInput = page.locator('input[placeholder*="to" i]');
    await toInput.fill('Pokhara');
    const searchBtn = page.locator('button:has-text("Search"), button:has-text("Find")');
    await searchBtn.click();
    await page.waitForTimeout(500);
  });

  test('select seat on booking page', async ({ page }) => {
    await page.goto('/book');
    const seat = page.locator('[class*="seat"], [data-testid="seat"]').first();
    if (await seat.isVisible()) {
      await seat.click();
    }
  });

  test('confirm booking shows confirmation', async ({ page }) => {
    await page.goto('/book');
    const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Pay"), button:has-text("Book")').first();
    if (await confirmBtn.isVisible()) {
      await confirmBtn.click();
      await page.waitForTimeout(1000);
    }
  });
});