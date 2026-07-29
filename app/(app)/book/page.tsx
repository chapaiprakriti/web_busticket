"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Bus, Clock, Star, Wifi, Zap, Wind, Droplets, ArrowRight, SlidersHorizontal, ChevronDown } from "lucide-react";

const ALL_BUSES = [
  { id: "b1", busName: "Blue Sky Travels", operatorName: "Blue Sky Travels", type: "SUPER DELUXE", rating: 4.8, from: "Kathmandu", to: "Pokhara", departureTime: "07:00 AM", arrivalTime: "01:30 PM", duration: "6h 30m", fare: 1200, seats: 32, amenities: ["wifi", "charging", "ac", "water"] },
  { id: "b2", busName: "Sajha Yatayat", operatorName: "Sajha Yatayat", type: "SOFA SEATER", rating: 4.5, from: "Kathmandu", to: "Pokhara", departureTime: "08:15 AM", arrivalTime: "03:15 PM", duration: "7h 0m", fare: 1500, seats: 28, amenities: ["ac", "charging", "water"] },
  { id: "b3", busName: "Mountain Express", operatorName: "Mountain Express", type: "AC COACH", rating: 4.2, from: "Kathmandu", to: "Pokhara", departureTime: "09:30 AM", arrivalTime: "03:45 PM", duration: "6h 15m", fare: 950, seats: 40, amenities: ["ac", "water"] },
  { id: "b4", busName: "Greenline Deluxe", operatorName: "Greenline Travels", type: "SUPER DELUXE", rating: 4.9, from: "Kathmandu", to: "Chitwan", departureTime: "06:00 AM", arrivalTime: "10:30 AM", duration: "4h 30m", fare: 800, seats: 36, amenities: ["wifi", "ac", "charging"] },
  { id: "b5", busName: "Nepal Yatayat", operatorName: "Nepal Bus", type: "AC COACH", rating: 4.0, from: "Kathmandu", to: "Chitwan", departureTime: "08:00 AM", arrivalTime: "12:30 PM", duration: "4h 30m", fare: 700, seats: 44, amenities: ["ac"] },
  { id: "b6", busName: "Lumbini Express", operatorName: "Lumbini Travels", type: "SOFA SEATER", rating: 4.6, from: "Kathmandu", to: "Lumbini", departureTime: "05:30 AM", arrivalTime: "12:00 PM", duration: "6h 30m", fare: 1100, seats: 30, amenities: ["wifi", "ac", "charging", "water"] },
  { id: "b7", busName: "Mustang Express", operatorName: "Mustang Travels", type: "SUPER DELUXE", rating: 4.7, from: "Pokhara", to: "Kathmandu", departureTime: "07:30 AM", arrivalTime: "01:30 PM", duration: "6h 0m", fare: 1300, seats: 32, amenities: ["wifi", "ac", "charging"] },
  { id: "b8", busName: "Biratnagar Bus", operatorName: "East Nepal Travels", type: "AC COACH", rating: 4.3, from: "Kathmandu", to: "Biratnagar", departureTime: "06:30 AM", arrivalTime: "02:30 PM", duration: "8h 0m", fare: 1800, seats: 40, amenities: ["ac", "water"] },
];

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi size={13} />,
  charging: <Zap size={13} />,
  ac: <Wind size={13} />,
  water: <Droplets size={13} />,
};
const AMENITY_LABELS: Record<string, string> = {
  wifi: "Free Wi-Fi", charging: "Charging Fan", ac: "Air Conditioned", water: "Water Bottle",
};

function BookPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fromParam = searchParams.get("from") || "Kathmandu";
  const toParam = searchParams.get("to") || "Pokhara";
  const dateParam = searchParams.get("date") || new Date().toISOString().split("T")[0];

  const [filters, setFilters] = useState({ superDeluxe: false, sofaSeater: false, acCoach: false, morning: false, night: false });
  const [sortBy, setSortBy] = useState("cheapest");

  const raw = ALL_BUSES.filter(
    (b) => b.from.toLowerCase() === fromParam.toLowerCase() && b.to.toLowerCase() === toParam.toLowerCase()
  );

  let results = [...raw];
  if (filters.superDeluxe) results = results.filter((b) => b.type === "SUPER DELUXE");
  if (filters.sofaSeater) results = results.filter((b) => b.type === "SOFA SEATER");
  if (filters.acCoach) results = results.filter((b) => b.type === "AC COACH");
  if (filters.morning) results = results.filter((b) => b.departureTime.includes("AM"));
  if (filters.night) results = results.filter((b) => b.departureTime.includes("PM"));
  if (sortBy === "cheapest") results.sort((a, b) => a.fare - b.fare);
  if (sortBy === "departure") results.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
  if (sortBy === "rating") results.sort((a, b) => b.rating - a.rating);

  const handleSelect = (bus: typeof ALL_BUSES[0]) => {
    const params = new URLSearchParams({
      busId: bus.id, busName: bus.busName, type: bus.type,
      from: bus.from, to: bus.to, date: dateParam,
      departure: bus.departureTime, arrival: bus.arrivalTime,
      fare: String(bus.fare), seats: String(bus.seats),
    });
    router.push(`/book/seats?${params.toString()}`);
  };

  const formattedDate = new Date(dateParam + "T00:00:00").toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

  return (
    <div className="min-h-screen bg-[#071b38]">
      {/* Sub-header */}
      <div className="bg-[#0a1f3e] border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-6 text-sm">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">ROUTE</p>
            <p className="font-bold text-white flex items-center gap-2">
              {fromParam} <ArrowRight size={14} className="text-red-400" /> {toParam}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">DATE</p>
            <p className="font-bold text-white flex items-center gap-2">
              <span className="text-red-400">●</span> {formattedDate}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wider">PASSENGERS</p>
            <p className="font-bold text-white">1 Adult</p>
          </div>
          <div className="ml-auto">
            <Link href={`/?from=${fromParam}&to=${toParam}`}
              className="border border-white/20 hover:border-white/40 text-white text-sm px-4 py-2 rounded-xl transition-colors">
              Modify Search
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-6">
        {/* Sidebar filters */}
        <aside className="w-52 shrink-0 hidden lg:block">
          <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-5 sticky top-24">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
              <SlidersHorizontal size={13} /> FILTERS
            </h3>

            <p className="text-xs font-semibold text-gray-300 mb-2 mt-3">BUS TYPE</p>
            {[["superDeluxe", "Super Deluxe"], ["sofaSeater", "Sofa Seater"], ["acCoach", "AC Coach"]].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2 text-sm text-gray-400 mb-2 cursor-pointer hover:text-white">
                <input type="checkbox" checked={(filters as any)[key]}
                  onChange={(e) => setFilters({ ...filters, [key]: e.target.checked })}
                  className="accent-red-500 w-3.5 h-3.5" />
                {label}
              </label>
            ))}

            <p className="text-xs font-semibold text-gray-300 mb-2 mt-4">DEPARTURE TIME</p>
            <div className="flex gap-2">
              {[["morning", "Morning"], ["night", "Night"]].map(([key, label]) => (
                <button key={key} onClick={() => setFilters({ ...filters, [key]: !(filters as any)[key] })}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${(filters as any)[key] ? "bg-red-500 text-white" : "bg-[#06172e] text-gray-400 hover:bg-[#0d2447]"}`}>
                  {label}
                </button>
              ))}
            </div>

            {/* Promo */}
            <div className="mt-6 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-5 h-5 bg-red-500 rounded flex items-center justify-center">
                  <Bus size={10} className="text-white" />
                </div>
                <p className="text-xs font-bold text-white">First Booking?</p>
              </div>
              <p className="text-xs text-gray-400 mb-2">Get 10% off on your first ticket booking with Seat Sathi.</p>
              <code className="text-xs font-bold text-red-400 bg-red-500/20 px-2 py-0.5 rounded">SATHI10</code>
            </div>
          </div>
        </aside>

        {/* Results */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-400">
              Showing <span className="text-white font-bold">{results.length}</span> available buses
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Sort by:</span>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#0d2447] border border-white/10 rounded-lg px-3 py-1.5 text-white text-sm outline-none">
                <option value="cheapest">Cheapest Price</option>
                <option value="departure">Departure Time</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          {results.length === 0 ? (
            <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-16 text-center">
              <Bus size={48} className="mx-auto mb-4 text-gray-600" />
              <p className="text-lg font-bold text-gray-400">No buses found for this route</p>
              <p className="text-sm text-gray-500 mt-1">Try a different route or date</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((bus) => (
                <div key={bus.id} className="bg-[#0d2447] border border-white/8 rounded-2xl overflow-hidden hover:border-white/20 transition-colors">
                  <div className="p-5">
                    <div className="flex items-start gap-4">
                      {/* Bus icon */}
                      <div className="w-14 h-14 rounded-xl bg-[#1a3356] flex items-center justify-center shrink-0">
                        <Bus size={26} className="text-orange-400" />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-bold text-white text-lg">{bus.busName}</h3>
                              <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full font-semibold">
                                {bus.type}
                              </span>
                            </div>
                            <div className="flex items-center gap-1 mt-0.5">
                              <Star size={12} className="text-yellow-400 fill-yellow-400" />
                              <span className="text-sm text-yellow-400 font-semibold">{bus.rating}</span>
                              <span className="text-xs text-gray-500 ml-1">{bus.from.toUpperCase()}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-gray-500 uppercase">STARTING FROM</p>
                            <p className="text-2xl font-extrabold text-white">Rs. {bus.fare.toLocaleString()}</p>
                            <button onClick={() => handleSelect(bus)}
                              className="mt-2 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-1 ml-auto transition-colors">
                              Select Seats <ArrowRight size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Times */}
                        <div className="flex items-center gap-4 mt-3">
                          <div>
                            <p className="text-xl font-bold text-white">{bus.departureTime}</p>
                            <p className="text-xs text-gray-500">{bus.from}</p>
                          </div>
                          <div className="flex-1 flex flex-col items-center">
                            <p className="text-xs text-gray-500 mb-1">{bus.duration}</p>
                            <div className="w-full flex items-center gap-1">
                              <div className="flex-1 h-px bg-[#19375f]" />
                              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                                <Bus size={8} className="text-white" />
                              </div>
                              <div className="flex-1 h-px bg-[#19375f]" />
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-white">{bus.arrivalTime}</p>
                            <p className="text-xs text-gray-500">{bus.to}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Amenities row */}
                  <div className="border-t border-white/5 px-5 py-3 flex items-center gap-4">
                    {bus.amenities.map((a) => (
                      <span key={a} className="flex items-center gap-1.5 text-xs text-gray-400">
                        <span className="text-gray-500">{AMENITY_ICONS[a]}</span>
                        {AMENITY_LABELS[a]}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              <button className="w-full py-4 text-sm text-gray-400 hover:text-white border border-white/8 rounded-2xl hover:border-white/20 transition-colors font-medium">
                LOAD MORE RESULTS
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">Loading...</div>}>
      <BookPageInner />
    </Suspense>
  );
}
