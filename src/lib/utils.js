/**
 * Utility function for conditionally combining CSS class names.
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
