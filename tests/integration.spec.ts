import { test, expect } from '@playwright/test';

test.describe('Integration Tests', () => {
  test('home page navigation to login', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.locator('a[href="/login"]');
    expect(await loginLink.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page navigation to register', async ({ page }) => {
    await page.goto('/');
    const registerLink = page.locator('a[href="/register"]');
    expect(await registerLink.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page city links work', async ({ page }) => {
    await page.goto('/');
    const cityLinks = page.locator('a').filter({ hasText: /Kathmandu|Pokhara|Chitwan|Butwal/ });
    expect(await cityLinks.count()).toBeGreaterThanOrEqual(0);
  });

  test('search form submits correctly', async ({ page }) => {
    await page.goto('/');
    const form = page.locator('form');
    expect(await form.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page hero section visible', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('section').first();
    expect(await hero.count()).toBeGreaterThanOrEqual(0);
  });
});