# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile Page >> profile page is visible
- Location: tests\profile.spec.ts:8:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1:has-text("Profile")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1:has-text("Profile")')

```

```yaml
- navigation:
  - button "previous" [disabled]:
    - img "previous"
  - text: 1/1
  - button "next" [disabled]:
    - img "next"
- img
- link "Next.js 16.2.6 (stale) Webpack":
  - /url: https://nextjs.org/docs/messages/version-staleness
  - img
  - text: Next.js 16.2.6 (stale) Webpack
- img
- dialog "Build Error":
  - text: Build Error
  - button "Copy Error Info":
    - img
  - button "No related documentation found" [disabled]:
    - img
  - button "Attach Node.js inspector":
    - img
  - text: x 'import', and 'export' cannot be used outside of module code
  - img
  - text: ./app/(auth)/register/page.tsx
  - button "Open in editor":
    - img
  - text: "Error: x 'import', and 'export' cannot be used outside of module code ,-[D:\\final_bus_booking\\mobile_app_final_test\\web_bus_ticket\\app\\(auth)\\register\\page.tsx:4:1] 1 | import RegisterForm from \"../_components/RegisterForm\"; 2 | 3 | export default function Page() { 4 | export : ^^^^^^ 5 | return ( 6 | <div> 6 | <RegisterForm/> `---- Caused by: Syntax Error"
- button "Open issues overlay":
  - img
  - text: 1 Issue
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Profile Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/profile');
  6  |   });
  7  | 
  8  |   test('profile page is visible', async ({ page }) => {
> 9  |     await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
     |                                                          ^ Error: expect(locator).toBeVisible() failed
  10 |   });
  11 | 
  12 |   test('profile page has name field', async ({ page }) => {
  13 |     const nameField = page.locator('input[placeholder*="name" i]');
  14 |     await expect(nameField).toBeVisible();
  15 |   });
  16 | 
  17 |   test('profile page has email field', async ({ page }) => {
  18 |     const emailField = page.locator('input[type="email"]');
  19 |     await expect(emailField).toBeVisible();
  20 |   });
  21 | 
  22 |   test('profile page has phone field', async ({ page }) => {
  23 |     const phoneField = page.locator('input[type="tel"]');
  24 |     await expect(phoneField).toBeVisible();
  25 |   });
  26 | 
  27 |   test('profile page has save button', async ({ page }) => {
  28 |     const saveBtn = page.locator('button:has-text("Save")');
  29 |     await expect(saveBtn).toBeVisible();
  30 |   });
  31 | 
  32 |   test('profile page has logout button', async ({ page }) => {
  33 |     const logoutBtn = page.locator('button:has-text("Logout"), button:has-text("Sign Out")');
  34 |     await expect(logoutBtn).toBeVisible();
  35 |   });
  36 | });
```