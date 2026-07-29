# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: home.spec.ts >> Home & Navigation >> navigation links are visible on home page
- Location: tests\home.spec.ts:29:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('a[href="/book"]')
Expected: visible
Error: strict mode violation: locator('a[href="/book"]') resolved to 2 elements:
    1) <a href="/book" class="text-sm font-medium transition-colors text-gray-400 hover:text-white">Book</a> aka getByRole('link', { name: 'Book' })
    2) <a href="/book" class="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 font-medium">…</a> aka getByRole('link', { name: 'View All Routes' })

Call log:
  - Expect "toBeVisible" with timeout 10000ms
  - waiting for locator('a[href="/book"]')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "Seat Sathi" [ref=e5] [cursor=pointer]:
        - /url: /
      - navigation [ref=e12]:
        - link "Home" [ref=e13] [cursor=pointer]:
          - /url: /
        - link "Book" [ref=e14] [cursor=pointer]:
          - /url: /book
        - link "Sign In" [ref=e15] [cursor=pointer]:
          - /url: /login
        - link "AI Chat" [ref=e16] [cursor=pointer]:
          - /url: /ai-chat
        - link "AI Routes" [ref=e17] [cursor=pointer]:
          - /url: /ai-routes
      - generic [ref=e18]:
        - link "Sign In" [ref=e19] [cursor=pointer]:
          - /url: /login
        - link "Sign Up" [ref=e20] [cursor=pointer]:
          - /url: /register
  - generic [ref=e22]:
    - generic [ref=e23]: TRAVEL SAFE ACROSS NEPAL
    - heading "Your Trusted Travel Partner for Every Mile." [level=1] [ref=e25]: Your Trusted TravelPartner for Every Mile.
    - paragraph [ref=e26]: Experience the most comfortable bus travel experience in Nepal. Book tickets instantly with live seat selection and real-time tracking.
    - generic [ref=e27]:
      - generic [ref=e28]:
        - generic [ref=e29]: FROM
        - combobox [ref=e34]:
          - option "Kathmandu" [selected]
          - option "Pokhara"
          - option "Chitwan"
          - option "Butwal"
          - option "Biratnagar"
          - option "Dharan"
          - option "Birgunj"
          - option "Mustang"
          - option "Lumbini"
          - option "Baglung"
      - generic [ref=e39]:
        - generic [ref=e40]: TO
        - combobox [ref=e45]:
          - option "Kathmandu"
          - option "Pokhara" [selected]
          - option "Chitwan"
          - option "Butwal"
          - option "Biratnagar"
          - option "Dharan"
          - option "Birgunj"
          - option "Mustang"
          - option "Lumbini"
          - option "Baglung"
      - generic [ref=e46]:
        - generic [ref=e47]: DEPARTURE DATE
        - textbox [ref=e51]: 2026-07-29
      - button "Search Buses" [ref=e53]
  - generic [ref=e57]:
    - generic [ref=e58]:
      - heading "Instant Booking" [level=3] [ref=e62]
      - paragraph [ref=e63]: Book your tickets in under 2 minutes with our seamless checkout process.
    - generic [ref=e64]:
      - heading "Secure Payments" [level=3] [ref=e68]
      - paragraph [ref=e69]: All transactions are encrypted and secured using banking-grade security.
    - generic [ref=e70]:
      - heading "24/7 Support" [level=3] [ref=e74]
      - paragraph [ref=e75]: Our dedicated support team is always here to help you with your journey.
  - generic [ref=e77]:
    - generic [ref=e78]:
      - generic [ref=e79]:
        - heading "Popular Routes" [level=2] [ref=e80]
        - paragraph [ref=e81]: Discover trending destinations from your location.
      - link "View All Routes" [ref=e82] [cursor=pointer]:
        - /url: /book
    - generic [ref=e85]:
      - link "SCENIC ROUTE KTM Pokhara Starts from Rs. 1,200" [ref=e86] [cursor=pointer]:
        - /url: /book?from=Kathmandu&to=Pokhara&date=2026-07-29
        - paragraph [ref=e87]: SCENIC ROUTE
        - generic [ref=e88]:
          - generic [ref=e89]: KTM
          - generic [ref=e92]: Pokhara
        - paragraph [ref=e93]: Starts from
        - generic [ref=e94]: Rs. 1,200
      - link "POPULAR BUS KTM Mustang Starts from Rs. 2,500" [ref=e99] [cursor=pointer]:
        - /url: /book?from=Kathmandu&to=Mustang&date=2026-07-29
        - paragraph [ref=e100]: POPULAR BUS
        - generic [ref=e101]:
          - generic [ref=e102]: KTM
          - generic [ref=e105]: Mustang
        - paragraph [ref=e106]: Starts from
        - generic [ref=e107]: Rs. 2,500
      - link "CULTURAL BUS KTM Lumbini Starts from Rs. 1,500" [ref=e112] [cursor=pointer]:
        - /url: /book?from=Kathmandu&to=Lumbini&date=2026-07-29
        - paragraph [ref=e113]: CULTURAL BUS
        - generic [ref=e114]:
          - generic [ref=e115]: KTM
          - generic [ref=e118]: Lumbini
        - paragraph [ref=e119]: Starts from
        - generic [ref=e120]: Rs. 1,500
      - link "INDUSTRIAL EXPRESS KTM Biratnagar Starts from Rs. 1,800" [ref=e125] [cursor=pointer]:
        - /url: /book?from=Kathmandu&to=Biratnagar&date=2026-07-29
        - paragraph [ref=e126]: INDUSTRIAL EXPRESS
        - generic [ref=e127]:
          - generic [ref=e128]: KTM
          - generic [ref=e131]: Biratnagar
        - paragraph [ref=e132]: Starts from
        - generic [ref=e133]: Rs. 1,800
  - generic [ref=e139]:
    - generic [ref=e140]:
      - paragraph [ref=e141]: 50,000+
      - paragraph [ref=e142]: Happy Travelers
    - generic [ref=e143]:
      - paragraph [ref=e144]: 200+
      - paragraph [ref=e145]: Bus Operators
    - generic [ref=e146]:
      - paragraph [ref=e147]: 50+
      - paragraph [ref=e148]: Routes
    - generic [ref=e149]:
      - paragraph [ref=e150]: 4.8★
      - paragraph [ref=e151]: App Rating
  - contentinfo [ref=e152]:
    - generic [ref=e153]:
      - generic [ref=e154]:
        - generic [ref=e155]:
          - generic [ref=e156]: Seat Sathi
          - paragraph [ref=e163]: Redefining bus travel in Nepal with modern technology and customer-centric services. Booking a ticket has never been easier.
          - generic [ref=e164]:
            - generic [ref=e165]: App Store
            - generic [ref=e168]: Google Play
        - generic [ref=e171]:
          - heading "Company" [level=4] [ref=e172]
          - list [ref=e173]:
            - listitem [ref=e174]:
              - link "About Us" [ref=e175] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e176]:
              - link "Careers" [ref=e177] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e178]:
              - link "Blog" [ref=e179] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e180]:
              - link "Press" [ref=e181] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e182]:
          - heading "Support" [level=4] [ref=e183]
          - list [ref=e184]:
            - listitem [ref=e185]:
              - link "Help Center" [ref=e186] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e187]:
              - link "Contact Us" [ref=e188] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e189]:
              - link "FAQs" [ref=e190] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e191]:
              - link "Terms" [ref=e192] [cursor=pointer]:
                - /url: "#"
        - generic [ref=e193]:
          - heading "Legal" [level=4] [ref=e194]
          - list [ref=e195]:
            - listitem [ref=e196]:
              - link "Privacy Policy" [ref=e197] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e198]:
              - link "Refund Policy" [ref=e199] [cursor=pointer]:
                - /url: "#"
            - listitem [ref=e200]:
              - link "Cookie Policy" [ref=e201] [cursor=pointer]:
                - /url: "#"
      - generic [ref=e202]:
        - paragraph [ref=e203]: © 2024 Seat Sathi. All rights reserved.
        - paragraph [ref=e204]: Made with ❤ for Nepal
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Home & Navigation", () => {
  4  |   test("home page loads successfully", async ({ page }) => {
  5  |     const response = await page.goto("/");
  6  |     expect(response?.status()).toBe(200);
  7  |     await expect(page).toHaveTitle(/Seat Sathi/);
  8  |   });
  9  | 
  10 |   test("login page loads", async ({ page }) => {
  11 |     await page.goto("/login");
  12 |     await expect(page.locator('input[name="email"]')).toBeVisible();
  13 |     await expect(page.locator('input[name="password"]')).toBeVisible();
  14 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  15 |   });
  16 | 
  17 |   test("register page loads", async ({ page }) => {
  18 |     await page.goto("/register");
  19 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  20 |     await expect(page.locator('input[type="password"]')).toBeVisible();
  21 |     await expect(page.locator('button[type="submit"]')).toBeVisible();
  22 |   });
  23 | 
  24 |   test("forgot password page loads", async ({ page }) => {
  25 |     await page.goto("/forgot-password");
  26 |     await expect(page.locator('input[type="email"]')).toBeVisible();
  27 |   });
  28 | 
  29 |   test("navigation links are visible on home page", async ({ page }) => {
  30 |     await page.goto("/");
  31 |     await expect(page.locator('a[href="/login"]').first()).toBeVisible();
  32 |     await expect(page.locator('a[href="/register"]').first()).toBeVisible();
> 33 |     await expect(page.locator('a[href="/book"]')).toBeVisible();
     |                                                   ^ Error: expect(locator).toBeVisible() failed
  34 |   });
  35 | });
```