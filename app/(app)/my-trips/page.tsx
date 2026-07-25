"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bus, ArrowRight, FileText, RefreshCw } from "lucide-react";
import { handleGetMyBookings } from "@/lib/actions/booking-action";

type Tab = "all" | "upcoming" | "completed";

type Booking = {
  id: string; origin: string; destination: string;
  busName: string; operatorName: string;
  travelDate: string; departureTime: string;
  selectedSeats: string[]; totalFare: number;
  status: string; paymentStatus: string;
  bookingReference: string; createdAt: string;
};

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  confirmed: { label: "CONFIRMED", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  pending: { label: "PENDING PAYMENT", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  cancelled: { label: "CANCELLED", color: "bg-red-500/20 text-red-400 border-red-500/30" },
};

export default function MyTripsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("all");
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true); setError("");
    const r = await handleGetMyBookings();
    if (r.success) setBookings(r.data || []);
    else setError(r.message || "Failed to load bookings");
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const filtered = bookings.filter((b) => {
    if (tab === "upcoming") return b.status === "pending" || b.status === "confirmed";
    if (tab === "completed") return b.status === "cancelled";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#071b38] px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-white">My Bookings</h1>
            <p className="text-gray-400 mt-1">Manage your upcoming and past journeys in one place.</p>
          </div>
          <button onClick={load} className="w-9 h-9 rounded-xl bg-[#0d2447] border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors" title="Refresh">
            <RefreshCw size={15} className="text-gray-400" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(["all", "upcoming", "completed"] as Tab[]).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold capitalize transition-colors ${tab === t ? "bg-[#0d2447] border border-white/20 text-white" : "text-gray-400 hover:text-white"}`}>
              {t === "all" ? "All Trips" : t === "upcoming" ? "Upcoming" : "Completed"}
            </button>
          ))}
        </div>

        {loading && (
          <div className="flex items-center justify-center py-20 text-gray-400 gap-3">
            <RefreshCw size={22} className="animate-spin" /> Loading bookings...
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-red-400 text-center">{error}</div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-16 text-center">
            <Bus size={48} className="mx-auto mb-4 text-gray-600" />
            <p className="text-lg font-bold text-gray-300 mb-2">No bookings yet</p>
            <p className="text-sm text-gray-500 mb-6">Start your journey today.</p>
            <Link href="/book" className="bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-3 rounded-xl transition-colors text-sm">
              Book a Bus
            </Link>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="space-y-4">
            {filtered.map((b) => {
              const statusInfo = STATUS_MAP[b.status] ?? { label: b.status.toUpperCase(), color: "bg-gray-500/20 text-gray-400 border-gray-500/30" };
              return (
                <div key={b.id} className="bg-[#0d2447] border border-white/8 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:border-white/15 transition-colors">
                  {/* Bus icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#1a3356] flex items-center justify-center shrink-0">
                    <Bus size={26} className="text-orange-400" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-bold text-white">{b.busName}</span>
                      <span className={`text-xs border px-2 py-0.5 rounded-full font-bold ${statusInfo.color}`}>
                        {statusInfo.label}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      {b.origin} <ArrowRight size={11} /> {b.destination}
                    </p>
                  </div>

                  {/* Departure */}
                  <div className="text-left sm:text-center shrink-0">
                    <p className="text-xs text-gray-500 uppercase mb-0.5">DEPARTURE</p>
                    <p className="font-bold text-white text-sm">{b.travelDate}, {b.departureTime}</p>
                  </div>

                  {/* Seats */}
                  <div className="text-left sm:text-center shrink-0">
                    <p className="text-xs text-gray-500 uppercase mb-0.5">SEATS</p>
                    <p className="font-bold text-white text-sm">{b.selectedSeats.join(", ")}</p>
                  </div>

                  {/* Action */}
                  <div className="shrink-0">
                    {b.status === "confirmed" ? (
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-xl bg-[#1a3356] flex items-center justify-center">
                          <FileText size={16} className="text-gray-400" />
                        </div>
                        <Link href={`/book/confirmed?busName=${encodeURIComponent(b.busName)}&from=${b.origin}&to=${b.destination}&date=${b.travelDate}&departure=${encodeURIComponent(b.departureTime)}&seats=${b.selectedSeats.join(",")}&total=${b.totalFare}&bookingRef=${b.bookingReference}&bookingId=${b.id}`}
                          className="bg-[#1a3356] border border-white/15 hover:border-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                          View Details
                        </Link>
                      </div>
                    ) : b.status === "pending" ? (
                      <Link href={`/book?from=${b.origin}&to=${b.destination}`}
                        className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-5 py-2 rounded-xl transition-colors">
                        Pay Now
                      </Link>
                    ) : (
                      <Link href={`/book?from=${b.origin}&to=${b.destination}`}
                        className="bg-[#1a3356] border border-white/15 hover:border-white/30 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors">
                        Book Again
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
