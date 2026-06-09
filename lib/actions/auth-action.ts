"use server";

import { login, register } from "@/lib/api/auth";
import {
  RegisterFormData,
  LoginFormData,
} from "@/app/(auth)/_components/schema";
import { setTokenCookie, storeUserData } from "../cookies";

export const handleRegisterUser = async (data: RegisterFormData | any) => {
  try {
    const result = await register(data);

    console.log("AUTH ACTION REGISTER RESULT:", result);

    if (result.success) {
      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message || "Registration failed",
      };
    }
  } catch (error: any) {
    console.log("AUTH ACTION REGISTER ERROR:", error);

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
      const user = result.data.user;
      const token = result.data.token;

      await setTokenCookie(token);
      await storeUserData(user);

      return {
        success: true,
        message: result.message,
        data: result.data,
      };
    } else {
      return {
        success: false,
        message: result.message || "Login failed",
      };
    }
  } catch (error: any) {
    return {
      success: false,
      message: error?.message || "Login failed",
    };
  }
};