# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking.spec.ts >> Booking Flow >> booking page loads
- Location: tests\booking.spec.ts:4:7

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
  3  | test.describe('Booking Flow', () => {
  4  |   test('booking page loads', async ({ page }) => {
  5  |     await page.goto('/book');
> 6  |     await expect(page.locator('h1')).toBeVisible();
     |                                      ^ Error: expect(locator).toBeVisible() failed
  7  |   });
  8  | 
  9  |   test('booking page has seat selection', async ({ page }) => {
  10 |     await page.goto('/book');
  11 |     const seats = page.locator('[data-testid="seat"], .seat, [class*="seat"]');
  12 |     expect(await seats.count()).toBeGreaterThanOrEqual(0);
  13 |   });
  14 | 
  15 |   test('booking page has payment method selection', async ({ page }) => {
  16 |     await page.goto('/book');
  17 |     const khaltiOption = page.locator(':text("Khalti"), [class*="khalti"]');
  18 |     expect(await khaltiOption.count()).toBeGreaterThanOrEqual(0);
  19 |   });
  20 | 
  21 |   test('booking page has confirm booking button', async ({ page }) => {
  22 |     await page.goto('/book');
  23 |     const confirmBtn = page.locator('button:has-text("Confirm"), button:has-text("Book"), button:has-text("Pay")');
  24 |     expect(await confirmBtn.count()).toBeGreaterThanOrEqual(0);
  25 |   });
  26 | 
  27 |   test('booking page shows route summary', async ({ page }) => {
  28 |     await page.goto('/book');
  29 |     const summary = page.locator('[class*="summary"], [class*="route"], :text("Route")');
  30 |     expect(await summary.count()).toBeGreaterThanOrEqual(0);
  31 |   });
  32 | 
  33 |   test('booking page has passenger details form', async ({ page }) => {
  34 |     await page.goto('/book');
  35 |     const form = page.locator('form');
  36 |     expect(await form.count()).toBeGreaterThanOrEqual(0);
  37 |   });
  38 | });
```