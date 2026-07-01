import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.string().email("Invalid email address"),
  contactNumber: z.string().min(10, "Phone number is required"),
  gender: z.string().min(1, "Gender is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const profileUpdateSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),

  contactNumber: z.string().min(10, "Phone number must be at least 10 digits"),

  gender: z.string().min(1, "Gender is required"),
});

export type ProfileUpdateFormData = z.infer<typeof profileUpdateSchema>;

export const passwordUpdateSchema = z
  .object({
    currentPassword: z.string().min(6, "Current password is required"),

    newPassword: z.string().min(6, "New password must be at least 6 characters"),

    confirmPassword: z.string().min(6, "Please confirm your new password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type PasswordUpdateFormData = z.infer<typeof passwordUpdateSchema>;