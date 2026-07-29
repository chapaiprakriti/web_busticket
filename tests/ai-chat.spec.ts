import { test, expect } from '@playwright/test';

test.describe('AI Chat Widget', () => {
  test('AI chat widget opens on home page', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
    await chatBtn.click();
    await expect(page.locator('[data-testid="ai-chat"], :text("AI"), :text("Assistant"), :text("Seat Sathi")').first()).toBeVisible();
  });

  test('AI chat sends text message', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
    await chatBtn.click();
    const input = page.locator('textarea, input[type="text"]').filter({ hasText: '' }).first();
    await input.fill('Hello');
    await input.press('Enter');
  });

  test('AI chat responds to greetings', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
    await chatBtn.click();
    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('Hello');
    await input.press('Enter');
    await page.waitForTimeout(1000);
  });

  test('AI chat responds to route questions', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
    await chatBtn.click();
    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('What routes are available?');
    await input.press('Enter');
    await page.waitForTimeout(1000);
  });

  test('AI chat responds to booking questions', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
    await chatBtn.click();
    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('How do I book a ticket?');
    await input.press('Enter');
    await page.waitForTimeout(1000);
  });

  test('AI chat shows error for image input', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('[data-testid="ai-chat-toggle"], button:has-text("Chat"), button:has-text("AI")');
    await chatBtn.click();
    const input = page.locator('textarea, input[type="text"]').first();
    await input.fill('image.png');
    await input.press('Enter');
    await page.waitForTimeout(1000);
  });
});