import { isValidUrl } from "./type-guards";

/**
 * Sanitizes and normalizes a numeric input.
 *
 * Converts string inputs to numbers, handles NaN, and enforces min/max bounds.
 *
 * @param {unknown} value - Value to sanitize
 * @param {Object} options - Sanitization options
 * @param {number} options.min - Minimum allowed value
 * @param {number} options.max - Maximum allowed value
 * @param {number} options.default - Default value if invalid
 * @returns {number} Sanitized number
 *
 * @example
 * sanitizeNumber("42") // 42
 * sanitizeNumber("invalid", { default: 0 }) // 0
 * sanitizeNumber(150, { min: 0, max: 100 }) // 100
 */
export function sanitizeNumber(
    value: unknown,
    options: { min?: number; max?: number; default?: number } = {}
): number {
    const { min = -Infinity, max = Infinity, default: defaultValue = 0 } = options;

    // Convert to number
    let num: number;

    if (typeof value === "number") {
        num = value;
    } else if (typeof value === "string") {
        num = parseFloat(value);
    } else {
        return defaultValue;
    }

    // Handle NaN
    if (isNaN(num)) {
        return defaultValue;
    }

    // Enforce bounds
    if (num < min) {
        return min;
    }

    if (num > max) {
        return max;
    }

    return num;
}

/**
 * Sanitizes and validates a hex color.
 *
 * Converts various color formats to hex and validates format.
 *
 * @param {unknown} value - Value to sanitize
 * @param {string} defaultValue - Default color if invalid
 * @returns {string} Sanitized hex color
 *
 * @example
 * sanitizeHexColor("#fff") // "#ffffff"
 * sanitizeHexColor("invalid", "#000000") // "#000000"
 */
export function sanitizeHexColor(value: unknown, defaultValue = "#000000"): string {
    if (typeof value !== "string") {
        return defaultValue;
    }

    // Allow empty for optional colors
    if (value === "") {
        return "";
    }

    // Normalize 3-char hex to 6-char
    if (/^#([A-Fa-f0-9]{3})$/.test(value)) {
        const [, rgb] = value.match(/^#([A-Fa-f0-9]{3})$/) || [];
        return `#${rgb
            .split("")
            .map((char) => char + char)
            .join("")}`;
    }

    // Validate 6-char hex
    if (/^#([A-Fa-f0-9]{6})$/.test(value)) {
        return value.toLowerCase();
    }

    return defaultValue;
}

/**
 * Sanitizes a URL string.
 *
 * Adds protocol if missing and validates format.
 *
 * @param {unknown} value - Value to sanitize
 * @param {string} defaultValue - Default URL if invalid
 * @returns {string} Sanitized URL
 *
 * @example
 * sanitizeUrl("example.com") // "https://example.com"
 * sanitizeUrl("invalid url", "") // ""
 */
export function sanitizeUrl(value: unknown, defaultValue = ""): string {
    if (typeof value !== "string") {
        return defaultValue;
    }

    const trimmed = value.trim();

    // Empty is OK for optional URLs
    if (trimmed === "") {
        return "";
    }

    // Add protocol if missing
    if (!trimmed.startsWith("http://") && !trimmed.startsWith("https://")) {
        const withProtocol = `https://${trimmed}`;
        if (isValidUrl(withProtocol)) {
            return withProtocol;
        }
    }

    // Validate URL
    if (isValidUrl(trimmed)) {
        return trimmed;
    }

    return defaultValue;
}

/**
 * Sanitizes a string input.
 *
 * Trims whitespace and enforces max length.
 *
 * @param {unknown} value - Value to sanitize
 * @param {Object} options - Sanitization options
 * @param {number} options.maxLength - Maximum allowed length
 * @param {string} options.default - Default value if invalid
 * @returns {string} Sanitized string
 *
 * @example
 * sanitizeString("  hello  ") // "hello"
 * sanitizeString("long string", { maxLength: 5 }) // "long "
 */
export function sanitizeString(
    value: unknown,
    options: { maxLength?: number; default?: string } = {}
): string {
    const { maxLength = Infinity, default: defaultValue = "" } = options;

    if (typeof value !== "string") {
        return defaultValue;
    }

    let sanitized = value.trim();

    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    return sanitized;
}
