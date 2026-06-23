"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bus, User, Mail, Phone, Lock, Eye } from "lucide-react";

import {
  registerSchema,
  RegisterFormData,
} from "@/app/(auth)/_components/schema";

import { handleRegisterUser } from "@/lib/actions/auth-action";

export default function RegisterPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    setError("");

    const backendData = {
      fullName: data.fullName,
      email: data.email,
      contactNumber: data.contactNumber,
      gender: data.gender,
      password: data.password,
    };

    console.log("Sending to backend:", backendData);

    startTransition(async () => {
      try {
        const result = await handleRegisterUser(backendData);

        console.log("Register Result:", result);

        if (result.success) {
          router.push("/login");
        } else {
          setError(result.message || "Registration failed");
        }
      } catch (error: any) {
        console.error("Registration Error:", error);
        setError(error?.message || "Registration failed");
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#071b38] flex items-center justify-center text-white py-10">
      <div className="w-full max-w-[430px] text-center px-4">
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#10294f] flex items-center justify-center">
          <Bus className="text-red-500" size={24} />
        </div>

        <h1 className="text-3xl font-bold">Seat Sathi</h1>
        <p className="text-gray-400 text-xs mb-8">CREATE YOUR ACCOUNT</p>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* FULL NAME */}
            <label className="block text-left text-xs mb-2 text-gray-300">
              FULL NAME
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-2">
              <User size={16} className="mr-2 text-gray-400" />

              <input
                type="text"
                placeholder="John Doe"
                {...register("fullName")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>

            {errors.fullName && (
              <p className="text-red-400 text-xs text-left mb-4">
                {errors.fullName.message}
              </p>
            )}

            {/* EMAIL */}
            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              EMAIL ADDRESS
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-2">
              <Mail size={16} className="mr-2 text-gray-400" />

              <input
                type="email"
                placeholder="name@example.com"
                {...register("email")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>

            {errors.email && (
              <p className="text-red-400 text-xs text-left mb-4">
                {errors.email.message}
              </p>
            )}

            {/* PHONE */}
            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              PHONE NUMBER
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-2">
              <Phone size={16} className="mr-2 text-gray-400" />

              <input
                type="text"
                placeholder="+977 9800000000"
                {...register("contactNumber")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>

            {errors.contactNumber && (
              <p className="text-red-400 text-xs text-left mb-4">
                {errors.contactNumber.message}
              </p>
            )}

            {/* GENDER */}
            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              GENDER
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-2">
              <User size={16} className="mr-2 text-gray-400" />

              <select
                {...register("gender")}
                className="bg-[#06172e] outline-none w-full text-sm text-white"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            {errors.gender && (
              <p className="text-red-400 text-xs text-left mb-4">
                {errors.gender.message}
              </p>
            )}

            {/* PASSWORD */}
            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              PASSWORD
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-2">
              <Lock size={16} className="mr-2 text-gray-400" />

              <input
                type="password"
                placeholder="********"
                {...register("password")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />

              <Eye size={16} className="text-gray-400" />
            </div>

            {errors.password && (
              <p className="text-red-400 text-xs text-left mb-4">
                {errors.password.message}
              </p>
            )}

            {/* TERMS */}
            <div className="flex items-center gap-2 mb-5 mt-4">
              <input type="checkbox" defaultChecked className="w-4 h-4" />

              <span className="text-xs text-gray-400">
                I agree to the{" "}
                <span className="text-red-500 font-bold">
                  Terms & Conditions
                </span>
              </span>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold disabled:opacity-50 cursor-pointer"
            >
              {isPending ? "Signing Up..." : "Sign Up"}
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