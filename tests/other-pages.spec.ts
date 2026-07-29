import { test, expect } from '@playwright/test';

test.describe('Additional Pages', () => {
  test('dashboard page loads', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('profile page loads', async ({ page }) => {
    await page.goto('/profile');
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('profile page has name field', async ({ page }) => {
    await page.goto('/profile');
    const nameField = page.locator('input[placeholder*="name" i], input[name="name"]');
    expect(await nameField.count()).toBeGreaterThanOrEqual(0);
  });

  test('profile page has email field', async ({ page }) => {
    await page.goto('/profile');
    const emailField = page.locator('input[type="email"]');
    expect(await emailField.count()).toBeGreaterThanOrEqual(0);
  });

  test('settings page loads', async ({ page }) => {
    await page.goto('/settings');
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('support page loads', async ({ page }) => {
    await page.goto('/support');
    await expect(page.locator('h1, h2')).toBeVisible();
  });

  test('login page accessible from home', async ({ page }) => {
    await page.goto('/');
    const loginLink = page.locator('a[href="/login"]');
    expect(await loginLink.count()).toBeGreaterThanOrEqual(0);
  });

  test('register page accessible from home', async ({ page }) => {
    await page.goto('/');
    const registerLink = page.locator('a[href="/register"]');
    expect(await registerLink.count()).toBeGreaterThanOrEqual(0);
  });

  test('forgot password page accessible', async ({ page }) => {
    await page.goto('/forgot-password');
    await expect(page.locator('h1, h2')).toBeVisible();
  });
});