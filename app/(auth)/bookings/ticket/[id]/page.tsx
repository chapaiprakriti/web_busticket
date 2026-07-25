"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Bus, ArrowLeft, MapPin, Clock, User, Phone,
  Mail, CreditCard, CheckCircle, XCircle, RefreshCw,
} from "lucide-react";
import { handleGetBookingById } from "@/lib/actions/booking-action";

type Booking = {
  id: string;
  origin: string;
  destination: string;
  busName: string;
  operatorName: string;
  travelDate: string;
  departureTime: string;
  arrivalTime: string;
  selectedSeats: string[];
  totalFare: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  bookingReference: string;
  passengerDetails: { fullName: string; email: string; contactNumber: string };
  createdAt: string;
};

export default function TicketPage() {
  const params = useParams();
  const id = params?.id as string;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    handleGetBookingById(id).then((result) => {
      if (result.success && result.data) {
        setBooking(result.data);
      } else {
        setError(result.message || "Booking not found");
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">
        <RefreshCw size={32} className="animate-spin text-orange-400" />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-[#071b38] flex flex-col items-center justify-center text-white px-5 gap-4">
        <XCircle size={48} className="text-red-400" />
        <p className="text-lg font-bold">{error || "Booking not found"}</p>
        <Link href="/bookings/my-bookings" className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-bold text-sm">
          Back to My Bookings
        </Link>
      </div>
    );
  }

  const isConfirmed = booking.status === "confirmed";

  return (
    <main className="min-h-screen bg-[#071b38] text-white pb-10">
      <div className="bg-[#0d2447] px-5 py-4 border-b border-[#19375f] flex items-center gap-3">
        <Link href="/bookings/my-bookings" className="w-9 h-9 rounded-xl bg-[#10294f] flex items-center justify-center">
          <ArrowLeft size={18} className="text-orange-400" />
        </Link>
        <div>
          <h1 className="text-xl font-bold">Ticket</h1>
          <p className="text-gray-400 text-sm">Booking details</p>
        </div>
      </div>

      <section className="px-5 py-6 max-w-xl mx-auto space-y-5">
        {/* Status banner */}
        <div className={`rounded-2xl p-4 flex items-center gap-3 ${isConfirmed ? "bg-green-500/15 border border-green-500/30" : "bg-yellow-500/15 border border-yellow-500/30"}`}>
          {isConfirmed
            ? <CheckCircle size={28} className="text-green-400 shrink-0" />
            : <Clock size={28} className="text-yellow-400 shrink-0" />
          }
          <div>
            <p className="font-bold text-lg">{isConfirmed ? "Booking Confirmed" : "Booking Pending"}</p>
            <p className="text-xs text-gray-400">{isConfirmed ? "Your seat is reserved." : "Awaiting payment confirmation."}</p>
          </div>
        </div>

        {/* Ticket card */}
        <div className="bg-[#0d2447] border border-[#19375f] rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#10294f] to-[#071b38] px-6 py-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Bus size={24} className="text-orange-400" />
              </div>
              <div>
                <h2 className="font-bold text-lg">{booking.busName}</h2>
                <p className="text-xs text-gray-400">{booking.operatorName}</p>
              </div>
            </div>
            {/* Route */}
            <div className="flex items-center justify-between gap-2">
              <div className="text-center">
                <p className="text-2xl font-extrabold">{booking.departureTime}</p>
                <p className="text-sm text-gray-300 flex items-center gap-1"><MapPin size={11} />{booking.origin}</p>
              </div>
              <div className="flex-1 flex flex-col items-center">
                <div className="w-full h-px bg-[#19375f] relative">
                  <Bus size={16} className="text-orange-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#10294f]" />
                </div>
              </div>
              <div className="text-center">
                <p className="text-2xl font-extrabold">{booking.arrivalTime}</p>
                <p className="text-sm text-gray-300 flex items-center gap-1"><MapPin size={11} />{booking.destination}</p>
              </div>
            </div>
          </div>

          {/* Dotted divider */}
          <div className="border-t border-dashed border-[#19375f] mx-4" />

          {/* Booking info */}
          <div className="px-6 py-5 space-y-3">
            <InfoRow icon={<Clock size={14} />} label="Travel Date" value={booking.travelDate} />
            <InfoRow icon={<CreditCard size={14} />} label="Booking Ref" value={booking.bookingReference} highlight />
            <InfoRow icon={<Bus size={14} />} label="Seats" value={booking.selectedSeats.join(", ")} />
            <InfoRow icon={<CreditCard size={14} />} label="Total Fare" value={`Rs. ${booking.totalFare}`} />
            <InfoRow icon={<CreditCard size={14} />} label="Payment Method" value={booking.paymentMethod.replace("_", " ").toUpperCase()} />
            <InfoRow icon={<CreditCard size={14} />} label="Payment Status"
              value={booking.paymentStatus.charAt(0).toUpperCase() + booking.paymentStatus.slice(1)}
              statusColor={booking.paymentStatus === "paid" ? "text-green-400" : "text-yellow-400"} />
          </div>

          {/* Dotted divider */}
          <div className="border-t border-dashed border-[#19375f] mx-4" />

          {/* Passenger details */}
          <div className="px-6 py-5 space-y-3">
            <p className="text-xs text-gray-400 uppercase font-bold mb-2">Passenger Details</p>
            <InfoRow icon={<User size={14} />} label="Name" value={booking.passengerDetails.fullName} />
            <InfoRow icon={<Mail size={14} />} label="Email" value={booking.passengerDetails.email} />
            <InfoRow icon={<Phone size={14} />} label="Phone" value={booking.passengerDetails.contactNumber} />
          </div>
        </div>

        <Link href="/bookings/my-bookings"
          className="block text-center w-full bg-[#0d2447] border border-[#19375f] hover:border-orange-500/50 py-4 rounded-2xl font-bold text-sm transition-colors">
          ← Back to My Bookings
        </Link>
        <Link href="/bookings"
          className="block text-center w-full bg-red-500 hover:bg-red-600 py-4 rounded-2xl font-bold text-sm transition-colors">
          Book Another Ticket
        </Link>
      </section>
    </main>
  );
}

function InfoRow({ icon, label, value, highlight, statusColor }: {
  icon: React.ReactNode; label: string; value: string; highlight?: boolean; statusColor?: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="flex items-center gap-2 text-gray-400">{icon}{label}</span>
      <span className={`font-medium text-right max-w-[55%] truncate ${highlight ? "text-orange-400 font-mono" : statusColor ?? ""}`}>{value}</span>
    </div>
  );
}
