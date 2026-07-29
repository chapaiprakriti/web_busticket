"use client";

import Link from "next/link";
import { useState, useTransition } from "react";
import { Bus, Mail, Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { handleForgotPassword, handleResetPassword } from "@/lib/actions/auth-action";

type Step = "email" | "otp" | "done";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  // Step 1 — send OTP
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    startTransition(async () => {
      const result = await handleForgotPassword(email.trim().toLowerCase());
      if (result.success) {
        setSuccess(result.message || "OTP sent! Check your email.");
        setStep("otp");
      } else {
        setError(result.message || "Failed to send OTP");
      }
    });
  };

  // Step 2 — verify OTP + reset password
  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp.length < 6) {
      setError("Enter the 6-digit OTP from your email");
      return;
    }
    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    startTransition(async () => {
      const result = await handleResetPassword({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      if (result.success) {
        setSuccess("Password reset successfully!");
        setStep("done");
      } else {
        setError(result.message || "Reset failed");
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
        <p className="text-gray-400 text-xs mb-8">RESET YOUR PASSWORD</p>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">
          {/* Done state */}
          {step === "done" && (
            <div className="flex flex-col items-center gap-4 py-4">
              <CheckCircle size={48} className="text-green-400" />
              <h2 className="text-xl font-bold">Password Reset!</h2>
              <p className="text-gray-400 text-sm">
                Your password has been updated successfully.
              </p>
              <button
                onClick={() => router.push("/login")}
                className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold mt-2"
              >
                Back to Sign In
              </button>
            </div>
          )}

          {/* Step 1 — Enter email */}
          {step === "email" && (
            <form onSubmit={handleSendOtp} className="text-left">
              <h2 className="text-lg font-bold mb-1">Forgot Password?</h2>
              <p className="text-gray-400 text-sm mb-6">
                Enter your registered email. We'll send you a 6-digit OTP.
              </p>

              {error && (
                <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <label className="block text-xs mb-2 text-gray-300">EMAIL ADDRESS</label>
              <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-6">
                <Mail size={16} className="mr-2 text-gray-400 shrink-0" />
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold disabled:opacity-50"
              >
                {isPending ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2 — OTP + new password */}
          {step === "otp" && (
            <form onSubmit={handleReset} className="text-left">
              <h2 className="text-lg font-bold mb-1">Enter OTP</h2>
              <p className="text-gray-400 text-sm mb-2">
                OTP sent to <span className="text-orange-400">{email}</span>. Valid for 5 minutes.
              </p>

              {success && (
                <div className="mb-3 p-3 rounded-lg bg-green-500/20 text-green-400 text-sm">
                  {success}
                </div>
              )}
              {error && (
                <div className="mb-3 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <label className="block text-xs mb-2 text-gray-300">6-DIGIT OTP</label>
              <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-4">
                <input
                  type="text"
                  placeholder="123456"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500 tracking-widest text-center text-xl font-bold"
                />
              </div>

              <label className="block text-xs mb-2 text-gray-300">NEW PASSWORD</label>
              <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-4">
                <Lock size={16} className="mr-2 text-gray-400 shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-gray-400">
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              <label className="block text-xs mb-2 text-gray-300">CONFIRM NEW PASSWORD</label>
              <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-6">
                <Lock size={16} className="mr-2 text-gray-400 shrink-0" />
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold disabled:opacity-50"
              >
                {isPending ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={() => { setStep("email"); setError(""); setSuccess(""); }}
                className="w-full mt-3 text-sm text-gray-400 hover:text-white"
              >
                ← Resend OTP / Change email
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-sm text-gray-400 flex items-center justify-center gap-1">
          <ArrowLeft size={14} />
          <Link href="/login" className="text-red-500 font-bold">
            Back to Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}
