"use client";

import Link from "next/link";
import {
  Home,
  Ticket,
  Bell,
  User,
  Bus,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#071b38] flex items-center justify-center text-white">
        Please log in to view your dashboard.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#071b38] text-white pb-24">
      <div className="bg-[#0d2447] px-5 py-5 border-b border-[#19375f]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Seat Sathi</h1>
            <p className="text-gray-400 text-sm">
              Welcome, {user.fullName || user.email}
            </p>
          </div>

          <button
            onClick={logout}
            className="w-10 h-10 rounded-full bg-[#10294f] flex items-center justify-center"
          >
            <LogOut size={18} className="text-red-500" />
          </button>
        </div>
      </div>

      <main className="px-5 py-6">
        <h2 className="text-2xl font-bold mb-1">Where are you going?</h2>
        <p className="text-gray-400 text-sm mb-6">
          Search and book your bus ticket easily.
        </p>

        <div className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-5 mb-6">
          <div className="mb-4">
            <p className="text-gray-400 text-xs mb-1">FROM</p>
            <div className="bg-[#06172e] rounded-xl px-4 py-3">
              Kathmandu
            </div>
          </div>

          <div className="mb-4">
            <p className="text-gray-400 text-xs mb-1">TO</p>
            <div className="bg-[#06172e] rounded-xl px-4 py-3">
              Pokhara
            </div>
          </div>

          <Link
            href="/booking"
            className="block text-center w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold"
          >
            Search Buses
          </Link>
        </div>

        <div className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-4 mb-5">
          <p className="text-gray-400 text-sm mb-3">Popular Route</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#1b3358] flex items-center justify-center">
                <Bus size={22} className="text-orange-400" />
              </div>

              <div>
                <h3 className="font-bold">Kathmandu - Pokhara</h3>
                <p className="text-gray-400 text-xs">
                  Starting from Rs. 1000
                </p>
              </div>
            </div>

            <Link
              href="/booking"
              className="w-9 h-9 rounded-full bg-[#2d2b34] flex items-center justify-center"
            >
              <ChevronRight size={20} className="text-orange-400" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <Link
            href="/booking"
            className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-4"
          >
            <Ticket size={24} className="text-orange-400 mb-3" />
            <h3 className="font-bold">Booking</h3>
            <p className="text-xs text-gray-400">Book ticket</p>
          </Link>

          <Link
            href="/alerts"
            className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-4"
          >
            <Bell size={24} className="text-orange-400 mb-3" />
            <h3 className="font-bold">Alerts</h3>
            <p className="text-xs text-gray-400">Notifications</p>
          </Link>

          <Link
            href="/profile"
            className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-4"
          >
            <User size={24} className="text-orange-400 mb-3" />
            <h3 className="font-bold">Profile</h3>
            <p className="text-xs text-gray-400">Update details</p>
          </Link>
        </div>
      </main>

      <BottomNav active="home" />
    </div>
  );
}

function BottomNav({ active }: { active: "home" | "booking" | "alerts" | "profile" }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0d2447] border-t border-[#19375f]">
      <div className="grid grid-cols-4 h-20">
        <Link href="/dashboard" className={`flex flex-col items-center justify-center ${active === "home" ? "text-orange-400" : "text-gray-400"}`}>
          <Home size={22} />
          <span className="text-xs mt-1">Home</span>
        </Link>

        <Link href="/booking" className={`flex flex-col items-center justify-center ${active === "booking" ? "text-orange-400" : "text-gray-400"}`}>
          <Ticket size={22} />
          <span className="text-xs mt-1">Booking</span>
        </Link>

        <Link href="/alerts" className={`flex flex-col items-center justify-center ${active === "alerts" ? "text-orange-400" : "text-gray-400"}`}>
          <Bell size={22} />
          <span className="text-xs mt-1">Alerts</span>
        </Link>

        <Link href="/profile" className={`flex flex-col items-center justify-center ${active === "profile" ? "text-orange-400" : "text-gray-400"}`}>
          <User size={22} />
          <span className="text-xs mt-1">Profile</span>
        </Link>
      </div>
    </div>
  );
}