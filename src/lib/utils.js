import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function for conditionally combining CSS class names with Tailwind merge support.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

