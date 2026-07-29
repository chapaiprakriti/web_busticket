// Shared OTP store — persists across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var __otpStore: Map<string, { otp: string; expiresAt: number }> | undefined;
}

export const otpStore: Map<string, { otp: string; expiresAt: number }> =
  global.__otpStore ?? (global.__otpStore = new Map());

export function saveOtp(email: string, otp: string) {
  otpStore.set(email.toLowerCase(), {
    otp,
    expiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
  });
}

export function verifyOtp(email: string, otp: string): { valid: boolean; message: string } {
  const stored = otpStore.get(email.toLowerCase());

  if (!stored) {
    return { valid: false, message: "No OTP found. Please request a new one." };
  }

  if (Date.now() > stored.expiresAt) {
    otpStore.delete(email.toLowerCase());
    return { valid: false, message: "OTP has expired. Please request a new one." };
  }

  if (stored.otp !== otp.trim()) {
    return { valid: false, message: "Incorrect OTP. Please try again." };
  }

  otpStore.delete(email.toLowerCase()); // used — remove it
  return { valid: true, message: "OTP verified" };
}
