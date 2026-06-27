"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bus, Mail, Lock, Eye } from "lucide-react";

import { LoginFormData, loginSchema } from "@/app/(auth)/_components/schema";
import { handleLoginUser } from "@/lib/actions/auth-action";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const { checkAuth } = useAuth();

  const {
    register,
    login
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    setError("");

    startTransition(async () => {
      try {
        const result = await handleLoginUser(data);

        if (result.success) {
          await checkAuth();
          router.push("/dashboard");
        } else {
          setError(result.message || "Login failed");
        }
      } catch (error: any) {
        setError(error?.message || "Login failed");
      }
    });
  };

  return (
    <div className="min-h-screen w-full bg-[#071b38] flex items-center justify-center text-white">
      <div className="w-full max-w-[400px] text-center px-4">
        <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#10294f] flex items-center justify-center">
          <Bus className="text-red-500" size={24} />
        </div>

        <h1 className="text-3xl font-bold">Seat Sathi</h1>
        <p className="text-gray-400 text-xs mb-8">SIGN IN TO YOUR ACCOUNT</p>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-left text-xs mb-2 text-gray-300">
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

            <div className="flex items-center justify-between mb-2 mt-4">
              <label className="block text-left text-xs text-gray-300">
                PASSWORD
              </label>

              <a href="#" className="text-xs text-red-500">
                Forgot Password?
              </a>
            </div>

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

            <div className="flex items-center gap-2 mb-5 mt-4">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-xs text-gray-400">Keep me logged in</span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isPending}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold disabled:opacity-50"
            >
              {isPending ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#19375f]" />
            <span className="text-[10px] text-gray-500">OR CONTINUE WITH</span>
            <div className="flex-1 h-px bg-[#19375f]" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="bg-[#06172e] py-3 rounded-lg text-xs">Google</button>
            <button className="bg-[#06172e] py-3 rounded-lg text-xs">Apple</button>
          </div>
        </div>

        <p className="mt-6 text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-red-500 font-bold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}