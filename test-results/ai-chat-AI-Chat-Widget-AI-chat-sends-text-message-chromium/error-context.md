# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ai-chat.spec.ts >> AI Chat Widget >> AI chat sends text message
- Location: tests\ai-chat.spec.ts:11:7

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")')

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - generic [ref=e2]:
    - banner [ref=e3]:
      - generic [ref=e4]:
        - link [ref=e5] [cursor=pointer]:
          - /url: /
        - navigation [ref=e11]:
          - link "Home" [ref=e12] [cursor=pointer]:
            - /url: /
          - link "Book" [ref=e13] [cursor=pointer]:
            - /url: /book
          - link "Sign In" [ref=e14] [cursor=pointer]:
            - /url: /login
          - link "AI Chat" [ref=e15] [cursor=pointer]:
            - /url: /ai-chat
          - link "AI Routes" [ref=e16] [cursor=pointer]:
            - /url: /ai-routes
        - generic [ref=e17]:
          - link "Sign In" [ref=e18] [cursor=pointer]:
            - /url: /login
          - link "Sign Up" [ref=e19] [cursor=pointer]:
            - /url: /register
    - generic [ref=e21]:
      - generic [ref=e22]: TRAVEL SAFE ACROSS NEPAL
      - heading "Your Trusted Travel Partner for Every Mile." [level=1] [ref=e23]: Your Trusted TravelPartner for Every Mile.
      - paragraph [ref=e24]: Experience the most comfortable bus travel experience in Nepal. Book tickets instantly with live seat selection and real-time tracking.
      - generic [ref=e25]:
        - generic [ref=e26]:
          - text: FROM
          - combobox [ref=e31]:
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
        - generic [ref=e36]:
          - text: TO
          - combobox [ref=e41]:
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
        - generic [ref=e42]:
          - text: DEPARTURE DATE
          - textbox [ref=e46]: 2026-07-29
        - button "Search Buses" [ref=e48]
    - generic [ref=e52]:
      - generic [ref=e53]:
        - heading "Instant Booking" [level=3] [ref=e57]
        - paragraph [ref=e58]: Book your tickets in under 2 minutes with our seamless checkout process.
      - generic [ref=e59]:
        - heading "Secure Payments" [level=3] [ref=e63]
        - paragraph [ref=e64]: All transactions are encrypted and secured using banking-grade security.
      - generic [ref=e65]:
        - heading "24/7 Support" [level=3] [ref=e69]
        - paragraph [ref=e70]: Our dedicated support team is always here to help you with your journey.
    - generic [ref=e72]:
      - generic [ref=e73]:
        - generic [ref=e74]:
          - heading "Popular Routes" [level=2] [ref=e75]
          - paragraph [ref=e76]: Discover trending destinations from your location.
        - link "View All Routes" [ref=e77] [cursor=pointer]:
          - /url: /book
      - generic [ref=e80]:
        - link "SCENIC ROUTE KTM Pokhara Starts from Rs. 1,200" [ref=e81] [cursor=pointer]:
          - /url: /book?from=Kathmandu&to=Pokhara&date=2026-07-29
          - paragraph [ref=e82]: SCENIC ROUTE
          - generic [ref=e83]: KTMPokhara
          - paragraph [ref=e86]: Starts from
          - generic [ref=e87]: Rs. 1,200
        - link "POPULAR BUS KTM Mustang Starts from Rs. 2,500" [ref=e92] [cursor=pointer]:
          - /url: /book?from=Kathmandu&to=Mustang&date=2026-07-29
          - paragraph [ref=e93]: POPULAR BUS
          - generic [ref=e94]: KTMMustang
          - paragraph [ref=e97]: Starts from
          - generic [ref=e98]: Rs. 2,500
        - link "CULTURAL BUS KTM Lumbini Starts from Rs. 1,500" [ref=e103] [cursor=pointer]:
          - /url: /book?from=Kathmandu&to=Lumbini&date=2026-07-29
          - paragraph [ref=e104]: CULTURAL BUS
          - generic [ref=e105]: KTMLumbini
          - paragraph [ref=e108]: Starts from
          - generic [ref=e109]: Rs. 1,500
        - link "INDUSTRIAL EXPRESS KTM Biratnagar Starts from Rs. 1,800" [ref=e114] [cursor=pointer]:
          - /url: /book?from=Kathmandu&to=Biratnagar&date=2026-07-29
          - paragraph [ref=e115]: INDUSTRIAL EXPRESS
          - generic [ref=e116]: KTMBiratnagar
          - paragraph [ref=e119]: Starts from
          - generic [ref=e120]: Rs. 1,800
    - generic [ref=e126]:
      - generic [ref=e127]:
        - paragraph [ref=e128]: 50,000+
        - paragraph [ref=e129]: Happy Travelers
      - generic [ref=e130]:
        - paragraph [ref=e131]: 200+
        - paragraph [ref=e132]: Bus Operators
      - generic [ref=e133]:
        - paragraph [ref=e134]: 50+
        - paragraph [ref=e135]: Routes
      - generic [ref=e136]:
        - paragraph [ref=e137]: 4.8★
        - paragraph [ref=e138]: App Rating
    - contentinfo [ref=e139]:
      - generic [ref=e140]:
        - generic [ref=e141]:
          - generic [ref=e142]:
            - generic [ref=e143]: Seat Sathi
            - paragraph [ref=e149]: Redefining bus travel in Nepal with modern technology and customer-centric services. Booking a ticket has never been easier.
            - generic [ref=e150]:
              - generic [ref=e151]: App Store
              - generic [ref=e154]: Google Play
          - generic [ref=e157]:
            - heading "Company" [level=4] [ref=e158]
            - list [ref=e159]:
              - listitem [ref=e160]:
                - link "About Us" [ref=e161] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e162]:
                - link "Careers" [ref=e163] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e164]:
                - link "Blog" [ref=e165] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e166]:
                - link "Press" [ref=e167] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e168]:
            - heading "Support" [level=4] [ref=e169]
            - list [ref=e170]:
              - listitem [ref=e171]:
                - link "Help Center" [ref=e172] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e173]:
                - link "Contact Us" [ref=e174] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e175]:
                - link "FAQs" [ref=e176] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e177]:
                - link "Terms" [ref=e178] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e179]:
            - heading "Legal" [level=4] [ref=e180]
            - list [ref=e181]:
              - listitem [ref=e182]:
                - link "Privacy Policy" [ref=e183] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e184]:
                - link "Refund Policy" [ref=e185] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e186]:
                - link "Cookie Policy" [ref=e187] [cursor=pointer]:
                  - /url: "#"
        - generic [ref=e188]:
          - paragraph [ref=e189]: © 2024 Seat Sathi. All rights reserved.
          - paragraph [ref=e190]: Made with ❤ for Nepal
  - alert [ref=e191]
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('AI Chat Widget', () => {
  4  |   test('AI chat widget opens on home page', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
  7  |     await chatBtn.click();
  8  |     await expect(page.locator('[data-testid="ai-chat"], :text("AI"), :text("Assistant"), :text("Seat Sathi")').first()).toBeVisible();
  9  |   });
  10 | 
  11 |   test('AI chat sends text message', async ({ page }) => {
  12 |     await page.goto('/');
  13 |     const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
> 14 |     await chatBtn.click();
     |                   ^ Error: locator.click: Test timeout of 30000ms exceeded.
  15 |     const input = page.locator('textarea, input[type="text"]').filter({ hasText: '' }).first();
  16 |     await input.fill('Hello');
  17 |     await input.press('Enter');
  18 |   });
  19 | 
  20 |   test('AI chat responds to greetings', async ({ page }) => {
  21 |     await page.goto('/');
  22 |     const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
  23 |     await chatBtn.click();
  24 |     const input = page.locator('textarea, input[type="text"]').first();
  25 |     await input.fill('Hello');
  26 |     await input.press('Enter');
  27 |     await page.waitForTimeout(1000);
  28 |   });
  29 | 
  30 |   test('AI chat responds to route questions', async ({ page }) => {
  31 |     await page.goto('/');
  32 |     const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
  33 |     await chatBtn.click();
  34 |     const input = page.locator('textarea, input[type="text"]').first();
  35 |     await input.fill('What routes are available?');
  36 |     await input.press('Enter');
  37 |     await page.waitForTimeout(1000);
  38 |   });
  39 | 
  40 |   test('AI chat responds to booking questions', async ({ page }) => {
  41 |     await page.goto('/');
  42 |     const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
  43 |     await chatBtn.click();
  44 |     const input = page.locator('textarea, input[type="text"]').first();
  45 |     await input.fill('How do I book a ticket?');
  46 |     await input.press('Enter');
  47 |     await page.waitForTimeout(1000);
  48 |   });
  49 | 
  50 |   test('AI chat shows error for image input', async ({ page }) => {
  51 |     await page.goto('/');
  52 |     const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
  53 |     await chatBtn.click();
  54 |     const input = page.locator('textarea, input[type="text"]').first();
  55 |     await input.fill('image.png');
  56 |     await input.press('Enter');
  57 |     await page.waitForTimeout(1000);
  58 |   });
  59 | });
```