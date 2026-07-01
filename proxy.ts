import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/alerts",
  "/bookings",
  "/admin",
];

const isProtectedRoute = (pathname: string) =>
  protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

export function proxy(request: NextRequest) {
  const token =
    request.cookies.get("auth_token")?.value ||
    request.cookies.get("token")?.value;

  const userDataRaw =
    request.cookies.get("user_data")?.value ||
    request.cookies.get("user")?.value;

  const { pathname } = request.nextUrl;

  if (isProtectedRoute(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/admin") && token) {
    let role: string | undefined;

    try {
      role = userDataRaw ? JSON.parse(userDataRaw)?.role : undefined;
    } catch {
      role = undefined;
    }

    if (role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/profile",
    "/profile/:path*",
    "/settings",
    "/settings/:path*",
    "/alerts",
    "/alerts/:path*",
    "/bookings",
    "/bookings/:path*",
    "/admin",
    "/admin/:path*",
  ],
};