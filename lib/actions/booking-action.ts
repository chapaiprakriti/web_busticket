"use server";

import { cookies } from "next/headers";
import { CreateBookingPayload } from "@/lib/api/booking";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://bus-ticketing-ouxm.onrender.com";

const getAuthToken = async () => {
  const cookieStore = await cookies();
  return (
    cookieStore.get("token")?.value ||
    cookieStore.get("auth_token")?.value ||
    ""
  );
};

// ── Create Booking ────────────────────────────────────────────────────────────
export const handleCreateBooking = async (data: CreateBookingPayload) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized. Please login again." };

    const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Booking failed" };
    }
    return { success: true, message: result.message || "Booking created", data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Booking failed" };
  }
};

// ── Get My Bookings ───────────────────────────────────────────────────────────
export const handleGetMyBookings = async () => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized.", data: [] };

    const response = await fetch(`${API_BASE_URL}/api/v1/bookings`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Failed to fetch bookings", data: [] };
    }
    return { success: true, data: result.data || [] };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch bookings", data: [] };
  }
};

// ── Get Booking By ID ─────────────────────────────────────────────────────────
export const handleGetBookingById = async (id: string) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized.", data: null };

    const response = await fetch(`${API_BASE_URL}/api/v1/bookings/${id}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Booking not found", data: null };
    }
    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch booking", data: null };
  }
};

// ── Admin: Get All Users ──────────────────────────────────────────────────────
export const handleAdminGetUsers = async (params?: { page?: number; limit?: number; search?: string }) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized.", data: [] };

    const query = new URLSearchParams();
    if (params?.page) query.set("page", String(params.page));
    if (params?.limit) query.set("limit", String(params.limit));
    if (params?.search) query.set("search", params.search);

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users?${query.toString()}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result?.message || "Failed to fetch users", data: [], meta: null };
    }
    return { success: true, data: result.data || [], meta: result.meta || null };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to fetch users", data: [], meta: null };
  }
};

// ── Admin: Update User ────────────────────────────────────────────────────────
export const handleAdminUpdateUser = async (id: string, updateData: any) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized." };

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result?.message || "Update failed" };
    }
    return { success: true, message: result.message || "User updated", data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Update failed" };
  }
};

// ── Admin: Delete User ────────────────────────────────────────────────────────
export const handleAdminDeleteUser = async (id: string) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized." };

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result?.message || "Delete failed" };
    }
    return { success: true, message: result.message || "User deleted" };
  } catch (error: any) {
    return { success: false, message: error?.message || "Delete failed" };
  }
};

// ── Admin: Create User ────────────────────────────────────────────────────────
export const handleAdminCreateUser = async (userData: any) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized." };

    const response = await fetch(`${API_BASE_URL}/api/v1/admin/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(userData),
    });

    const result = await response.json();
    if (!response.ok) {
      return { success: false, message: result?.message || "Create failed" };
    }
    return { success: true, message: result.message || "User created", data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Create failed" };
  }
};

// ── Khalti: Verify payment + create booking ───────────────────────────────────
export const handleKhaltiVerify = async (pidx: string, bookingData: CreateBookingPayload) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Unauthorized." };

    const response = await fetch(`${API_BASE_URL}/api/v1/payments/khalti/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pidx, bookingData }),
    });

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Payment verification failed" };
    }
    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Payment verification failed" };
  }
};

// ── Khalti: Initiate payment (server-side) ────────────────────────────────────
export const handleKhaltiInitiate = async (data: {
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  return_url: string;
  website_url: string;
}) => {
  try {
    const token = await getAuthToken();
    if (!token) return { success: false, message: "Please log in to continue." };

    const response = await fetch(`${API_BASE_URL}/api/v1/payments/khalti/initiate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    // Guard against HTML error pages
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      return { success: false, message: `Server error (${response.status}). Please try again.` };
    }

    const result = await response.json();
    if (!response.ok || !result.success) {
      return { success: false, message: result?.message || "Failed to initiate Khalti payment" };
    }
    return { success: true, data: result.data };
  } catch (error: any) {
    return { success: false, message: error?.message || "Failed to initiate payment" };
  }
};
