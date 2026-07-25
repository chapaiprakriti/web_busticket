import axiosInstance from "./axios-instance";
import { API } from "./endpoints";

export type CreateBookingPayload = {
  origin: string;
  destination: string;
  operatorName: string;
  busName: string;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  selectedSeats: string[];
  totalFare: number;
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
};

export const createBooking = async (data: CreateBookingPayload) => {
  try {
    const response = await axiosInstance.post(API.BOOKINGS.CREATE, data);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Booking failed");
  }
};

export const getMyBookings = async () => {
  try {
    const response = await axiosInstance.get(API.BOOKINGS.LIST);
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch bookings");
  }
};

export const getBookingById = async (id: string) => {
  try {
    const response = await axiosInstance.get(API.BOOKINGS.DETAIL(id));
    return response.data;
  } catch (error: any) {
    throw new Error(error?.response?.data?.message || "Failed to fetch booking");
  }
};
