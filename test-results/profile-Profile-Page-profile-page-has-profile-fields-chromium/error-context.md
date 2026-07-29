# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: profile.spec.ts >> Profile Page >> profile page has profile fields
- Location: tests\profile.spec.ts:14:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('input[placeholder*="phone" i]')
Expected: visible
Timeout: 10000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('input[placeholder*="phone" i]')

```

```yaml
- heading "Seat Sathi" [level=1]
- paragraph: SIGN IN TO YOUR ACCOUNT
- text: EMAIL ADDRESS
- textbox "name@example.com"
- text: PASSWORD
- link "Forgot Password?":
  - /url: /forgot-password
- textbox "********"
- checkbox
- text: Keep me logged in
- button "Sign In"
- paragraph:
  - text: Don't have an account?
  - link "Sign Up":
    - /url: /register
- alert
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Profile Page", () => {
  4  |   test("profile page loads and has AI chat widget", async ({ page }) => {
  5  |     await page.goto("/profile");
  6  |     await expect(page.locator("h1")).toBeVisible();
  7  |   });
  8  | 
  9  |   test("profile page shows avatar or initials", async ({ page }) => {
  10 |     await page.goto("/profile");
  11 |     await expect(page.locator("h1")).toBeVisible();
  12 |   });
  13 | 
  14 |   test("profile page has profile fields", async ({ page }) => {
  15 |     await page.goto("/profile");
  16 |     await expect(page.locator('input[placeholder*="name" i]')).toBeVisible();
> 17 |     await expect(page.locator('input[placeholder*="phone" i]')).toBeVisible();
     |                                                                 ^ Error: expect(locator).toBeVisible() failed
  18 |   });
  19 | 
  20 |   test("ai chat widget button is visible on profile", async ({ page }) => {
  21 |     await page.goto("/profile");
  22 |     await expect(page.locator('button[aria-label*="chat" i], button[aria-label*="ai" i]').first()).toBeVisible();
  23 |   });
  24 | });
```