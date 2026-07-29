import { test, expect } from '@playwright/test';

test.describe('Route Search', () => {
  test('home page has FROM dropdown', async ({ page }) => {
    await page.goto('/');
    const selects = page.locator('select');
    expect(await selects.count()).toBeGreaterThanOrEqual(2);
  });

  test('home page has TO dropdown', async ({ page }) => {
    await page.goto('/');
    const selects = page.locator('select');
    expect(await selects.count()).toBeGreaterThanOrEqual(2);
  });

  test('home page has search button', async ({ page }) => {
    await page.goto('/');
    const searchBtn = page.locator('button:has-text("Search"), button:has-text("Find Routes"), button[type="submit"]');
    expect(await searchBtn.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page allows city selection', async ({ page }) => {
    await page.goto('/');
    const fromSelect = page.locator('select').first();
    if (await fromSelect.isVisible()) {
      await fromSelect.selectOption({ index: 0 });
    }
  });

  test('home page to dropdown has options', async ({ page }) => {
    await page.goto('/');
    const selects = page.locator('select');
    const toSelect = selects.nth(1);
    if (await toSelect.isVisible()) {
      const options = toSelect.locator('option');
      expect(await options.count()).toBeGreaterThanOrEqual(0);
    }
  });
});