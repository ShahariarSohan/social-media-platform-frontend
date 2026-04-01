import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.email("Invalid email format"),

  password: z
    .string({
      error: "Password is required",
    })
    .min(6, "Password must be at least 6 characters"),
});

export const registerValidationSchema = z.object({
  email: z.email("Invalid email format"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  bio: z.string().max(200).optional(),
  avatar: z.string().optional(),
});
export const updateMyProfileZodSchema = z.object({
  bio: z.string().max(200).optional(),
  avatar: z.string().optional(),
});
