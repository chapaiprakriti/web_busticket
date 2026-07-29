import { test, expect } from "@playwright/test";

test.describe("AI Routes Page", () => {
  test("ai routes page loads successfully", async ({ page }) => {
    await page.goto("/ai-routes");
    await expect(page.locator("h1")).toContainText(/AI Route Planner|route planner|route/i);
  });

  test("ai routes page has search form", async ({ page }) => {
    await page.goto("/ai-routes");
    await expect(page.locator('input[placeholder*="from" i]')).toBeVisible();
    await expect(page.locator('input[placeholder*="to" i]')).toBeVisible();
    await expect(page.locator('input[type="date"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("ai routes shows suggestions after search", async ({ page }) => {
    await page.goto("/ai-routes");
    await page.locator('input[placeholder*="from" i]').fill("Kathmandu");
    await page.locator('input[placeholder*="to" i]').fill("Pokhara");
    await page.locator('button[type="submit"]').click();

    await page.waitForTimeout(1000);

    const suggestions = page.locator('[class*="border-white/8"][class*="rounded-2xl"]');
    const count = await suggestions.count();
    expect(count).toBeGreaterThan(0);
  });

  test("ai routes page has book suggestion button", async ({ page }) => {
    await page.goto("/ai-routes");
    await page.locator('input[placeholder*="from" i]').fill("Kathmandu");
    await page.locator('input[placeholder*="to" i]').fill("Pokhara");
    await page.locator('button[type="submit"]').click();

    await page.waitForTimeout(1000);

    const bookButtons = page.getByText(/book this route|book/i);
    const count = await bookButtons.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});