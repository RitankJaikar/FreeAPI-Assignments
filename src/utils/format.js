/**
 * Format ISO 8601 date string to readable format
 * @param {string} dateString - ISO date string (e.g., "2023-07-18T12:33:40Z")
 * @returns {string} Formatted date (e.g., "Jul 18, 2023")
 */
export const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/**
 * Parse ISO 8601 duration to readable format
 * @param {string} duration - ISO duration string (e.g., "PT8M45S")
 * @returns {string} Formatted duration (e.g., "8m 45s")
 */
export const formatDuration = (duration) => {
  if (!duration) return "";

  const regex = /PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/;
  const matches = duration.match(regex);

  if (!matches) return duration;

  const hours = matches[1] ? parseInt(matches[1], 10) : 0;
  const minutes = matches[2] ? parseInt(matches[2], 10) : 0;
  const seconds = matches[3] ? parseInt(matches[3], 10) : 0;

  const parts = [];
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (seconds > 0) parts.push(`${seconds}s`);

  return parts.length > 0 ? parts.join(" ") : "0s";
};

/**
 * Format number with commas
 * @param {number} num - Number to format
 * @returns {string} Formatted number (e.g., "1,234,567")
 */
export const formatNumber = (num) => {
  if (!num) return "0";
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} length - Maximum length
 * @returns {string} Truncated text with ellipsis
 */
export const truncateText = (text, length = 180) => {
  if (!text) return "";
  if (text.length <= length) return text;
  return `${text.slice(0, length)}...`;
};
