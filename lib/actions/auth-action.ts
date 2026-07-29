"use server";

import { cookies } from "next/headers";
import { login, register, resetPassword } from "@/lib/api/auth";
import {
  RegisterFormData,
  LoginFormData,
} from "@/app/(auth)/_components/schema";
import { setTokenCookie, storeUserData } from "@/lib/cookies";
import { Resend } from "resend";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://bus-ticketing-ouxm.onrender.com";

const getAuthToken = async () => {
  const cookieStore = await cookies();
  return (
    cookieStore.get("token")?.value ||
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("accessToken")?.value ||
    ""
  );
};

// ── Register ──────────────────────────────────────────────────────────────────
export const handleRegisterUser = async (data: RegisterFormData) => {
  try {
    const result = await register(data);
    if (result.success) {
      return { success: true, message: result.message || "Registration successful", data: result.data };
    }
    return { success: false, message: result.message || "Registration failed" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Registration failed" };
  }
};

// ── Login ─────────────────────────────────────────────────────────────────────
export const handleLoginUser = async (data: LoginFormData) => {
  try {
    const result = await login(data);
    if (result.success) {
      const user = result.data?.user;
      const token = result.data?.token;
      if (token) await setTokenCookie(token);
      if (user) await storeUserData(user);
      return { success: true, message: result.message || "Login successful", data: result.data };
    }
    return { success: false, message: result.message || "Login failed" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Login failed" };
  }
};

// ── Who Am I ──────────────────────────────────────────────────────────────────
export const handleWhoAmI = async () => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized. Please login again." };

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/whoami`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Unable to load user" };
    }
    if (result.data) await storeUserData(result.data);
    return { success: true, message: result?.message || "User loaded successfully", data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Unable to load user" };
  }
};

// ── Update Profile ────────────────────────────────────────────────────────────
export const handleUpdateProfile = async (formData: FormData) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized. Please login again." };

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/update`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Profile update failed" };
    }
    if (result.data) await storeUserData(result.data);
    return { success: true, message: result?.message || "Profile updated successfully", data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Profile update failed" };
  }
};

// ── Update Password ───────────────────────────────────────────────────────────
export const handleUpdatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized. Please login again." };

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Password update failed" };
    }
    return { success: true, message: result?.message || "Password updated successfully", data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Password update failed" };
  }
};

// ── Forgot Password (send OTP) ────────────────────────────────────────────────
export const handleForgotPassword = async (email: string) => {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    // Store OTP in a signed cookie so it persists across requests
    const cookieStore = await cookies();
    cookieStore.set("otp_data", JSON.stringify({ email: email.toLowerCase(), otp: code, expiresAt }), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 5, // 5 minutes
      path: "/",
    });

    const { error } = await resend.emails.send({
      from: "Seat Sathi <onboarding@resend.dev>",
      to: [email],
      subject: "Your Seat Sathi OTP",
      html: `
        <div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:32px;background:#071b38;color:#fff;border-radius:12px;">
          <h2 style="color:#ef4444;">Seat Sathi — Password Reset</h2>
          <p>Your one-time password is:</p>
          <div style="font-size:40px;font-weight:bold;letter-spacing:12px;color:#f97316;margin:24px 0;">
            ${code}
          </div>
          <p style="color:#9ca3af;font-size:14px;">This OTP is valid for <strong>5 minutes</strong>. Do not share it with anyone.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, message: `Failed to send email: ${error.message}` };
    }

    return { success: true, message: "OTP sent to your email" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to send OTP" };
  }
};

// ── Reset Password (verify OTP + new password) ────────────────────────────────
export const handleResetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    // Step 1: verify OTP from cookie
    const cookieStore = await cookies();
    const raw = cookieStore.get("otp_data")?.value;

    if (!raw) {
      return { success: false, message: "No OTP found. Please request a new one." };
    }

    const { email: storedEmail, otp: storedOtp, expiresAt } = JSON.parse(raw);

    if (storedEmail !== data.email.toLowerCase()) {
      return { success: false, message: "OTP was sent to a different email." };
    }

    if (Date.now() > expiresAt) {
      cookieStore.delete("otp_data");
      return { success: false, message: "OTP has expired. Please request a new one." };
    }

    if (storedOtp !== data.otp.trim()) {
      return { success: false, message: "Incorrect OTP. Please try again." };
    }

    // OTP valid — clear it
    cookieStore.delete("otp_data");

    // Step 2: update password on backend via direct endpoint (no OTP required)
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://bus-ticketing-ouxm.onrender.com";
    const response = await fetch(`${API_BASE_URL}/api/v1/auth/reset-password-direct`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email, newPassword: data.newPassword }),
    });
    const result = await response.json();
    if (result.success) {
      return { success: true, message: result.message || "Password reset successfully" };
    }
    return { success: false, message: result.message || "Password reset failed" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Password reset failed" };
  }
};
