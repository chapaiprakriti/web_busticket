"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { handleKhaltiVerify } from "@/lib/actions/booking-action";

function KhaltiCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");
  const [message, setMessage] = useState("Verifying your payment with Khalti...");

  useEffect(() => {
    const verify = async () => {
      // Khalti sends these params on redirect
      const pidx      = searchParams.get("pidx");
      const txnId     = searchParams.get("transaction_id");
      const amount    = searchParams.get("amount");
      const khaltiStatus = searchParams.get("status");

      // Our custom params passed through return_url
      const busName   = searchParams.get("busName")   || "";
      const busType   = searchParams.get("type")      || "";
      const from      = searchParams.get("from")      || "";
      const to        = searchParams.get("to")        || "";
      const date      = searchParams.get("date")      || "";
      const departure = searchParams.get("departure") || "";
      const seatsStr  = searchParams.get("seats")     || "";
      const total     = searchParams.get("total")     || "0";
      const payloadStr = searchParams.get("payload")  || "";

      // Khalti may send status on redirect — only block obvious failures
      if (khaltiStatus && ["Canceled", "User canceled", "Expired", "Failed"].includes(khaltiStatus)) {
        setStatus("failed");
        setMessage(`Payment was ${khaltiStatus}. Please try again.`);
        return;
      }

      if (!pidx) {
        setStatus("failed");
        setMessage("No payment token received from Khalti. Please try again.");
        return;
      }

      try {
        const storedPayload = sessionStorage.getItem("khalti_booking_payload");
        let bookingData = storedPayload ? JSON.parse(storedPayload) : null;

        if (!bookingData && payloadStr) {
          bookingData = JSON.parse(decodeURIComponent(payloadStr));
        }

        if (!bookingData) {
          setStatus("failed");
          setMessage("Booking data missing. Please go back and try again.");
          return;
        }

        const result = await handleKhaltiVerify(pidx, bookingData);
        sessionStorage.removeItem("khalti_booking_payload");

        if (result.success) {
          setStatus("success");
          setMessage("Payment verified! Redirecting to your ticket...");

          const booking = result.data?.booking;
          const params = new URLSearchParams({
            busName,
            type: busType,
            from,
            to,
            date,
            departure,
            seats: seatsStr,
            total,
            bookingRef: booking?.bookingReference || "",
            bookingId:  booking?.id || "",
          });

          setTimeout(() => {
            router.push(`/book/confirmed?${params.toString()}`);
          }, 1500);
        } else {
          setStatus("failed");
          setMessage(result.message || "Payment verification failed. Please contact support.");
        }
      } catch (err: any) {
        setStatus("failed");
        setMessage(err?.message || "Something went wrong. Please contact support.");
      }
    };

    verify();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen bg-[#071b38] flex flex-col items-center justify-center px-6 text-white">
      <div className="w-full max-w-sm text-center">
        {status === "verifying" && (
          <>
            <RefreshCw size={52} className="text-purple-400 animate-spin mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-3">Verifying Payment</h1>
            <p className="text-gray-400 text-sm">{message}</p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={44} className="text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Payment Successful!</h1>
            <p className="text-gray-400 text-sm">{message}</p>
          </>
        )}

        {status === "failed" && (
          <>
            <div className="w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center mx-auto mb-6">
              <XCircle size={44} className="text-red-400" />
            </div>
            <h1 className="text-2xl font-bold mb-3">Payment Failed</h1>
            <p className="text-gray-400 text-sm mb-8">{message}</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => router.back()}
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => router.push("/my-trips")}
                className="w-full bg-[#0d2447] border border-white/15 hover:border-white/30 text-white font-bold py-3 rounded-xl transition-colors"
              >
                Go to My Trips
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function KhaltiCallbackPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">
        <RefreshCw size={32} className="animate-spin text-purple-400" />
      </div>
    }>
      <KhaltiCallbackInner />
    </Suspense>
  );
}
