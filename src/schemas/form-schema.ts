// src/schemas/form-schema.ts
import { z } from "zod";

// Personal Information Schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters" }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phoneNumber: z.string()
    .min(10, { message: "Phone number must be at least 10 characters" })
    .optional()
    .or(z.literal("")),
  dateOfBirth: z.date().optional(),
});

// Address Schema
export const addressSchema = z.object({
  street: z.string().min(5, { message: "Street address must be at least 5 characters" }),
  city: z.string().min(2, { message: "City must be at least 2 characters" }),
  state: z.string().min(2, { message: "State must be at least 2 characters" }),
  zipCode: z.string().min(5, { message: "Zip code must be at least 5 characters" }),
  country: z.string().min(2, { message: "Country must be at least 2 characters" }),
});

// Preferences Schema
export const preferencesSchema = z.object({
  receiveUpdates: z.boolean().default(false),
  theme: z.enum(["light", "dark", "system"]).default("system"),
  notifications: z.array(z.enum(["email", "sms", "push"])).default([]),
});

// Form Schema
export const formSchema = z.object({
  personalInfo: personalInfoSchema,
  address: addressSchema,
  preferences: preferencesSchema,
});

// Simple Form Schema
export const simpleFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  agreeToTerms: z.boolean().refine(val => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});