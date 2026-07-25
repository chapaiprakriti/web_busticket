"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Bus, CheckCircle, Download, LayoutDashboard, ArrowRight } from "lucide-react";

function ConfirmedPageInner() {
  const searchParams = useSearchParams();
  const busName   = searchParams.get("busName")   || "Blue Sky Travels";
  const busType   = searchParams.get("type")      || "SUPER DELUXE";
  const from      = searchParams.get("from")      || "Kathmandu";
  const to        = searchParams.get("to")        || "Pokhara";
  const date      = searchParams.get("date")      || "";
  const departure = searchParams.get("departure") || "07:30 AM";
  const seatsStr  = searchParams.get("seats")     || "";
  const total     = searchParams.get("total")     || "0";
  const bookingRef = searchParams.get("bookingRef") || `SS-${Date.now().toString().slice(-6)}`;
  const seats     = seatsStr.split(",").filter(Boolean);

  // ── PDF download using jsPDF ──────────────────────────────────────────────
  const handleDownload = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const W = 210;
    const pad = 20;

    // ── Dark header background ────────────────────────────────────────────
    doc.setFillColor(7, 27, 56);
    doc.rect(0, 0, W, 45, "F");

    // Logo circle
    doc.setFillColor(239, 68, 68);
    doc.circle(pad + 8, 20, 8, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("SS", pad + 4.5, 23);

    // Bus name + type
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.text(busName, pad + 20, 18);

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(255, 167, 38);
    doc.text(busType, pad + 20, 25);

    // Booking ref top-right
    doc.setFontSize(8);
    doc.setTextColor(148, 163, 184);
    doc.text("TICKET ID", W - pad - 35, 16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 167, 38);
    doc.setFontSize(9);
    doc.text(bookingRef, W - pad - 35, 23);

    // Seat Sathi brand bottom of header
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    doc.text("SEAT SATHI — Your Trusted Travel Partner", pad, 38);

    // ── Route section ─────────────────────────────────────────────────────
    let y = 60;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(pad, y - 8, W - pad * 2, 30, 4, 4, "F");

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text("FROM", pad + 6, y);
    doc.text("TO", W - pad - 30, y);

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(7, 27, 56);
    doc.text(from, pad + 6, y + 12);
    doc.text(to, W - pad - 30, y + 12);

    // Arrow
    doc.setFontSize(16);
    doc.setTextColor(239, 68, 68);
    doc.text("→", W / 2 - 4, y + 11);

    // ── Details grid ──────────────────────────────────────────────────────
    y = 105;
    const col1 = pad;
    const col2 = W / 2 + 5;
    const rowH = 22;

    const drawCell = (label: string, value: string, sub: string, x: number, cy: number) => {
      doc.setFontSize(7);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(148, 163, 184);
      doc.text(label, x, cy);
      doc.setFontSize(13);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(7, 27, 56);
      doc.text(value, x, cy + 8);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(100, 116, 139);
      doc.text(sub, x, cy + 14);
    };

    // Divider
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(pad, y - 5, W - pad, y - 5);

    drawCell("JOURNEY DATE", date, `${departure} Departure`, col1, y);
    drawCell("SEATS", seatsStr || "—", `${seats.length} Seat${seats.length !== 1 ? "s" : ""} Reserved`, col2, y);

    y += rowH;
    doc.line(pad, y - 5, W - pad, y - 5);
    drawCell("TOTAL PAID", `Rs. ${Number(total).toLocaleString()}`, "All taxes included", col1, y);

    // Status with green colour
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text("STATUS", col2, y);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(22, 163, 74);
    doc.text("✔ Confirmed", col2, y + 8);

    // ── Footer bar ────────────────────────────────────────────────────────
    const footerY = 270;
    doc.setFillColor(7, 27, 56);
    doc.rect(0, footerY, W, 27, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(148, 163, 184);
    doc.text(`🔒 Secure Ticket ID: ${bookingRef}`, pad, footerY + 10);
    doc.text("Support: support@seatsathi.com", pad, footerY + 18);
    doc.setTextColor(255, 167, 38);
    doc.text("seatsathi.com", W - pad - 25, footerY + 14);

    doc.save(`SeatSathi-${bookingRef}.pdf`);
  };

  return (
    <div className="min-h-screen bg-[#071b38] flex flex-col items-center justify-center px-6 py-12">
      {/* Success icon */}
      <div className="w-20 h-20 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center mb-6">
        <CheckCircle size={44} className="text-green-400" />
      </div>

      <h1 className="text-3xl font-extrabold text-white mb-2">Booking Confirmed!</h1>
      <p className="text-gray-400 text-center max-w-sm mb-10">
        Your journey has been confirmed. Download your ticket below.
      </p>

      {/* Ticket card — single column, no QR */}
      <div className="w-full max-w-lg bg-[#0d2447] border border-white/8 rounded-3xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#0a1f3e] px-6 py-5 flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#1a3356] flex items-center justify-center">
            <Bus size={24} className="text-orange-400" />
          </div>
          <div>
            <p className="font-bold text-white text-lg">{busName}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">{busType}</span>
              <span className="text-xs text-gray-500">• {bookingRef}</span>
            </div>
          </div>
        </div>

        {/* Route */}
        <div className="px-6 py-5 border-b border-dashed border-white/10 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">FROM</p>
            <p className="text-2xl font-extrabold text-white">{from}</p>
          </div>
          <ArrowRight size={22} className="text-red-400 shrink-0" />
          <div className="text-right">
            <p className="text-xs text-gray-500 uppercase mb-1">TO</p>
            <p className="text-2xl font-extrabold text-white">{to}</p>
          </div>
        </div>

        {/* Details grid */}
        <div className="px-6 py-5 grid grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">JOURNEY DATE</p>
            <p className="font-bold text-white">{date}</p>
            <p className="text-xs text-gray-400">{departure} Departure</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">SEATS</p>
            <p className="font-bold text-white">{seatsStr || "—"}</p>
            <p className="text-xs text-gray-400">{seats.length} Seat{seats.length !== 1 ? "s" : ""} Reserved</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">TOTAL PAID</p>
            <p className="font-bold text-white text-xl">Rs. {Number(total).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase mb-1">STATUS</p>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="font-bold text-green-400">Confirmed</span>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 mt-8">
        <button onClick={handleDownload}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
          <Download size={18} /> Download Ticket (PDF)
        </button>
        <Link href="/my-trips"
          className="flex items-center gap-2 bg-[#0d2447] border border-white/15 hover:border-white/30 text-white font-bold px-8 py-3.5 rounded-xl transition-colors">
          <LayoutDashboard size={18} /> Go to My Trips
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-6 text-xs text-gray-500">
        <span>🔒 {bookingRef}</span>
        <span>support@seatsathi.com</span>
      </div>
    </div>
  );
}

export default function ConfirmedPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">Loading ticket...</div>}>
      <ConfirmedPageInner />
    </Suspense>
  );
}
