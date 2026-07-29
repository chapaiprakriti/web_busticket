import Cookies from "js-cookie";

export const setTokenCookie = (token: string) => {
  Cookies.set("token", token, {
    expires: 7,
    path: "/",
  });
};

export const getTokenCookie = () => {
  return Cookies.get("token");
};

export const removeTokenCookie = () => {
  Cookies.remove("token", { path: "/" });
};

export const storeUserData = (user: unknown) => {
  Cookies.set("user", JSON.stringify(user), {
    expires: 7,
    path: "/",
  });
};

export const getUserData = () => {
  const user = Cookies.get("user");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const removeUserData = () => {
  Cookies.remove("user", { path: "/" });
};

export const clearAuthCookies = () => {
  removeTokenCookie();
  removeUserData();
};