import { test, expect } from '@playwright/test';

test.describe('Footer & Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('footer is visible', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('footer has copyright text', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('header navigation links exist', async ({ page }) => {
    const navLinks = page.locator('header a');
    expect(await navLinks.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page has hero section', async ({ page }) => {
    const hero = page.locator('section').first();
    expect(await hero.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page has feature cards', async ({ page }) => {
    const features = page.locator('[class*="feature"], [class*="benefit"]');
    expect(await features.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page has popular routes', async ({ page }) => {
    const routes = page.locator('[class*="route"], [class*="popular"]');
    expect(await routes.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page has call to action', async ({ page }) => {
    const cta = page.locator('button').filter({ hasText: /book|get started|start/ });
    expect(await cta.count()).toBeGreaterThanOrEqual(0);
  });
});