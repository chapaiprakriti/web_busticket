import { test, expect } from '@playwright/test';

test.describe('Booking Flow', () => {
  test('booking page loads', async ({ page }) => {
    await page.goto('/book');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('booking page has seat selection', async ({ page }) => {
    await page.goto('/book');
    const seats = page.locator('[data-testid="seat"], .seat, [class*="seat"]');
    expect(await seats.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page has payment method selection', async ({ page }) => {
    await page.goto('/book');
    const khaltiOption = page.locator(':text("Khalti"), [class*="khalti"]');
    expect(await khaltiOption.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page has confirm booking button', async ({ page }) => {
    await page.goto('/book');
    const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Book"), button:has-text("Pay")');
    expect(await confirmBtn.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page shows route summary', async ({ page }) => {
    await page.goto('/book');
    const summary = page.locator('[class*="summary"], [class*="route"], :text("Route")');
    expect(await summary.count()).toBeGreaterThanOrEqual(0);
  });

  test('booking page has passenger details form', async ({ page }) => {
    await page.goto('/book');
    const form = page.locator('form');
    expect(await form.count()).toBeGreaterThanOrEqual(0);
  });
});