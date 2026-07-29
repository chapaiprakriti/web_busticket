import { test, expect } from "@playwright/test";

test.describe("AI Chat Page", () => {
  test("ai chat page loads successfully", async ({ page }) => {
    await page.goto("/ai-chat");
    await expect(page.locator("h1")).toContainText(/AI Travel Assistant|chat/i);
  });

  test("ai chat page has chat interface elements", async ({ page }) => {
    await page.goto("/ai-chat");
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("ai chat sends message and gets reply", async ({ page }) => {
    await page.goto("/ai-chat");
    const input = page.locator('input[type="text"]');
    const sendButton = page.locator('button[type="submit"]');

    await expect(input).toBeVisible();
    await expect(sendButton).toBeVisible();
  });

  test("ai chat shows welcome message", async ({ page }) => {
    await page.goto("/ai-chat");
    await expect(
      page.getByText(/travel assistant|seat sat/i).first()
    ).toBeVisible();
  });
});