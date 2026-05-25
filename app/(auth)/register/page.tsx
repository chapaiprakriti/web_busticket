"use client";

import { useRouter } from "next/navigation";
import { Bus, User, Mail, Phone, Lock, Eye } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-[#071b38] flex items-center justify-center text-white">

      <div className="w-full max-w-[400px] text-center">

        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#10294f] flex items-center justify-center">
          <Bus className="text-red-500" size={24} />
        </div>

        <h1 className="text-3xl font-bold">Seat Sathi</h1>
        <p className="text-gray-400 text-xs mb-8">
          CREATE ACCOUNT
        </p>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">

          <label className="block text-left text-xs mb-2">
            FULL NAME
          </label>

          <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-4">
            <User size={16} className="mr-2"/>
            <input type="text" placeholder="John Doe" className="bg-transparent outline-none w-full"/>
          </div>

          <button
            onClick={() => router.push("/login")}
            className="w-full bg-red-500 py-4 rounded-xl font-bold"
          >
            Sign Up
          </button>

        </div>

        <button
          onClick={() => router.push("/login")}
          className="mt-6 text-sm"
        >
          Already have an account?
          <span className="text-red-500 font-bold ml-1">
            Sign In
          </span>
        </button>

      </div>
    </div>
  );
}