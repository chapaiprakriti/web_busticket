"use client";

import { Bus, LogOut, Users, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { logout, user } = useAuth();
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/users", label: "Users", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-[#071b38] flex flex-col">
      {/* Top header */}
      <header className="sticky top-0 z-50 bg-[#0a1628]/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
              <Bus size={16} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-white text-base">Seat Sathi</span>
              <span className="ml-2 text-xs bg-orange-500/20 text-orange-400 border border-orange-500/30 px-2 py-0.5 rounded-full">
                Admin
              </span>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  pathname === href
                    ? "text-orange-400"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <Icon size={15} />
                {label}
              </Link>
            ))}
          </nav>

          {/* Right — admin info + logout only */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col items-end">
              <span className="text-white text-sm font-medium">{user?.fullName || "Admin"}</span>
              <span className="text-gray-400 text-xs">{user?.email || "admin@gmail.com"}</span>
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 px-4 py-2 rounded-xl text-sm font-medium transition-all"
            >
              <LogOut size={15} />
              <span className="hidden md:inline">Log Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Page content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
