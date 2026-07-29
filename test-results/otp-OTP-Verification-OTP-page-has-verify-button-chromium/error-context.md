# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: otp.spec.ts >> OTP Verification >> OTP page has verify button
- Location: tests\otp.spec.ts:11:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('button:has-text("Verify"), button:has-text("Submit")')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Verify"), button:has-text("Submit")')
    - waiting for "http://localhost:3000/verify-otp" navigation to finish...

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
  3  | test.describe('OTP Verification', () => {
  4  |   test('OTP page shows 6 digit input', async ({ page }) => {
  5  |     await page.goto('/verify-otp');
  6  |     const otpInputs = page.locator('input[type="text"][maxlength="1"]');
  7  |     const count = await otpInputs.count();
  8  |     expect(count).toBeGreaterThanOrEqual(4);
  9  |   });
  10 | 
  11 |   test('OTP page has verify button', async ({ page }) => {
  12 |     await page.goto('/verify-otp');
  13 |     const verifyBtn = page.locator('button:has-text("Verify"), button:has-text("Submit")');
> 14 |     await expect(verifyBtn).toBeVisible();
     |                             ^ Error: expect(locator).toBeVisible() failed
  15 |   });
  16 | 
  17 |   test('OTP page has resend option', async ({ page }) => {
  18 |     await page.goto('/verify-otp');
  19 |     const resendLink = page.locator('a:has-text("Resend"), button:has-text("Resend")');
  20 |     await expect(resendLink).toBeVisible();
  21 |   });
  22 | 
  23 |   test('OTP page has back to login link', async ({ page }) => {
  24 |     await page.goto('/verify-otp');
  25 |     const backLink = page.locator('a:has-text("Back"), a:has-text("Login")');
  26 |     await expect(backLink.first()).toBeVisible();
  27 |   });
  28 | 
  29 |   test('OTP input accepts numeric characters', async ({ page }) => {
  30 |     await page.goto('/verify-otp');
  31 |     const firstInput = page.locator('input[type="text"][maxlength="1"]').first();
  32 |     await firstInput.fill('1');
  33 |     await expect(firstInput).toHaveValue('1');
  34 |   });
  35 | });
```