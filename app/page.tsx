"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bus, ArrowRight, Zap, Shield, Headphones,
  ChevronRight, Star, MapPin, Calendar,
} from "lucide-react";
import Header from "@/app/_components/Header";
import Footer from "@/app/_components/Footer";

const CITIES = ["Kathmandu", "Pokhara", "Chitwan", "Butwal", "Biratnagar", "Dharan", "Birgunj", "Mustang", "Lumbini", "Baglung"];

const POPULAR_ROUTES = [
  { from: "KTM", fromFull: "Kathmandu", to: "Pokhara", price: 1200, label: "SCENIC ROUTE" },
  { from: "KTM", fromFull: "Kathmandu", to: "Mustang", price: 2500, label: "POPULAR BUS" },
  { from: "KTM", fromFull: "Kathmandu", to: "Lumbini", price: 1500, label: "CULTURAL BUS" },
  { from: "KTM", fromFull: "Kathmandu", to: "Biratnagar", price: 1800, label: "INDUSTRIAL EXPRESS" },
];

const FEATURES = [
  { icon: <Zap size={22} className="text-red-400" />, title: "Instant Booking", desc: "Book your tickets in under 2 minutes with our seamless checkout process." },
  { icon: <Shield size={22} className="text-red-400" />, title: "Secure Payments", desc: "All transactions are encrypted and secured using banking-grade security." },
  { icon: <Headphones size={22} className="text-red-400" />, title: "24/7 Support", desc: "Our dedicated support team is always here to help you with your journey." },
];

export default function LandingPage() {
  const router = useRouter();
  const [from, setFrom] = useState("Kathmandu");
  const [to, setTo] = useState("Pokhara");
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (from === to) return;
    router.push(`/book?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&date=${date}`);
  };

  return (
    <div className="min-h-screen bg-[#071b38] text-white flex flex-col">
      <Header />

      {/* ── Hero ── */}
      <section className="relative flex-1 flex flex-col items-center justify-center px-6 pt-20 pb-32 overflow-hidden">
        {/* Background gradient blobs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-xs text-gray-400 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            TRAVEL SAFE ACROSS NEPAL
          </div>

          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            Your Trusted Travel<br />
            <span className="text-red-500">Partner</span> for Every Mile.
          </h1>

          <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto">
            Experience the most comfortable bus travel experience in Nepal. Book tickets
            instantly with live seat selection and real-time tracking.
          </p>

          {/* Search form */}
          <form onSubmit={handleSearch}
            className="bg-[#0d2447]/80 backdrop-blur border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row gap-3 max-w-2xl mx-auto shadow-2xl">
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-gray-500 mb-1 text-left px-1">FROM</label>
              <div className="flex items-center gap-2 bg-[#06172e] rounded-xl px-3 py-2.5">
                <MapPin size={15} className="text-gray-500 shrink-0" />
                <select value={from} onChange={(e) => setFrom(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-white font-medium">
                  {CITIES.map((c) => <option key={c} value={c} className="bg-[#0d2447]">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="hidden md:flex items-end pb-3">
              <div className="w-8 h-8 rounded-full bg-[#19375f] flex items-center justify-center">
                <ArrowRight size={14} className="text-gray-400" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <label className="block text-xs text-gray-500 mb-1 text-left px-1">TO</label>
              <div className="flex items-center gap-2 bg-[#06172e] rounded-xl px-3 py-2.5">
                <MapPin size={15} className="text-gray-500 shrink-0" />
                <select value={to} onChange={(e) => setTo(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-white font-medium">
                  {CITIES.map((c) => <option key={c} value={c} className="bg-[#0d2447]">{c}</option>)}
                </select>
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <label className="block text-xs text-gray-500 mb-1 text-left px-1">DEPARTURE DATE</label>
              <div className="flex items-center gap-2 bg-[#06172e] rounded-xl px-3 py-2.5">
                <Calendar size={15} className="text-gray-500 shrink-0" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="bg-transparent outline-none w-full text-sm text-white font-medium" />
              </div>
            </div>

            <div className="flex items-end">
              <button type="submit"
                className="w-full md:w-auto bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-3 rounded-xl flex items-center gap-2 justify-center transition-colors whitespace-nowrap">
                Search Buses <ArrowRight size={16} />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="bg-[#071b38] px-6 pb-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-[#0d2447]/60 border border-white/8 rounded-2xl p-6 hover:border-red-500/30 transition-colors">
              <div className="w-11 h-11 rounded-xl bg-red-500/15 flex items-center justify-center mb-4">{f.icon}</div>
              <h3 className="font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Popular Routes ── */}
      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Popular Routes</h2>
              <p className="text-gray-400 text-sm mt-1">Discover trending destinations from your location.</p>
            </div>
            <Link href="/book" className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300 font-medium">
              View All Routes <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {POPULAR_ROUTES.map((r) => (
              <Link key={r.to}
                href={`/book?from=${encodeURIComponent(r.fromFull)}&to=${encodeURIComponent(r.to)}&date=${date}`}
                className="bg-[#0d2447] border border-white/8 rounded-2xl p-5 hover:border-red-500/40 hover:bg-[#0f2850] transition-all group">
                <p className="text-xs text-gray-500 font-semibold mb-3 tracking-wider">{r.label}</p>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-white text-lg">{r.from}</span>
                  <ArrowRight size={14} className="text-gray-500" />
                  <span className="font-bold text-white text-lg">{r.to}</span>
                </div>
                <p className="text-xs text-gray-500 mb-4">Starts from</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-orange-400">Rs. {r.price.toLocaleString()}</span>
                  <div className="w-8 h-8 rounded-full bg-[#19375f] group-hover:bg-red-500 flex items-center justify-center transition-colors">
                    <ArrowRight size={14} className="text-white" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#0d2447]/50 border-y border-white/5 px-6 py-16 mb-0">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[["50,000+", "Happy Travelers"], ["200+", "Bus Operators"], ["50+", "Routes"], ["4.8★", "App Rating"]].map(([val, label]) => (
            <div key={label}>
              <p className="text-3xl font-extrabold text-white mb-1">{val}</p>
              <p className="text-gray-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
