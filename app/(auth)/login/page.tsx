"use client";

import { Bus, Mail, Lock, Eye } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-[#071b38] flex items-center justify-center text-white">
      <div className="w-full max-w-[400px] text-center">
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#10294f] flex items-center justify-center">
          <Bus className="text-red-500" size={24} />
        </div>

        <h1 className="text-3xl font-bold">Seat Sathi</h1>
        <p className="text-gray-400 text-xs mb-8">SIGN IN TO YOUR ACCOUNT</p>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">
          <label className="block text-left text-xs mb-2">EMAIL ADDRESS</label>
          <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-5">
            <Mail size={16} className="mr-2" />
            <input type="email" placeholder="name@example.com" className="bg-transparent outline-none w-full" />
          </div>

          <label className="block text-left text-xs mb-2">PASSWORD</label>
          <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-5">
            <Lock size={16} className="mr-2" />
            <input type="password" placeholder="********" className="bg-transparent outline-none w-full" />
            <Eye size={16} />
          </div>

          <button type="button" className="w-full bg-red-500 py-4 rounded-xl font-bold">
            Sign In
          </button>
        </div>

        <a href="/register" className="mt-6 inline-block text-sm text-gray-400 cursor-pointer">
          Don't have an account? <span className="text-red-500 font-bold">Sign Up</span>
        </a>
      </div>
    </div>
  );
}