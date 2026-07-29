"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { passwordUpdateSchema, PasswordUpdateFormData } from "@/app/(auth)/_components/schema";
import { handleUpdatePassword } from "@/lib/actions/auth-action";

export default function SettingsPage() {
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const { register, handleSubmit, reset, formState: { errors } } = useForm<PasswordUpdateFormData>({
    resolver: zodResolver(passwordUpdateSchema),
  });

  const onSubmit = (data: PasswordUpdateFormData) => {
    setSuccess(""); setError("");
    startTransition(async () => {
      const result = await handleUpdatePassword(data);
      if (result.success) { setSuccess("Password updated successfully!"); reset(); }
      else setError(result.message || "Password update failed");
    });
  };

  return (
    <div className="min-h-screen bg-[#071b38] px-6 py-12">
      <div className="max-w-lg mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/profile" className="w-9 h-9 rounded-xl bg-[#0d2447] border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
            <ArrowLeft size={16} className="text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-white">Security Settings</h1>
            <p className="text-gray-400 text-sm">Update your account password</p>
          </div>
        </div>

        <div className="bg-[#0d2447] border border-white/8 rounded-3xl p-8">
          <div className="w-14 h-14 rounded-2xl bg-[#1a3356] flex items-center justify-center mx-auto mb-6">
            <Lock size={26} className="text-orange-400" />
          </div>

          {success && (
            <div className="mb-5 p-3 rounded-xl bg-green-500/15 border border-green-500/25 text-green-400 text-sm flex items-center gap-2">
              <CheckCircle size={15} /> {success}
            </div>
          )}
          {error && (
            <div className="mb-5 p-3 rounded-xl bg-red-500/15 border border-red-500/25 text-red-400 text-sm">{error}</div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {[
              { name: "currentPassword" as const, label: "CURRENT PASSWORD", placeholder: "Current password" },
              { name: "newPassword" as const, label: "NEW PASSWORD", placeholder: "Min. 6 characters" },
              { name: "confirmPassword" as const, label: "CONFIRM PASSWORD", placeholder: "Repeat new password" },
            ].map(({ name, label, placeholder }) => (
              <div key={name}>
                <label className="block text-xs text-gray-500 uppercase mb-1.5">{label}</label>
                <input type="password" {...register(name)} placeholder={placeholder}
                  className="w-full bg-[#06172e] border border-white/8 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-red-500/50 placeholder:text-gray-600 transition-colors" />
                {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>}
              </div>
            ))}

            <button type="submit" disabled={isPending}
              className="w-full bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-bold py-4 rounded-xl transition-colors mt-2">
              {isPending ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
