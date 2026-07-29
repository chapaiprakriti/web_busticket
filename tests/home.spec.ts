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

  test('home page has from input field', async ({ page }) => {
    const fromInput = page.locator('input[placeholder*="from" i]');
    await expect(fromInput).toBeVisible();
  });

  test('home page has to input field', async ({ page }) => {
    const toInput = page.locator('input[placeholder*="to" i]');
    await expect(toInput).toBeVisible();
  });

  test('home page has date input field', async ({ page }) => {
    const dateInput = page.locator('input[type="date"]');
    await expect(dateInput).toBeVisible();
  });

  test('home page has search button', async ({ page }) => {
    const searchBtn = page.locator('button:has-text("Search")');
    await expect(searchBtn).toBeVisible();
  });

  test('home page navigation works', async ({ page }) => {
    await page.click('a[href="/login"]');
    await expect(page.url()).toContain('/login');
  });

  test('home page footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });
});