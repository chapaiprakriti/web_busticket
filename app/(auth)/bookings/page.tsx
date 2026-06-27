"use client";

import Link from "next/link";
import {
  Home,
  Ticket,
  Bell,
  User,
  Bus,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";

export default function BookingsPage() {
  return (
    return
    <main className="min-h-screen bg-[#071b38] text-white pb-24">
      {/* Header */}
      <div className="bg-[#0d2447] px-5 py-5 border-b border-[#19375f]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#10294f] flex items-center justify-center">
            <Ticket size={22} className="text-red-500" />
          </div>

          <div>
            <h1 className="text-xl font-bold">Booking</h1>
            <p className="text-gray-400 text-sm">Search and book your bus</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="px-5 py-6">
        <h2 className="text-2xl font-bold mb-1">Find Your Bus</h2>
        <p className="text-gray-400 text-sm mb-6">
          Choose route and view available buses.
        </p>

        {/* Search Card */}
        <div className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-5 mb-6">
          <label className="text-xs text-gray-400">FROM</label>
          <div className="mt-2 mb-4 bg-[#06172e] rounded-xl px-4 py-3 flex items-center gap-2">
            <MapPin size={18} className="text-orange-400" />
            <span>Kathmandu</span>
          </div>

          <label className="text-xs text-gray-400">TO</label>
          <div className="mt-2 mb-4 bg-[#06172e] rounded-xl px-4 py-3 flex items-center gap-2">
            <MapPin size={18} className="text-orange-400" />
            <span>Pokhara</span>
          </div>

          <label className="text-xs text-gray-400">DATE</label>
          <div className="mt-2 mb-5 bg-[#06172e] rounded-xl px-4 py-3 flex items-center gap-2">
            <CalendarDays size={18} className="text-orange-400" />
            <span>Today</span>
          </div>

          <button className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold">
            Search Buses
          </button>
        </div>

        {/* Available Buses */}
        <h2 className="text-lg font-bold mb-4">Available Buses</h2>

        <div className="space-y-4">
          <BusCard
            name="Greenline Bus"
            route="Kathmandu to Pokhara"
            time="07:00 AM"
            price="Rs. 1000"
          />

          <BusCard
            name="Baba Adventure Bus"
            route="Kathmandu to Pokhara"
            time="09:30 AM"
            price="Rs. 1200"
          />

          <BusCard
            name="Mountain Express"
            route="Kathmandu to Pokhara"
            time="01:00 PM"
            price="Rs. 1500"
          />
        </div>
      </section>

      {/* Correct Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d2447] border-t border-[#19375f]">
        <div className="grid grid-cols-4 h-20">
          <Link
            href="/dashboard"
            className="flex flex-col items-center justify-center text-gray-400"
          >
            <Home size={22} />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            href="/bookings"
            className="flex flex-col items-center justify-center text-orange-400"
          >
            <Ticket size={22} />
            <span className="text-xs mt-1">Booking</span>
          </Link>

          <Link
            href="/alerts"
            className="flex flex-col items-center justify-center text-gray-400"
          >
            <Bell size={22} />
            <span className="text-xs mt-1">Alerts</span>
          </Link>

          <Link
            href="/profile"
            className="flex flex-col items-center justify-center text-gray-400"
          >
            <User size={22} />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

function BusCard({
  name,
  route,
  time,
  price,
}: {
  name: string;
  route: string;
  time: string;
  price: string;
}) {
  return (
    <div className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#1b3358] flex items-center justify-center">
            <Bus size={22} className="text-orange-400" />
          </div>

          <div>
            <h3 className="font-bold">{name}</h3>
            <p className="text-xs text-gray-400">{route}</p>

            <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
              <Clock size={13} />
              <span>{time}</span>
            </div>
          </div>
        </div>

        <div className="text-right">
          <p className="font-bold text-orange-400">{price}</p>
          <button className="mt-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-xs font-bold">
            Book
          </button>
        </div>
      </div>
    </div>
  );
}