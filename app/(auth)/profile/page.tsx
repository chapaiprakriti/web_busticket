"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bus, User, Phone, Camera, CheckCircle } from "lucide-react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import {
  ProfileUpdateFormData,
  profileUpdateSchema,
} from "@/app/(auth)/_components/schema";

export default function ProfilePage() {
  const { user, checkAuth } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  pof

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProfileUpdateFormData>({
    resolver: zodResolver(profileUpdateSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        fullName: user.fullName ?? "",
        contactNumber: user.contactNumber ?? "",
        gender: user.gender ?? "",
      });
    }
  }, [user, reset]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data: ProfileUpdateFormData) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("fullName", data.fullName);
        formData.append("contactNumber", data.contactNumber);
        formData.append("gender", data.gender);

        const fileInput = fileInputRef.current;

        if (fileInput?.files?.[0]) {
          formData.append("avatar", fileInput.files[0]);
        }

        const result = await handleUpdateProfile(formData);

        if (result.success) {
          setSuccess("Profile updated successfully!");
          await checkAuth();
        } else {
          setError(result.message || "Update failed");
        }
      } catch (err: any) {
        setError(err?.message || "Update failed");
      }
    });
  };

  const avatarUrl =
    previewUrl ||
    (user?.avatar
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/${user.avatar}`
      : null);

  return (
    <div className="min-h-screen w-full bg-[#071b38] flex items-center justify-center text-white py-10">
      <div className="w-full max-w-[460px] px-4">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-[#10294f] flex items-center justify-center">
            <Bus className="text-red-500" size={24} />
          </div>

          <h1 className="text-3xl font-bold">Seat Sathi</h1>
          <p className="text-gray-400 text-xs">UPDATE YOUR PROFILE</p>
        </div>

        <div className="bg-[#0d2447] p-8 rounded-2xl border border-[#19375f]">
          <div className="flex flex-col items-center mb-6">
            <div
              className="relative w-24 h-24 rounded-full bg-[#10294f] flex items-center justify-center cursor-pointer group overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={40} className="text-gray-400" />
              )}

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera size={20} className="text-white" />
              </div>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFileChange}
            />

            <p className="text-xs text-gray-400 mt-2">
              Click to change avatar
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 rounded-lg bg-green-500/20 text-green-400 text-sm flex items-center gap-2">
              <CheckCircle size={16} />
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-left text-xs mb-2 text-gray-300">
              EMAIL ADDRESS
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-4 opacity-60">
              <input
                type="email"
                value={user?.email ?? ""}
                readOnly
                className="bg-transparent outline-none w-full text-sm text-gray-400"
              />
            </div>

            <label className="block text-left text-xs mb-2 text-gray-300">
              FULL NAME
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1">
              <User size={16} className="mr-2 text-gray-400 shrink-0" />

              <input
                type="text"
                placeholder="Your full name"
                {...register("fullName")}
                className="bg-transparent outline-none w-full text-sm text-white placeholder:text-gray-500"
              />
            </div>

            {errors.fullName && (
              <p className="text-red-400 text-xs text-left mb-3">
                {errors.fullName.message}
              </p>
            )}

            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              PHONE NUMBER
            </label>

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
              <p className="text-red-400 text-xs text-left mb-3">
                {errors.contactNumber.message}
              </p>
            )}

            <label className="block text-left text-xs mb-2 mt-4 text-gray-300">
              GENDER
            </label>

            <div className="bg-[#06172e] rounded-lg flex items-center px-4 py-3 mb-1">
              <User size={16} className="mr-2 text-gray-400 shrink-0" />

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
              <p className="text-red-400 text-xs text-left mb-3">
                {errors.gender.message}
              </p>
            )}

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-red-500 hover:bg-red-600 py-4 rounded-xl font-bold mt-6 disabled:opacity-50 transition-colors"
            >
              {isPending ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>

        <p className="mt-4 text-sm text-gray-400 text-center">
          Want to change your password?{" "}
          <a href="/settings" className="text-red-500 font-bold">
            Go to Security Settings
          </a>
        </p>
      </div>
    </div>
  );
}