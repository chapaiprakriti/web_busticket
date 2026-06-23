"use server";

import { cookies } from "next/headers";

export const setTokenCookie = async (token: string) => {
  const cookieStore = await cookies();

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const storeUserData = async (user: any) => {
  const cookieStore = await cookies();

  cookieStore.set("user", JSON.stringify(user), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
};

export const getTokenCookie = async () => {
  const cookieStore = await cookies();

  return (
    cookieStore.get("token")?.value ||
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("accessToken")?.value ||
    ""
  );
};

export const getUserData = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user")?.value;

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const clearAuthCookies = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("token");
  cookieStore.delete("auth_token");
  cookieStore.delete("accessToken");
  cookieStore.delete("user");
};