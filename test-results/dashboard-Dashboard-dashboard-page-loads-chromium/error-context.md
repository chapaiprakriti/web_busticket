# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.ts >> Dashboard >> dashboard page loads
- Location: tests\dashboard.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('h1')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('h1')

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
  3  | test.describe('Dashboard', () => {
  4  |   test('dashboard page loads', async ({ page }) => {
  5  |     await page.goto('/dashboard');
> 6  |     await expect(page.locator('h1')).toBeVisible();
     |                                      ^ Error: expect(locator).toBeVisible() failed
  7  |   });
  8  | 
  9  |   test('dashboard has bookings section', async ({ page }) => {
  10 |     await page.goto('/dashboard');
  11 |     const bookings = page.locator('[class*="booking"], :text("My Bookings"), :text("Booking")');
  12 |     expect(await bookings.count()).toBeGreaterThanOrEqual(0);
  13 |   });
  14 | 
  15 |   test('dashboard has user info section', async ({ page }) => {
  16 |     await page.goto('/dashboard');
  17 |     const userInfo = page.locator('[class*="user"], [class*="profile"]');
  18 |     expect(await userInfo.count()).toBeGreaterThanOrEqual(0);
  19 |   });
  20 | 
  21 |   test('dashboard has navigation menu', async ({ page }) => {
  22 |     await page.goto('/dashboard');
  23 |     const nav = page.locator('nav, [class*="nav"]');
  24 |     expect(await nav.count()).toBeGreaterThanOrEqual(0);
  25 |   });
  26 | 
  27 |   test('dashboard has settings link', async ({ page }) => {
  28 |     await page.goto('/dashboard');
  29 |     const settingsLink = page.locator('a[href="/settings"], a:has-text("Settings")');
  30 |     expect(await settingsLink.count()).toBeGreaterThanOrEqual(0);
  31 |   });
  32 | });
```