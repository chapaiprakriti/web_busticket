# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home Page >> home page has search button
- Location: tests\home.spec.ts:37:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Search")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Search")')

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
  3  | test.describe('Home Page', () => {
  4  |   test.beforeEach(async ({ page }) => {
  5  |     await page.goto('/');
  6  |   });
  7  | 
  8  |   test('home page has correct title', async ({ page }) => {
  9  |     await expect(page).toHaveTitle(/Seat Sathi/);
  10 |   });
  11 | 
  12 |   test('home page has main heading', async ({ page }) => {
  13 |     const heading = page.locator('h1');
  14 |     await expect(heading).toBeVisible();
  15 |   });
  16 | 
  17 |   test('home page has search form', async ({ page }) => {
  18 |     const searchForm = page.locator('form');
  19 |     await expect(searchForm).toBeVisible();
  20 |   });
  21 | 
  22 |   test('home page has from input field', async ({ page }) => {
  23 |     const fromInput = page.locator('input[placeholder*="from" i]');
  24 |     await expect(fromInput).toBeVisible();
  25 |   });
  26 | 
  27 |   test('home page has to input field', async ({ page }) => {
  28 |     const toInput = page.locator('input[placeholder*="to" i]');
  29 |     await expect(toInput).toBeVisible();
  30 |   });
  31 | 
  32 |   test('home page has date input field', async ({ page }) => {
  33 |     const dateInput = page.locator('input[type="date"]');
  34 |     await expect(dateInput).toBeVisible();
  35 |   });
  36 | 
  37 |   test('home page has search button', async ({ page }) => {
  38 |     const searchBtn = page.locator('button:has-text("Search")');
> 39 |     await expect(searchBtn).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  40 |   });
  41 | 
  42 |   test('home page navigation works', async ({ page }) => {
  43 |     await page.click('a[href="/login"]');
  44 |     await expect(page.url()).toContain('/login');
  45 |   });
  46 | 
  47 |   test('home page footer is visible', async ({ page }) => {
  48 |     const footer = page.locator('footer');
  49 |     await expect(footer).toBeVisible();
  50 |   });
  51 | });
```