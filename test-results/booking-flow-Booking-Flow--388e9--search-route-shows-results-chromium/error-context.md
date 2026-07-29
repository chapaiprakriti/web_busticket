# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking-flow.spec.ts >> Booking Flow Integration >> search route shows results
- Location: tests\booking-flow.spec.ts:4:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder*="from" i]')

```

# Page snapshot

```yaml
- generic:
  - generic [active]:
    - generic [ref=e3]:
      - generic [ref=e4]:
        - navigation [ref=e6]:
          - button [disabled] [ref=e7]:
            - img "previous" [ref=e8]
          - generic [ref=e10]:
            - generic [ref=e11]: 1/
            - text: "1"
          - button [disabled] [ref=e12]:
            - img "next" [ref=e13]
        - link "Next.js 16.2.6 (stale) Webpack" [ref=e16] [cursor=pointer]:
          - /url: https://nextjs.org/docs/messages/version-staleness
          - generic "There is a newer version (16.2.12) available, upgrade recommended!" [ref=e19]: Next.js 16.2.6 (stale)
          - generic [ref=e20]: Webpack
      - dialog "Build Error" [ref=e22]:
        - generic [ref=e25]:
          - generic [ref=e26]:
            - generic [ref=e27]:
              - generic [ref=e28]: Build Error
              - generic [ref=e30]:
                - button "Copy Error Info" [ref=e31] [cursor=pointer]
                - button "No related documentation found" [disabled] [ref=e34]
                - button "Attach Node.js inspector" [ref=e37] [cursor=pointer]
            - generic [ref=e46]: x 'import', and 'export' cannot be used outside of module code
          - generic [ref=e49]:
            - generic [ref=e51]:
              - generic [ref=e56]: ./app/(auth)/register/page.tsx
              - button "Open in editor" [ref=e57] [cursor=pointer]
            - generic [ref=e61]: "Error: x 'import', and 'export' cannot be used outside of module code ,-[D:\\final_bus_booking\\mobile_app_final_test\\web_bus_ticket\\app\\(auth)\\register\\page.tsx:4:1] 1 | import RegisterForm from \"../_components/RegisterForm\"; 2 | 3 | export default function Page() { 4 | export : ^^^^^^ 5 | return ( 6 | <div> 6 | <RegisterForm/> `---- Caused by: Syntax Error"
        - generic [ref=e64]: "1"
        - generic [ref=e65]: "2"
    - button "Open issues overlay" [ref=e72] [cursor=pointer]:
      - generic [ref=e76]:
        - generic [ref=e77]: "0"
        - generic [ref=e78]: "1"
      - generic [ref=e79]: Issue
  - alert [ref=e80]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Booking Flow Integration', () => {
  4  |   test('search route shows results', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const fromInput = page.locator('input[placeholder*="from" i]');
> 7  |     await fromInput.fill('Kathmandu');
     |                     ^ Error: locator.fill: Test timeout of 30000ms exceeded.
  8  |     const toInput = page.locator('input[placeholder*="to" i]');
  9  |     await toInput.fill('Pokhara');
  10 |     const searchBtn = page.locator('button:has-text("Search"), button:has-text("Find")');
  11 |     await searchBtn.click();
  12 |     await page.waitForTimeout(500);
  13 |   });
  14 | 
  15 |   test('select seat on booking page', async ({ page }) => {
  16 |     await page.goto('/book');
  17 |     const seat = page.locator('[class*="seat"], [data-testid="seat"]').first();
  18 |     if (await seat.isVisible()) {
  19 |       await seat.click();
  20 |     }
  21 |   });
  22 | 
  23 |   test('confirm booking shows confirmation', async ({ page }) => {
  24 |     await page.goto('/book');
  25 |     const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Pay"), button:has-text("Book")').first();
  26 |     if (await confirmBtn.isVisible()) {
  27 |       await confirmBtn.click();
  28 |       await page.waitForTimeout(1000);
  29 |     }
  30 |   });
  31 | });
```