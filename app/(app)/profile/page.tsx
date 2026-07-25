"use client";

import { useState, useTransition, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Phone, Mail, CheckCircle, Lock, Shield } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/contexts/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { ProfileUpdateFormData, profileUpdateSchema } from "@/app/(auth)/_components/schema";

export default function ProfilePage() {
  const { user, checkAuth } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
  });

  useEffect(() => {
    if (user) reset({ fullName: user.fullName ?? "", contactNumber: user.contactNumber ?? "", gender: user.gender ?? "" });
  }, [user, reset]);

  const onSubmit = (data: ProfileUpdateFormData) => {
    setError(""); setSuccess("");
    startTransition(async () => {
      const fd = new FormData();
      fd.append("fullName", data.fullName);
      fd.append("contactNumber", data.contactNumber);
      fd.append("gender", data.gender);
      const r = await handleUpdateProfile(fd);
      if (r.success) { setSuccess("Profile updated!"); await checkAuth(); }
      else setError(r.message || "Update failed");
    });
  };

  const initials = user?.fullName?.split(" ").map((w: string) => w[0]).join("").slice(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen bg-[#071b38] px-6 py-12">
      <div className="max-w-lg mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-white">My Profile</h1>
          <p className="text-gray-400 text-sm mt-1">Manage your personal information and security settings.</p>
        </div>

        <div className="bg-[#0d2447] border border-white/8 rounded-3xl p-8">
          {/* Avatar — initial letter only */}
          <div className="flex justify-center mb-7">
            <div className="w-24 h-24 rounded-2xl bg-[#1a3356] border border-white/10 flex items-center justify-center">
              <span className="text-3xl font-extrabold text-white">{initials}</span>
            </div>
          </div>

          {error && <div className="mb-4 p-3 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-sm">{error}</div>}
          {success && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/15 border border-green-500/25 text-green-400 text-sm flex items-center gap-2">
              <CheckCircle size={15} /> {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Full name */}
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-1.5">FULL NAME</label>
              <div className="flex items-center gap-3 bg-[#06172e] border border-white/8 rounded-xl px-4 py-3 focus-within:border-red-500/50 transition-colors">
                <User size={15} className="text-gray-500 shrink-0" />
                <input {...register("fullName")} placeholder="Your full name"
                  className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-600" />
              </div>
              {errors.fullName && <p className="text-red-400 text-xs mt-1">{errors.fullName.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-1.5">PHONE NUMBER</label>
              <div className="flex items-center gap-3 bg-[#06172e] border border-white/8 rounded-xl px-4 py-3 focus-within:border-red-500/50 transition-colors">
                <Phone size={15} className="text-gray-500 shrink-0" />
                <span className="text-sm text-gray-500 shrink-0">+977</span>
                <input {...register("contactNumber")} placeholder="98XXXXXXXX"
                  className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-600" />
              </div>
              {errors.contactNumber && <p className="text-red-400 text-xs mt-1">{errors.contactNumber.message}</p>}
            </div>

            {/* Email (readonly) */}
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-1.5">EMAIL ADDRESS</label>
              <div className="flex items-center gap-3 bg-[#06172e]/50 border border-white/5 rounded-xl px-4 py-3 opacity-60">
                <Mail size={15} className="text-gray-500 shrink-0" />
                <input type="email" value={user?.email ?? ""} readOnly
                  className="bg-transparent outline-none w-full text-sm text-gray-400" />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-xs text-gray-500 uppercase mb-1.5">GENDER</label>
              <div className="flex items-center gap-3 bg-[#06172e] border border-white/8 rounded-xl px-4 py-3 focus-within:border-red-500/50 transition-colors">
                <User size={15} className="text-gray-500 shrink-0" />
                <select {...register("gender")} className="bg-transparent outline-none w-full text-sm text-white">
                  <option value="" className="bg-[#06172e]">Select Gender</option>
                  <option value="male" className="bg-[#06172e]">Male</option>
                  <option value="female" className="bg-[#06172e]">Female</option>
                  <option value="other" className="bg-[#06172e]">Other</option>
                </select>
              </div>
              {errors.gender && <p className="text-red-400 text-xs mt-1">{errors.gender.message}</p>}
            </div>

            <button type="submit" disabled={isPending}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors mt-2">
              {isPending ? "Saving..." : "Edit Profile"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4 flex items-center justify-center gap-1">
            <Shield size={11} /> Member of Seat Sathi
          </p>
        </div>

        {/* Change password link */}
        <Link href="/settings"
          className="mt-4 flex items-center justify-between bg-[#0d2447] border border-white/8 hover:border-white/20 rounded-2xl px-6 py-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#1a3356] flex items-center justify-center">
              <Lock size={15} className="text-orange-400" />
            </div>
            <div>
              <p className="font-semibold text-white text-sm">Change Password</p>
              <p className="text-xs text-gray-500">Update your security settings</p>
            </div>
          </div>
          <span className="text-gray-500 text-xs">→</span>
        </Link>
      </div>
    </div>
  );
}
