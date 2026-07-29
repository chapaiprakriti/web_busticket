import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login page is visible', async ({ page }) => {
    await expect(page.locator('h1:has-text("Login")')).toBeVisible();
  });

  test('login page has email field', async ({ page }) => {
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeVisible();
  });

  test('login page has password field', async ({ page }) => {
    const passwordInput = page.locator('input[type="password"]');
    await expect(passwordInput).toBeVisible();
  });

  test('login page has submit button', async ({ page }) => {
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeVisible();
  });

  test('login page has register link', async ({ page }) => {
    const registerLink = page.locator('a[href="/register"]');
    await expect(registerLink).toBeVisible();
  });

  test('login page has forgot password link', async ({ page }) => {
    const forgotLink = page.locator('a:has-text("Forgot Password")');
    await expect(forgotLink).toBeVisible();
  });

  test('register page is visible', async ({ page }) => {
    await page.goto('/register');
    await expect(page.locator('h1:has-text("Register")')).toBeVisible();
  });

  test('register page has name field', async ({ page }) => {
    await page.goto('/register');
    const nameInput = page.locator('input[placeholder*="name" i]');
    await expect(nameInput).toBeVisible();
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
});