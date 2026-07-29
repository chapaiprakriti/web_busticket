# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home Page >> home page navigation works
- Location: tests\home.spec.ts:42:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('a[href="/login"]')
    - waiting for "http://localhost:3000/" navigation to finish...
    - navigated to "http://localhost:3000/"

```

# Page snapshot

```yaml
- generic:
  - generic [active]:
    - generic [ref=f1e3]:
      - generic [ref=f1e4]:
        - navigation [ref=f1e6]:
          - button [disabled] [ref=f1e7]:
            - img "previous" [ref=f1e8]
          - generic [ref=f1e10]:
            - generic [ref=f1e11]: 1/
            - text: "1"
          - button [disabled] [ref=f1e12]:
            - img "next" [ref=f1e13]
        - link "Next.js 16.2.6 (stale) Webpack" [ref=f1e16] [cursor=pointer]:
          - /url: https://nextjs.org/docs/messages/version-staleness
          - generic "There is a newer version (16.2.12) available, upgrade recommended!" [ref=f1e19]: Next.js 16.2.6 (stale)
          - generic [ref=f1e20]: Webpack
      - dialog "Build Error" [ref=f1e22]:
        - generic [ref=f1e25]:
          - generic [ref=f1e26]:
            - generic [ref=f1e27]:
              - generic [ref=f1e28]: Build Error
              - generic [ref=f1e30]:
                - button "Copy Error Info" [ref=f1e31] [cursor=pointer]
                - button "No related documentation found" [disabled] [ref=f1e34]
                - button "Attach Node.js inspector" [ref=f1e37] [cursor=pointer]
            - generic [ref=f1e46]: x 'import', and 'export' cannot be used outside of module code
          - generic [ref=f1e49]:
            - generic [ref=f1e51]:
              - generic [ref=f1e56]: ./app/(auth)/register/page.tsx
              - button "Open in editor" [ref=f1e57] [cursor=pointer]
            - generic [ref=f1e61]: "Error: x 'import', and 'export' cannot be used outside of module code ,-[D:\\final_bus_booking\\mobile_app_final_test\\web_bus_ticket\\app\\(auth)\\register\\page.tsx:4:1] 1 | import RegisterForm from \"../_components/RegisterForm\"; 2 | 3 | export default function Page() { 4 | export : ^^^^^^ 5 | return ( 6 | <div> 6 | <RegisterForm/> `---- Caused by: Syntax Error"
        - generic [ref=f1e64]: "1"
        - generic [ref=f1e65]: "2"
    - button "Open issues overlay" [ref=f1e72] [cursor=pointer]:
      - generic [ref=f1e76]:
        - generic [ref=f1e77]: "0"
        - generic [ref=f1e78]: "1"
      - generic [ref=f1e79]: Issue
  - alert [ref=f1e80]
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
  39 |     await expect(searchBtn).toBeVisible();
  40 |   });
  41 | 
  42 |   test('home page navigation works', async ({ page }) => {
> 43 |     await page.click('a[href="/login"]');
     |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  44 |     await expect(page.url()).toContain('/login');
  45 |   });
  46 | 
  47 |   test('home page footer is visible', async ({ page }) => {
  48 |     const footer = page.locator('footer');
  49 |     await expect(footer).toBeVisible();
  50 |   });
  51 | });
```