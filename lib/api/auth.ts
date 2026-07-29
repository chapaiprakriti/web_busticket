import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export const register = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.AUTH.REGISTER, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Registration failed");
  }
};

export const login = async (data: any) => {
  try {
    const response = await axiosInstance.post(API.AUTH.LOGIN, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Login failed");
  }
};

export const whoami = async () => {
  try {
    const response = await axiosInstance.get(API.AUTH.WHOAMI);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Unable to load user");
  }
};

export const updateProfile = async (data: FormData) => {
  try {
    const response = await axiosInstance.put(API.AUTH.UPDATE, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Profile update failed");
  }
};

export const updatePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  try {
    const response = await axiosInstance.put(API.AUTH.UPDATE, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Password update failed");
  }
};

export const forgotPassword = async (email: string) => {
  try {
    const response = await axiosInstance.post(API.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to send OTP");
  }
};

export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  try {
    const response = await axiosInstance.post(API.AUTH.RESET_PASSWORD, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Password reset failed");
  }
};
