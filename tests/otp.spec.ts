import { test, expect } from "@playwright/test";

test.describe("OTP API Route", () => {
  test("otp api endpoint accepts POST requests", async ({ request }) => {
    const response = await request.post("/api/otp", {
      data: { action: "send", email: "test@example.com" },
    });
    expect(response.status()).not.toBe(404);
  });

  test("otp api returns error for unsupported email domain", async ({ request }) => {
    const response = await request.post("/api/otp", {
      data: { action: "send", email: "test@example.com" },
    });
    expect(response.status()).toBeGreaterThanOrEqual(400);
  });

  test("otp api rejects invalid email", async ({ request }) => {
    const response = await request.post("/api/otp", {
      data: { action: "send", email: "invalid" },
    });
    expect(response.status()).toBe(400);
  });

  test("otp api rejects missing email", async ({ request }) => {
    const response = await request.post("/api/otp", {
      data: { action: "send" },
    });
    expect(response.status()).toBe(400);
  });
});