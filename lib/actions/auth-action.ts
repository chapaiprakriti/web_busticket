"use server";

import { cookies } from "next/headers";
import { login, register } from "@/lib/api/auth";
import {
  RegisterFormData,
  LoginFormData,
} from "@/app/(auth)/_components/schema";
import { setTokenCookie, storeUserData } from "@/lib/cookies";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

const getAuthToken = async () => {
  const cookieStore = await cookies();

  return (
    cookieStore.get("token")?.value ||
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("accessToken")?.value ||
    ""
  );
};

export const handleRegisterUser = async (data: RegisterFormData) => {
  try {
    const result = await register(data);

    if (result.success) {
      return {
        success: true,
        message: result.message || "Registration successful",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Registration failed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Registration failed",
    };
  }
};

export const handleLoginUser = async (data: LoginFormData) => {
  try {
    const result = await login(data);

    if (result.success) {
      const user = result.data?.user;
      const token = result.data?.token;

      if (token) {
        await setTokenCookie(token);
      }

      if (user) {
        await storeUserData(user);
      }

      return {
        success: true,
        message: result.message || "Login successful",
        data: result.data,
      };
    }

    return {
      success: false,
      message: result.message || "Login failed",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
    };
  }
};

export const handleWhoAmI = async () => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        message: "Unauthorized. Please login again.",
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/whoami`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Unable to load user",
      };
    }

    if (result.data) {
      await storeUserData(result.data);
    }

    return {
      success: true,
      message: result?.message || "User loaded successfully",
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Unable to load user",
    };
  }
};

export const handleUpdateProfile = async (formData: FormData) => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        message: "Unauthorized. Please login again.",
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/update`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Profile update failed",
      };
    }

    if (result.data) {
      await storeUserData(result.data);
    }

    return {
      success: true,
      message: result?.message || "Profile updated successfully",
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Profile update failed",
    };
  }
};

export const handleUpdatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const token = await getAuthToken();

    if (!token) {
      return {
        success: false,
        message: "Unauthorized. Please login again.",
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      }),
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      return {
        success: false,
        message: result?.message || "Password update failed",
      };
    }

    return {
      success: true,
      message: result?.message || "Password updated successfully",
      data: result.data,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Password update failed",
    };
  }
};