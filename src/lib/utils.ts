import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function validatePhone(phone: string): boolean {
  // Remove all non-digit characters to count actual digits
  const digitsOnly = phone.replace(/\D/g, "");

  // Check if phone has at least 10 digits
  if (digitsOnly.length < 10) {
    return false;
  }

  const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 phone number format
  return phoneRegex.test(phone);
}

export function toTitleCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
