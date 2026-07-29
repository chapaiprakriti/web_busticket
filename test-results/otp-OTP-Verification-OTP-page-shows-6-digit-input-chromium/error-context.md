# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: otp.spec.ts >> OTP Verification >> OTP page shows 6 digit input
- Location: tests\otp.spec.ts:4:7

# Error details

```
Error: expect(received).toBeGreaterThanOrEqual(expected)

Expected: >= 4
Received:    0
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
  3  | test.describe('OTP Verification', () => {
  4  |   test('OTP page shows 6 digit input', async ({ page }) => {
  5  |     await page.goto('/verify-otp');
  6  |     const otpInputs = page.locator('input[type="text"][maxlength="1"]');
  7  |     const count = await otpInputs.count();
> 8  |     expect(count).toBeGreaterThanOrEqual(4);
     |                   ^ Error: expect(received).toBeGreaterThanOrEqual(expected)
  9  |   });
  10 | 
  11 |   test('OTP page has verify button', async ({ page }) => {
  12 |     await page.goto('/verify-otp');
  13 |     const verifyBtn = page.locator('button:has-text("Verify"), button:has-text("Submit")');
  14 |     await expect(verifyBtn).toBeVisible();
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