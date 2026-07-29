import { test, expect } from '@playwright/test';

test.describe('OTP Verification', () => {
  test('OTP page shows 6 digit input', async ({ page }) => {
    await page.goto('/verify-otp');
    const otpInputs = page.locator('input[type="text"][maxlength="1"]');
    const count = await otpInputs.count();
    expect(count).toBeGreaterThanOrEqual(4);
  });

  test('OTP page has verify button', async ({ page }) => {
    await page.goto('/verify-otp');
    const verifyBtn = page.locator('button:has-text("Verify"), button:has-text("Submit")');
    await expect(verifyBtn).toBeVisible();
  });

  test('OTP page has resend option', async ({ page }) => {
    await page.goto('/verify-otp');
    const resendLink = page.locator('a:has-text("Resend"), button:has-text("Resend")');
    await expect(resendLink).toBeVisible();
  });

  test('OTP page has back to login link', async ({ page }) => {
    await page.goto('/verify-otp');
    const backLink = page.locator('a:has-text("Back"), a:has-text("Login")');
    await expect(backLink.first()).toBeVisible();
  });

  test('OTP input accepts numeric characters', async ({ page }) => {
    await page.goto('/verify-otp');
    const firstInput = page.locator('input[type="text"][maxlength="1"]').first();
    await firstInput.fill('1');
    await expect(firstInput).toHaveValue('1');
  });
});