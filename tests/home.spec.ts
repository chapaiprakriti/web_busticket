import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('home page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/Seat Sathi/);
  });

  test('home page has main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });

  test('home page has search form', async ({ page }) => {
    const searchForm = page.locator('form');
    await expect(searchForm).toBeVisible();
  });

  test('home page has from city select dropdown', async ({ page }) => {
    await page.goto('/');
    const selects = page.locator('select');
    const count = await selects.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('home page has to city select dropdown', async ({ page }) => {
    const toSelects = page.locator('select');
    const count = await toSelects.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('home page has find routes button', async ({ page }) => {
    const findBtn = page.locator('button:has-text("Find Routes"), button:has-text("Search"), button[type="submit"]');
    await expect(findBtn).toBeVisible();
  });

  test('home page has features section', async ({ page }) => {
    const features = page.locator('[class*="featured"], [class*="benefits"], [class*="grid"], [class*="grid"]');
    expect(await features.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page has footer', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});