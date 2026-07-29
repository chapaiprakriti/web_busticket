"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bus, Mail, Lock, Eye, EyeOff, User, Phone, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

import { RegisterFormData, registerSchema } from "@/app/(auth)/_components/schema";
import { handleRegisterUser } from "@/lib/actions/auth-action";

export default function RegisterForm() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const result = await handleRegisterUser(data);

        if (result.success) {
          setSuccess("Account created! Redirecting to login...");
          setTimeout(() => router.push("/login"), 1500);
        } else {
          setError(result.message || "Registration failed");
        }
      } catch (err: any) {
        setError(err?.message || "Registration failed");
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#071b38] flex items-center justify-center text-white py-10">
      <div className="w-full max-w-[420px] text-center px-4">
        {/* Logo */}
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#10294f] flex items-center justify-center">
          <Bus className="text-red-500" size={24} />
        </div>
        <h1 className="text-3xl font-bold">Seat Sathi</h1>
        <p className="text-gray-400 text-xs mb-8">CREATE YOUR ACCOUNT</p>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm text-left">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-400 text-sm text-left">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="text-left">
            {/* Full Name */}
            <label className="block text-xs mb-2 text-gray-300">FULL NAME</label>
            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1">
              <User size={16} className="mr-2 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="John Doe"
                {...register("fullName")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>
            {errors.fullName && (
              <p className="text-red-400 text-xs mb-3">{errors.fullName.message}</p>
            )}

            {/* Email */}
            <label className="block text-xs mb-2 mt-4 text-gray-300">EMAIL ADDRESS</label>
            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1">
              <Mail size={16} className="mr-2 text-gray-400 shrink-0" />
              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mb-3">{errors.email.message}</p>
            )}

            {/* Contact Number */}
            <label className="block text-xs mb-2 mt-4 text-gray-300">PHONE NUMBER</label>
            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1">
              <Phone size={16} className="mr-2 text-gray-400 shrink-0" />
              <input
                type="tel"
                placeholder="98XXXXXXXX"
                {...register("contactNumber")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>
            {errors.contactNumber && (
              <p className="text-red-400 text-xs mb-3">{errors.contactNumber.message}</p>
            )}

            {/* Gender */}
            <label className="block text-xs mb-2 mt-4 text-gray-300">GENDER</label>
            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1 relative">
              <User size={16} className="mr-2 text-gray-400 shrink-0" />
              <select
                {...register("gender")}
                className="bg-transparent outline-none w-full text-sm text-white appearance-none cursor-pointer"
              >
                <option value="" className="bg-[#06172e]">Select Gender</option>
                <option value="male" className="bg-[#06172e]">Male</option>
                <option value="female" className="bg-[#06172e]">Female</option>
                <option value="other" className="bg-[#06172e]">Other</option>
              </select>
              <ChevronDown size={14} className="text-gray-400 shrink-0" />
            </div>
            {errors.gender && (
              <p className="text-red-400 text-xs mb-3">{errors.gender.message}</p>
            )}

            {/* Password */}
            <label className="block text-xs mb-2 mt-4 text-gray-300">PASSWORD</label>
            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1">
              <Lock size={16} className="mr-2 text-gray-400 shrink-0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Min. 6 characters"
                {...register("password")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="ml-2 text-gray-400"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mb-3">{errors.password.message}</p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold mt-6 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Creating Account..." : "Create Account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Already have an account?{" "}
          <Link href="/login" className="text-red-500 font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
