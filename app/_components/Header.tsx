"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bus, Plus, LogOut } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useState, useRef, useEffect } from "react";

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navLinks = isAuthenticated
    ? [
        { href: "/", label: "Home" },
        { href: "/book", label: "Book" },
        { href: "/my-trips", label: "My Trips" },
        { href: "/profile", label: "Profile" },
        { href: "/support", label: "Support" },
      ]
    : [
        { href: "/", label: "Home" },
        { href: "/book", label: "Book" },
        { href: "/login", label: "Sign In" },
      ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const initial = user?.fullName?.charAt(0)?.toUpperCase() || "U";
  const fullName = user?.fullName || "User";
  const email = user?.email || "";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[#0a1628]/95 backdrop-blur border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Bus size={16} className="text-white" />
          </div>
          <span className="font-bold text-white text-lg">Seat Sathi</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? "text-red-500"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/ai-chat"
            className="text-sm font-medium transition-colors text-gray-400 hover:text-white"
          >
            AI Chat
          </Link>
          <Link
            href="/ai-routes"
            className="text-sm font-medium transition-colors text-gray-400 hover:text-white"
          >
            AI Routes
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                href="/book"
                className="hidden md:flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
              >
                <Plus size={15} /> Book New Trip
              </Link>

              {/* Avatar with dropdown */}
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="w-9 h-9 rounded-full bg-[#1a2f52] hover:bg-[#243d6b] border border-white/10 hover:border-white/25 flex items-center justify-center text-white text-sm font-bold uppercase transition-all"
                  title={fullName}
                >
                  {initial}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-[#0d2447] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                    {/* User email */}
                    <div className="px-4 py-3 border-b border-white/8">
                      <p className="text-gray-400 text-xs truncate">{email}</p>
                    </div>

                    {/* Logout */}
                    <div className="py-1">
                      <button
                        onClick={() => { setDropdownOpen(false); logout(); }}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors"
                      >
                        <LogOut size={15} /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm text-gray-400 hover:text-white font-medium">
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-red-500 hover:bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-xl transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
