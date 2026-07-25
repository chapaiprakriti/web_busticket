"use client";

import { useState, useEffect, useTransition, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft, Shield, Bus } from "lucide-react";
import Link from "next/link";
import { handleCreateBooking, handleKhaltiInitiate } from "@/lib/actions/booking-action";

function PaymentPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [method, setMethod] = useState("khalti");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(7 * 60 + 22);

  const busName   = searchParams.get("busName")   || "Blue Sky Travels";
  const busType   = searchParams.get("type")      || "SUPER DELUXE";
  const from      = searchParams.get("from")      || "Kathmandu";
  const to        = searchParams.get("to")        || "Pokhara";
  const date      = searchParams.get("date")      || "";
  const departure = searchParams.get("departure") || "07:00 AM";
  const arrival   = searchParams.get("arrival")   || "01:30 PM";
  const seatsStr  = searchParams.get("seats")     || "";
  const fare      = Number(searchParams.get("fare")  || 89);
  const total     = Number(searchParams.get("total") || fare);
  const busId     = searchParams.get("busId")     || "b1";
  const seats     = seatsStr.split(",").filter(Boolean);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const t = setInterval(() => setTimeLeft((p) => p - 1), 1000);
    return () => clearInterval(t);
  }, [timeLeft]);

  const mins = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const secs = String(timeLeft % 60).padStart(2, "0");

  // ── Khalti hosted checkout — server-side initiate ────────────────────────
  const handleKhaltiPay = () => {
    setError("");
    startTransition(async () => {
      const siteUrl = window.location.origin;

      const bookingPayload = {
        origin: from, destination: to,
        operatorName: busName, busName,
        travelDate: date,
        departureTime: departure, arrivalTime: arrival,
        selectedSeats: seats,
        totalFare: total,
        paymentMethod: "khalti",
        paymentStatus: "pending" as const,
      };

      // Keep booking data in sessionStorage (return_url can get too long / corrupted)
      sessionStorage.setItem("khalti_booking_payload", JSON.stringify(bookingPayload));

      const returnUrl = `${siteUrl}/book/khalti-callback?busName=${encodeURIComponent(busName)}&type=${encodeURIComponent(busType)}&from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}&departure=${encodeURIComponent(departure)}&seats=${encodeURIComponent(seatsStr)}&total=${total}`;

      const result = await handleKhaltiInitiate({
        amount: Math.round(total * 100), // paisa
        purchase_order_id: `SS-${Date.now()}`,
        purchase_order_name: `${busName} — ${from} to ${to}`,
        return_url: returnUrl,
        website_url: siteUrl,
      });

      if (result.success && result.data?.payment_url) {
        window.location.href = result.data.payment_url;
      } else {
        setError(result.message || "Could not initiate Khalti payment. Try again.");
      }
    });
  };

  // ── Cash / eSewa (create booking directly, mark pending) ─────────────────
  const handleDirectPay = () => {
    setError("");
    startTransition(async () => {
      const result = await handleCreateBooking({
        origin: from, destination: to,
        operatorName: busName, busName,
        travelDate: date,
        departureTime: departure, arrivalTime: arrival,
        selectedSeats: seats,
        totalFare: total,
        paymentMethod: method,
        paymentStatus: "pending",
      });
      if (result.success) {
        const params = new URLSearchParams({
          busName, type: busType, from, to, date,
          departure, seats: seatsStr, total: String(total),
          bookingRef: result.data?.bookingReference || "",
          bookingId: result.data?.id || "",
        });
        router.push(`/book/confirmed?${params.toString()}`);
      } else {
        setError(result.message || "Booking failed. Please try again.");
      }
    });
  };

  const handlePay = () => {
    if (method === "khalti") handleKhaltiPay();
    else handleDirectPay();
  };

  const METHODS = [
    {
      id: "khalti",
      label: "Khalti Wallet",
      desc: "Fast and secure payment via Khalti",
      icon: "💜",
      badge: null,
    },
    {
      id: "esewa",
      label: "eSewa Wallet",
      desc: "Pay using your eSewa digital wallet account",
      icon: "💚",
      badge: "Coming soon",
    },
    {
      id: "cash",
      label: "Cash on Departure",
      desc: "Pay the conductor when boarding the bus",
      icon: "💵",
      badge: "Pending status",
    },
  ];

  const payLabel = () => {
    if (isPending) return "Processing...";
    if (method === "khalti") return `Pay Rs. ${total.toLocaleString()} via Khalti 🔒`;
    if (method === "cash")   return `Confirm Booking (Pay on Boarding)`;
    return `Confirm Booking 🔒`;
  };

  return (
    <div className="min-h-screen bg-[#071b38]">
      {/* Sub-header */}
      <div className="bg-[#0a1f3e] border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href={`/book/seats?busId=${busId}&busName=${encodeURIComponent(busName)}&from=${from}&to=${to}&date=${date}&departure=${encodeURIComponent(departure)}&arrival=${encodeURIComponent(arrival)}&fare=${fare}&type=${encodeURIComponent(busType)}`}
              className="w-9 h-9 rounded-xl bg-[#1a3356] flex items-center justify-center hover:bg-[#1f3d66] transition-colors">
              <ArrowLeft size={16} className="text-white" />
            </Link>
            <div>
              <h1 className="font-bold text-white text-lg">Secure Payment</h1>
              <p className="text-xs text-gray-400">Finalize your booking by selecting a payment method</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase">TIME TO HOLD SEAT</p>
            <p className="text-xl font-bold font-mono text-red-400">{mins}:{secs}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-8">
        {/* Payment methods */}
        <div className="flex-1">
          <h2 className="flex items-center gap-2 font-bold text-white text-lg mb-5">
            <Shield size={20} className="text-orange-400" /> Choose Payment Method
          </h2>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/20 text-red-400 text-sm">{error}</div>
          )}

          <div className="space-y-3">
            {METHODS.map((m) => (
              <div key={m.id}
                onClick={() => m.id !== "esewa" && setMethod(m.id)}
                className={`border rounded-2xl p-4 transition-all ${
                  m.id === "esewa"
                    ? "border-white/5 bg-[#0d2447]/50 opacity-50 cursor-not-allowed"
                    : method === m.id
                      ? "border-purple-500 bg-purple-500/5 cursor-pointer"
                      : "border-white/10 bg-[#0d2447] hover:border-white/25 cursor-pointer"
                }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#1a3356] flex items-center justify-center text-lg">
                      {m.icon}
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm">{m.label}</p>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                      {m.badge && (
                        <span className={`mt-1 inline-block text-xs px-2 py-0.5 rounded-full font-semibold border ${
                          m.badge === "Coming soon"
                            ? "bg-gray-500/20 text-gray-400 border-gray-500/30"
                            : "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                        }`}>
                          {m.badge}
                        </span>
                      )}
                    </div>
                  </div>
                  {m.id !== "esewa" && (
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      method === m.id ? "border-purple-500" : "border-gray-600"
                    }`}>
                      {method === m.id && <div className="w-2.5 h-2.5 rounded-full bg-purple-500" />}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Khalti test info banner */}
          {method === "khalti" && (
            <div className="mt-4 bg-purple-500/10 border border-purple-500/25 rounded-xl p-4 text-xs text-purple-300 space-y-2">
              <p className="font-bold text-purple-200">🧪 Khalti Sandbox Test</p>
              <p className="text-yellow-300">If you see <strong>Insufficient balance</strong> even with 9800000001, your backend needs <strong>YOUR</strong> secret key from <a href="https://test-admin.khalti.com" target="_blank" rel="noreferrer" className="underline">test-admin.khalti.com</a> → set as <code className="bg-purple-500/20 px-1 rounded">KHALTI_SECRET_KEY</code> on Render.</p>
              <div className="bg-purple-500/10 rounded-lg p-2 space-y-1">
                <p>• Khalti ID: <code className="bg-purple-500/20 px-1 rounded">9800000001</code> (try 9800000000–9800000005)</p>
                <p>• MPIN: <code className="bg-purple-500/20 px-1 rounded">1111</code> · OTP: <code className="bg-purple-500/20 px-1 rounded">987654</code></p>
                <p>• Pay with: <strong className="text-purple-100">Khalti Wallet</strong> only</p>
              </div>
            </div>
          )}
        </div>

        {/* Summary sidebar */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-[#0d2447] border border-white/8 rounded-2xl p-6">
            <h3 className="font-bold text-white text-lg mb-5">Booking Summary</h3>

            <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/8">
              <div className="w-12 h-12 rounded-xl bg-[#1a3356] flex items-center justify-center shrink-0">
                <Bus size={22} className="text-orange-400" />
              </div>
              <div>
                <p className="font-bold text-white">{busName}</p>
                <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">{busType}</span>
              </div>
            </div>

            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between font-bold text-white text-base">
                <span>{from}</span><span>→</span><span>{to}</span>
              </div>
              {([["Journey Date", date], ["Seats", `${seatsStr} (${seats.length})`]] as [string, string][]).map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-gray-400 text-xs">{k}</span>
                  <span className="text-white text-xs font-medium">{v}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-white/8 pt-4 mb-4 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Base Fare</span><span>Rs. {(fare * seats.length).toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Service Fee</span><span>Rs. 0</span>
              </div>
            </div>

            <div className="border-t border-white/8 pt-4 mb-5">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-400 text-sm">TOTAL PAYABLE</span>
                <span className="text-2xl font-extrabold text-white">Rs. {total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={handlePay}
              disabled={isPending || timeLeft <= 0}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors text-sm">
              {payLabel()}
            </button>

            <p className="text-center text-xs text-gray-500 mt-3 flex items-center justify-center gap-1">
              <Shield size={11} /> Secure & Encrypted
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">Loading payment...</div>}>
      <PaymentPageInner />
    </Suspense>
  );
}
