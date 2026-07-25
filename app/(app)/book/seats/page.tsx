"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Wifi, Zap, Wind, Droplets, Tag } from "lucide-react";
import Link from "next/link";

// Build seat layout: 2 cols left (A,B) + aisle + 1 col right (C) + back row
function buildLayout() {
  const leftPairs = ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10"];
  const rightPairs = ["B1","B2","B3","B4","B5","B6","B7","B8","B9","B10"];
  const sideCol = ["C1","C2","C3","C4","C5","C6","C7","C8","C9","C10"];
  const back = ["D1","D2","D3","D4","D5"];
  return { leftPairs, rightPairs, sideCol, back };
}

// Randomly pre-booked seats (stable per session via simple hash)
const PRE_BOOKED = ["A2","A5","A8","B3","B6","C2","C7","D3"];

function SeatsPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const busName = searchParams.get("busName") || "Blue Sky Travels";
  const busType = searchParams.get("type") || "SUPER DELUXE";
  const from = searchParams.get("from") || "Kathmandu";
  const to = searchParams.get("to") || "Pokhara";
  const date = searchParams.get("date") || "";
  const departure = searchParams.get("departure") || "07:00 AM";
  const arrival = searchParams.get("arrival") || "01:30 PM";
  const farePerSeat = Number(searchParams.get("fare") || 89);
  const busId = searchParams.get("busId") || "b1";

  const [selected, setSelected] = useState<string[]>([]);
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const { leftPairs, rightPairs, sideCol, back } = buildLayout();

  const toggle = (seat: string) => {
    if (PRE_BOOKED.includes(seat)) return;
    setSelected((prev) => prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]);
  };

  const seatClass = (seat: string) => {
    if (PRE_BOOKED.includes(seat)) return "bg-[#2a1a1a] border border-red-900/40 text-red-900 cursor-not-allowed";
    if (selected.includes(seat)) return "bg-red-500 border border-red-400 text-white cursor-pointer";
    return "bg-[#0f2240] border border-white/15 text-gray-300 cursor-pointer hover:border-red-400/60 hover:text-white";
  };

  const Seat = ({ id }: { id: string }) => (
    <button onClick={() => toggle(id)} disabled={PRE_BOOKED.includes(id)}
      className={`w-10 h-9 rounded-lg text-xs font-bold transition-all ${seatClass(id)}`}>
      {id}
    </button>
  );

  const discount = promoApplied ? Math.floor(farePerSeat * selected.length * 0.1) : 0;
  const total = farePerSeat * selected.length - discount;

  const handleApplyPromo = () => {
    if (promo.toUpperCase() === "SATHI10") {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code");
      setPromoApplied(false);
    }
  };

  const handleProceed = () => {
    if (selected.length === 0) return;
    const params = new URLSearchParams({
      busId, busName, type: busType, from, to, date,
      departure, arrival,
      seats: selected.join(","),
      fare: String(farePerSeat),
      total: String(total),
      promo: promoApplied ? "SATHI10" : "",
    });
    router.push(`/book/payment?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-[#071b38]">
      {/* Sub-header */}
      <div className="bg-[#0a1f3e] border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href={`/book?from=${from}&to=${to}&date=${date}`}
            className="w-9 h-9 rounded-xl bg-[#1a3356] flex items-center justify-center hover:bg-[#1f3d66] transition-colors">
            <ArrowLeft size={16} className="text-white" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{busName}</span>
              <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">{busType}</span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">{date} · {from} → {to}</p>
          </div>
          <div className="ml-auto hidden md:flex items-center gap-5 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-[#0f2240] border border-white/15 inline-block" />Available</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-red-500 inline-block" />Selected</span>
            <span className="flex items-center gap-1.5"><span className="w-4 h-4 rounded bg-[#2a1a1a] border border-red-900/40 inline-block" />Booked</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Seat map */}
        <div className="flex-1">
          <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-6">
            {/* Driver */}
            <div className="flex justify-end mb-6">
              <div className="w-10 h-10 rounded-full bg-[#1a3356] flex items-center justify-center border border-white/10">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-gray-400">
                  <circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>
                </svg>
              </div>
            </div>

            {/* Seat grid */}
            <div className="flex gap-4 justify-center">
              {/* Left 2 columns */}
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  {leftPairs.map((s) => <Seat key={s} id={s} />)}
                </div>
                <div className="flex flex-col gap-2">
                  {rightPairs.map((s) => <Seat key={s} id={s} />)}
                </div>
              </div>

              {/* Aisle */}
              <div className="w-6" />

              {/* Right single column */}
              <div className="flex flex-col gap-2">
                {sideCol.map((s) => <Seat key={s} id={s} />)}
              </div>
            </div>

            {/* Back row */}
            <div className="flex justify-center gap-2 mt-4 pt-4 border-t border-white/5">
              {back.map((s) => <Seat key={s} id={s} />)}
            </div>

            {/* Amenities */}
            <div className="mt-6 pt-4 border-t border-white/5">
              <p className="text-xs text-gray-500 uppercase font-semibold mb-3">BUS AMENITIES</p>
              <div className="flex gap-5">
                {[["wifi", <Wifi size={16} />], ["charging", <Zap size={16} />], ["power", <Wind size={16} />], ["water", <Droplets size={16} />]].map(([k, icon]) => (
                  <div key={k as string} className="flex flex-col items-center gap-1 text-gray-400">
                    <div className="w-9 h-9 rounded-xl bg-[#1a3356] flex items-center justify-center">{icon as React.ReactNode}</div>
                    <span className="text-xs capitalize">{k}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Booking summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-6 sticky top-24">
            <h3 className="font-bold text-lg text-white mb-5">Booking Summary</h3>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-400">
                <span>Selected Seats</span>
                <span className="text-white font-medium">{selected.length > 0 ? selected.join(", ") : "—"}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Unit Price</span>
                <span className="text-white font-medium">Rs. {farePerSeat.toLocaleString()}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-green-400">
                  <span>Promo (SATHI10)</span>
                  <span>- Rs. {discount.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="border-t border-white/10 pt-4 mb-5">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-400 text-sm">Total Amount</span>
                <div className="text-right">
                  <p className="text-2xl font-extrabold text-white">Rs. {total.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">INCL. OF ALL TAXES</p>
                </div>
              </div>
            </div>

            {/* Promo code */}
            <div className="bg-[#06172e] border border-white/8 rounded-xl p-3 flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center shrink-0">
                <Tag size={14} className="text-white" />
              </div>
              <input value={promo} onChange={(e) => setPromo(e.target.value.toUpperCase())}
                placeholder="Promo Code"
                className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-gray-500" />
              <button onClick={handleApplyPromo}
                className="text-xs text-red-400 hover:text-red-300 font-bold shrink-0">
                {promoApplied ? "Applied ✓" : "Add"}
              </button>
            </div>
            {promoError && <p className="text-xs text-red-400 -mt-3 mb-3">{promoError}</p>}

            <button onClick={handleProceed} disabled={selected.length === 0}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors">
              Proceed to Booking <ArrowLeft size={16} className="rotate-180" />
            </button>

            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <span>🔒</span> Secure SSL 128-bit encrypted payment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SeatsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">Loading seats...</div>}>
      <SeatsPageInner />
    </Suspense>
  );
}
