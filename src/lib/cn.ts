import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Merges class lists like clsx, but also resolves conflicting Tailwind utilities
// (e.g. a caller's "max-w-2xl" correctly overrides a base "max-w-6xl") instead of
// silently concatenating both and letting Tailwind's internal stylesheet order decide.
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
