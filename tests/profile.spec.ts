import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/profile');
  });

  test('profile page is visible', async ({ page }) => {
    await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
  });

  test('profile page has name field', async ({ page }) => {
    const nameField = page.locator('input[placeholder*="name" i]');
    await expect(nameField).toBeVisible();
  });

  test('profile page has email field', async ({ page }) => {
    const emailField = page.locator('input[type="email"]');
    await expect(emailField).toBeVisible();
  });

  test('profile page has phone field', async ({ page }) => {
    const phoneField = page.locator('input[type="tel"]');
    await expect(phoneField).toBeVisible();
  });

  test('profile page has save button', async ({ page }) => {
    const saveBtn = page.locator('button:has-text("Save")');
    await expect(saveBtn).toBeVisible();
  });

  test('profile page has logout button', async ({ page }) => {
    const logoutBtn = page.locator('button:has-text("Logout"), button:has-text("Sign Out")');
    await expect(logoutBtn).toBeVisible();
  });
});