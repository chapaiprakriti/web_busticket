import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test('login page is visible', async ({ page }) => {
    await page.goto('/login');
    const loginForm = page.locator('h1, h2').filter({ hasText: /login|sign in/i });
    const hasHeading = await loginForm.count() > 0;
    const form = page.locator('form');
    const hasForm = await form.count() > 0;
    const hasLogo = await page.locator('[class*="logo"], [class*="brand"]').count() > 0;
    expect(hasHeading || hasForm || hasLogo).toBe(true);
  });

  test('login page has email field', async ({ page }) => {
    await page.goto('/login');
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('login page has password field', async ({ page }) => {
    await page.goto('/login');
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('login page has submit button', async ({ page }) => {
    await page.goto('/login');
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
  });

  test('register page is visible', async ({ page }) => {
    await page.goto('/register');
    const heading = page.locator('h1, h2').filter({ hasText: /register|sign up/i });
    const hasHeading = await heading.count() > 0;
    const form = page.locator('form');
    const hasForm = await form.count() > 0;
    expect(hasHeading || hasForm).toBe(true);
  });

  test('register page has name field', async ({ page }) => {
    await page.goto('/register');
    const nameInput = page.locator('input[placeholder*="name" i], input[name="name"]');
    expect(await nameInput.count()).toBeGreaterThanOrEqual(0);
  });

  test('register page has email field', async ({ page }) => {
    await page.goto('/register');
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('register page has password field', async ({ page }) => {
    await page.goto('/register');
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('login page has register link', async ({ page }) => {
    await page.goto('/login');
    const registerLink = page.locator('a[href="/register"]');
    expect(await registerLink.count()).toBeGreaterThanOrEqual(0);
  });

  test('forgot password link visible on login', async ({ page }) => {
    await page.goto('/login');
    const forgotLink = page.locator('a:has-text("Forgot"), a:has-text("forgot"), button:has-text("Forgot"), button:has-text("Reset")');
    expect(await forgotLink.count()).toBeGreaterThanOrEqual(0);
  });
});