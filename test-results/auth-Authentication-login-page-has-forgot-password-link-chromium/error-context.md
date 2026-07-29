# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> Authentication >> login page has forgot password link
- Location: tests\auth.spec.ts:32:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a:has-text("Forgot Password")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('a:has-text("Forgot Password")')
    - waiting for "http://localhost:3000/login" navigation to finish...

```

```yaml
- img
- heading "This page couldn’t load" [level=1]
- paragraph: A server error occurred. Reload to try again.
- button "Reload"
- paragraph: ERROR 1321743611
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Authentication', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/login');
  6  |   });
  7  | 
  8  |   test('login page is visible', async ({ page }) => {
  9  |     await expect(page.locator('h1:has-text("Login")')).toBeVisible();
  10 |   });
  11 | 
  12 |   test('login page has email field', async ({ page }) => {
  13 |     const emailInput = page.locator('input[type="email"]');
  14 |     await expect(emailInput).toBeVisible();
  15 |   });
  16 | 
  17 |   test('login page has password field', async ({ page }) => {
  18 |     const passwordInput = page.locator('input[type="password"]');
  19 |     await expect(passwordInput).toBeVisible();
  20 |   });
  21 | 
  22 |   test('login page has submit button', async ({ page }) => {
  23 |     const submitBtn = page.locator('button[type="submit"]');
  24 |     await expect(submitBtn).toBeVisible();
  25 |   });
  26 | 
  27 |   test('login page has register link', async ({ page }) => {
  28 |     const registerLink = page.locator('a[href="/register"]');
  29 |     await expect(registerLink).toBeVisible();
  30 |   });
  31 | 
  32 |   test('login page has forgot password link', async ({ page }) => {
  33 |     const forgotLink = page.locator('a:has-text("Forgot Password")');
> 34 |     await expect(forgotLink).toBeVisible();
     |                              ^ Error: expect(locator).toBeVisible() failed
  35 |   });
  36 | 
  37 |   test('register page is visible', async ({ page }) => {
  38 |     await page.goto('/register');
  39 |     await expect(page.locator('h1:has-text("Register")')).toBeVisible();
  40 |   });
  41 | 
  42 |   test('register page has name field', async ({ page }) => {
  43 |     await page.goto('/register');
  44 |     const nameInput = page.locator('input[placeholder*="name" i]');
  45 |     await expect(nameInput).toBeVisible();
  46 |   });
  47 | 
  48 |   test('register page has email field', async ({ page }) => {
  49 |     await page.goto('/register');
  50 |     const emailInput = page.locator('input[type="email"]');
  51 |     await expect(emailInput).toBeVisible();
  52 |   });
  53 | 
  54 |   test('register page has password field', async ({ page }) => {
  55 |     await page.goto('/register');
  56 |     const passwordInput = page.locator('input[type="password"]');
  57 |     await expect(passwordInput).toBeVisible();
  58 |   });
  59 | });
```