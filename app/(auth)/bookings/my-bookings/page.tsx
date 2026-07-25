"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Home, Ticket, Bell, User, Bus, Clock, MapPin,
  ArrowLeft, ChevronRight, RefreshCw,
} from "lucide-react";
import { handleGetMyBookings } from "@/lib/actions/booking-action";

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

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBookings = async () => {
    setLoading(true);
    setError("");
    const result = await handleGetMyBookings();
    if (result.success) {
      setBookings(result.data || []);
    } else {
      setError(result.message || "Failed to load bookings");
    }
    setLoading(false);
  };

  useEffect(() => { loadBookings(); }, []);

  return (
    <main className="min-h-screen bg-[#071b38] text-white pb-24">
      <div className="bg-[#0d2447] px-5 py-4 border-b border-[#19375f] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/bookings" className="w-9 h-9 rounded-xl bg-[#10294f] flex items-center justify-center">
            <ArrowLeft size={18} className="text-orange-400" />
          </Link>
          <div>
            <h1 className="text-xl font-bold">My Bookings</h1>
            <p className="text-gray-400 text-sm">Your travel history</p>
          </div>
        </div>
        <button onClick={loadBookings} className="w-9 h-9 rounded-xl bg-[#10294f] flex items-center justify-center">
          <RefreshCw size={16} className="text-orange-400" />
        </button>
      </div>

      <section className="px-5 py-6 max-w-xl mx-auto">
        {loading && (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <RefreshCw size={32} className="animate-spin mb-3" />
            <p>Loading your bookings...</p>
          </div>
        )}

        {!loading && error && (
          <div className="p-4 rounded-xl bg-red-500/20 text-red-400 text-sm text-center">{error}</div>
        )}

        {!loading && !error && bookings.length === 0 && (
          <div className="flex flex-col items-center py-16 text-gray-400">
            <Bus size={48} className="mb-4 opacity-30" />
            <h3 className="font-bold text-lg mb-2">No bookings yet</h3>
            <p className="text-sm text-center mb-6">Start booking your bus tickets now!</p>
            <Link href="/bookings" className="bg-red-500 hover:bg-red-600 px-6 py-3 rounded-xl font-bold text-white text-sm">
              Book Now
            </Link>
          </div>
        )}

        {!loading && !error && bookings.length > 0 && (
          <div className="space-y-4">
            {bookings.map((b) => (
              <Link key={b.id} href={`/bookings/ticket/${b.id}`}
                className="block bg-[#0d2447] border border-[#19375f] rounded-2xl p-4 hover:border-orange-500/50 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#1b3358] flex items-center justify-center shrink-0">
                      <Bus size={22} className="text-orange-400" />
                    </div>
                    <div>
                      <h3 className="font-bold">{b.busName}</h3>
                      <p className="text-xs text-gray-400">{b.operatorName}</p>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                        <MapPin size={11} />{b.origin} → {b.destination}
                      </div>
                      <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                        <Clock size={11} />{b.travelDate} · {b.departureTime}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Seats: {b.selectedSeats.join(", ")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="font-bold text-orange-400">Rs. {b.totalFare}</p>
                    <StatusBadge status={b.status} />
                    <ChevronRight size={16} className="text-gray-500 mt-2 ml-auto" />
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-[#19375f] flex justify-between text-xs text-gray-500">
                  <span>Ref: <span className="text-orange-400 font-mono">{b.bookingReference}</span></span>
                  <span>{new Date(b.createdAt).toLocaleDateString()}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <BottomNav active="bookings" />
    </main>
  );
}

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    confirmed: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    cancelled: "bg-red-500/20 text-red-400",
  };
  return (
    <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-bold ${map[status] ?? "bg-gray-500/20 text-gray-400"}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function BottomNav({ active }: { active: "home" | "bookings" | "alerts" | "profile" }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d2447] border-t border-[#19375f]">
      <div className="grid grid-cols-4 h-20">
        {[
          { href: "/dashboard", icon: <Home size={22} />, label: "Home", key: "home" },
          { href: "/bookings", icon: <Ticket size={22} />, label: "Booking", key: "bookings" },
          { href: "/alerts", icon: <Bell size={22} />, label: "Alerts", key: "alerts" },
          { href: "/profile", icon: <User size={22} />, label: "Profile", key: "profile" },
        ].map((item) => (
          <Link key={item.key} href={item.href}
            className={`flex flex-col items-center justify-center ${active === item.key ? "text-orange-400" : "text-gray-400"}`}>
            {item.icon}<span className="text-xs mt-1">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
