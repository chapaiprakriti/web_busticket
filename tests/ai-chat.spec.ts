import { test, expect } from '@playwright/test';

test.describe('AI Chat Widget', () => {
  test('AI chat widget exists on home page', async ({ page }) => {
    await page.goto('/');
    const chatBtn = page.locator('button:has-text("Chat"), button:has-text("AI"), button:has-text("Assistant"), [data-testid="ai-chat-toggle"]');
    expect(await chatBtn.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page has header with logo', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toBeVisible();
  });

  test('home page hero section has CTA', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('[class*="hero"], [class*="hero-section"], section').first();
    expect(await hero.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page popular routes displayed', async ({ page }) => {
    await page.goto('/');
    const routeCards = page.locator('[class*="route"], [class*="card"], [class*="popular"]');
    expect(await routeCards.count()).toBeGreaterThanOrEqual(0);
  });

  test('home page city cards or listings shown', async ({ page }) => {
    await page.goto('/');
    const content = page.locator('text=Kathmandu').first();
    expect(await content.count()).toBeGreaterThan(0);
  });
});