import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge class names with Tailwind CSS conflict resolution
 * Combines clsx for conditional classes and tailwind-merge for deduplication
 *
 * @param inputs - Class values to merge (strings, objects, arrays)
 * @returns Merged class string with Tailwind conflicts resolved
 *
 * @example
 * cn('px-2 py-1', 'px-4');              // "py-1 px-4" (px-2 overridden)
 * cn('text-red-500', { 'text-blue-500': isBlue });  // Conditional classes
 * cn(['bg-white', 'text-black']);       // Array support
 *
 * @see https://github.com/dcastil/tailwind-merge
 * @see https://github.com/lukeed/clsx
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
