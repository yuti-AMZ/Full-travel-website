import { z } from "zod";


export const signupSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  fatherName: z.string().min(3, "Father's name must be at least 3 characters"),
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string()
    .email("Invalid email")
    .refine((val) => val.endsWith("@gmail.com"), {
      message: "Only @gmail.com addresses are allowed",
    }),
  phone: z.string().regex(/^\+\d{1,3}\d{8}$/, "Must start with + and have 8 digits after country code"),
  location: z.string().min(1, "Please select a country"),
  birthday: z.string().min(1, "Birthday is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[^A-Za-z0-9]/, "Must contain one special character"),
});


export const loginSchema = z.object({

  identifier: z.string().min(1, "Username or Email is required"),
  password: z.string().min(1, "Password is required"),
});