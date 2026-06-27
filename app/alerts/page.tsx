"use client";

import Link from "next/link";
import {
  Home,
  Ticket,
  Bell,
  User,
  Bus,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";
react

export default function AlertsPage() {
  return
  return (
    <main className="min-h-screen bg-[#071b38] text-white pb-24">
      <div className="bg-[#0d2447] px-5 py-5 border-b border-[#19375f]">
        <h1 className="text-xl font-bold">Alerts</h1>
        <p className="text-gray-400 text-sm">Your travel notifications</p>
      </div>

      <section className="px-5 py-6">
        <div className="space-y-5">
          <AlertCard
            icon={<Bell size={22} className="text-orange-400" />}
            title="Bus Reminder"
            message="Your bus from Kathmandu to Pokhara leaves at 07:00 AM."
            time="Today"
            bg="bg-orange-400/20"
          />

          <AlertCard
            icon={<CheckCircle size={22} className="text-green-500" />}
            title="Booking Confirmed"
            message="Your seat booking has been confirmed successfully."
            time="1 hour ago"
            bg="bg-green-500/20"
          />

          <AlertCard
            icon={<AlertTriangle size={22} className="text-red-500" />}
            title="Payment Pending"
            message="Please complete your payment to confirm your selected seat."
            time="Yesterday"
            bg="bg-red-500/20"
          />
        </div>
      </section>

      <BottomNav active="alerts" />
    </main>
  );
}

function AlertCard({
  icon,
  title,
  message,
  time,
  bg,
}: {
  icon: React.ReactNode;
  title: string;
  message: string;
  time: string;
  bg: string;
}) {
  return (
    <div className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-5">
      <div className="flex gap-4">
        <div className={`w-12 h-12 rounded-full ${bg} flex items-center justify-center`}>
          {icon}
        </div>

        <div>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-sm text-gray-400 mt-1">{message}</p>
          <p className="text-xs text-gray-500 mt-3">{time}</p>
        </div>
      </div>
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