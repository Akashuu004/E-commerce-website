
/**
 * A utility function to merge class names together
 * @param {string[]} inputs - Array of class strings to be merged
 * @returns {string} - Combined class string
 */
export function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}
