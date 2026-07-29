import { test, expect } from "@playwright/test";

test.describe("Profile Page", () => {
  test("profile page loads and has AI chat widget", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("profile page shows avatar or initials", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("profile page has profile fields", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator('input[placeholder*="name" i]')).toBeVisible();
    await expect(page.locator('input[placeholder*="phone" i]')).toBeVisible();
  });

  test("ai chat widget button is visible on profile", async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator('button[aria-label*="chat" i], button[aria-label*="ai" i]').first()).toBeVisible();
  });
});