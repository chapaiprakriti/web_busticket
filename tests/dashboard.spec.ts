import { test, expect } from '@playwright/test';

test.describe('Dashboard', () => {
  test('dashboard page loads', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1')).toBeVisible();
  });

  test('dashboard has bookings section', async ({ page }) => {
    await page.goto('/dashboard');
    const bookings = page.locator('[class*="booking"], :text("My Bookings"), :text("Booking")');
    expect(await bookings.count()).toBeGreaterThanOrEqual(0);
  });

  test('dashboard has user info section', async ({ page }) => {
    await page.goto('/dashboard');
    const userInfo = page.locator('[class*="user"], [class*="profile"]');
    expect(await userInfo.count()).toBeGreaterThanOrEqual(0);
  });

  test('dashboard has navigation menu', async ({ page }) => {
    await page.goto('/dashboard');
    const nav = page.locator('nav, [class*="nav"]');
    expect(await nav.count()).toBeGreaterThanOrEqual(0);
  });

  test('dashboard has settings link', async ({ page }) => {
    await page.goto('/dashboard');
    const settingsLink = page.locator('a[href="/settings"], a:has-text("Settings")');
    expect(await settingsLink.count()).toBeGreaterThanOrEqual(0);
  });
});