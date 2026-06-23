"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Home, Ticket, Bell, User, Lock } from "lucide-react";

import {
  passwordUpdateSchema,
  PasswordUpdateFormData,
} from "@/app/(auth)/_components/schema";

import { handleUpdatePassword } from "@/lib/actions/auth-action";

export default function SettingsPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const onSubmit = (data: PasswordUpdateFormData) => {
    setSuccess("");
    setError("");

    startTransition(async () => {
      try {
        const result = await handleUpdatePassword(data);

        if (result.success) {
          setSuccess("Password updated successfully!");
          reset();
        } else {
          setError(result.message || "Password update failed");
        }
      } catch (err: any) {
        setError(err?.message || "Password update failed");
      }
    });
  };

  return (
    <main className="min-h-screen bg-[#071b38] text-white pb-24">
      <div className="bg-[#0d2447] px-5 py-5 border-b border-[#19375f]">
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-gray-400 text-sm">Change your password</p>
      </div>

      <section className="px-5 py-6">
        <div className="bg-[#0d2447] border border-[#19375f] rounded-2xl p-6">
          <div className="w-16 h-16 rounded-2xl bg-[#10294f] flex items-center justify-center mx-auto mb-4">
            <Lock size={30} className="text-orange-400" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-1">
            Update Password
          </h2>
          <p className="text-gray-400 text-sm text-center mb-6">
            Enter your current and new password.
          </p>

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-400 text-sm text-center">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-left text-xs mb-2 text-gray-300">
              CURRENT PASSWORD
            </label>
            <input
              type="password"
              placeholder="Current password"
              {...register("currentPassword")}
              className="w-full bg-[#06172e] rounded-xl px-4 py-3 mb-2 outline-none text-sm"
            />
            {errors.currentPassword && (
              <p className="text-red-400 text-xs mb-4">
                {errors.currentPassword.message}
              </p>
            )}

            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              NEW PASSWORD
            </label>
            <input
              type="password"
              placeholder="New password"
              {...register("newPassword")}
              className="w-full bg-[#06172e] rounded-xl px-4 py-3 mb-2 outline-none text-sm"
            />
            {errors.newPassword && (
              <p className="text-red-400 text-xs mb-4">
                {errors.newPassword.message}
              </p>
            )}

            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              CONFIRM PASSWORD
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              {...register("confirmPassword")}
              className="w-full bg-[#06172e] rounded-xl px-4 py-3 mb-2 outline-none text-sm"
            />
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mb-4">
                {errors.confirmPassword.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold mt-5 disabled:opacity-50"
            >
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </section>

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
            className="flex flex-col items-center justify-center text-gray-400"
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