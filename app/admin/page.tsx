"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Users, ShieldCheck, UserCheck, RefreshCw, ArrowRight } from "lucide-react";
import { handleAdminGetUsers } from "@/lib/actions/booking-action";

type Meta = { total: number; page: number; limit: number; totalPages: number };

export default function AdminDashboardPage() {
  const [meta, setMeta] = useState<Meta | null>(null);
  const [adminCount, setAdminCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadStats = async () => {
    setLoading(true);
    const result = await handleAdminGetUsers({ page: 1, limit: 100 });
    if (result.success) {
      const users = result.data as any[];
      setMeta(result.meta as Meta);
      setAdminCount(users.filter((u) => u.role === "admin").length);
      setUserCount(users.filter((u) => u.role !== "admin").length);
    }
    setLoading(false);
  };

  useEffect(() => { loadStats(); }, []);

  const stats = [
    {
      label: "Total Users",
      value: meta?.total ?? "—",
      icon: Users,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Regular Users",
      value: userCount,
      icon: UserCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Admins",
      value: adminCount,
      icon: ShieldCheck,
      color: "text-blue-400",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      {/* Welcome banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d2447] via-[#10294f] to-[#071b38] border border-[#19375f] px-8 py-8 mb-8 shadow-xl">
        <div className="flex items-center gap-2 text-xs uppercase text-orange-300 mb-2">
          <ShieldCheck size={14} className="text-orange-400" />
          Administrator Panel
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Welcome, Admin</h1>
        <p className="text-gray-400 text-sm">
          Manage users, monitor the system, and keep everything running smoothly.
        </p>
      </div>

      {/* Stats */}
      {loading ? (
        <div className="flex items-center gap-3 text-gray-400 py-10">
          <RefreshCw size={20} className="animate-spin" /> Loading stats...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {stats.map(({ label, value, icon: Icon, color, bg }) => (
            <div
              key={label}
              className={`rounded-2xl border p-6 flex items-center gap-4 ${bg}`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon size={24} className={color} />
              </div>
              <div>
                <p className="text-3xl font-extrabold text-white">{value}</p>
                <p className="text-xs text-gray-400 mt-0.5">{label}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quick action */}
      <div className="rounded-2xl bg-[#0d2447] border border-[#19375f] p-6 flex items-center justify-between">
        <div>
          <h2 className="text-white font-bold text-lg mb-1">User Management</h2>
          <p className="text-gray-400 text-sm">View, add, edit, and delete user accounts.</p>
        </div>
        <Link
          href="/admin/users"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-xl text-sm transition-colors"
        >
          Manage Users <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
