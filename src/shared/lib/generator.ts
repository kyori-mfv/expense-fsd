/**
 * Unique ID generation utilities
 * Pure functions for generating unique identifiers
 */

/**
 * Generate a simple unique ID
 * Combines timestamp with random string for uniqueness
 *
 * @returns Unique ID string
 *
 * @example
 * generateUUID();  // "1730000000000-k3j5h9x2p"
 * generateUUID();  // "1730000000001-m8q2w5r7t"
 *
 * @note This is NOT a RFC4122 compliant UUID.
 * For production systems requiring true UUIDs, use the `uuid` package.
 * This is a lightweight alternative suitable for client-side IDs.
 */
export function generateUUID(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
