import type {
    TextContent,
    HeadingContent,
    ButtonContent,
    ImageContent,
    DividerContent,
} from "@/types";

/**
 * Validates if a value is a valid hex color.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is string} True if the value is a valid hex color
 *
 * @example
 * isValidHexColor("#fff") // true
 * isValidHexColor("#ffffff") // true
 * isValidHexColor("red") // false
 */
export function isValidHexColor(value: unknown): value is string {
    if (typeof value !== "string") {
        return false;
    }

    // Allow empty for optional colors
    if (value === "") {
        return true;
    }

    // Match #fff or #ffffff format
    return /^#([A-Fa-f0-9]{3}){1,2}$/.test(value);
}

/**
 * Validates if a value is a valid URL.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is string} True if the value is a valid URL
 *
 * @example
 * isValidUrl("https://example.com") // true
 * isValidUrl("not a url") // false
 */
export function isValidUrl(value: unknown): value is string {
    if (typeof value !== "string") {
        return false;
    }

    try {
        new URL(value);
        return true;
    } catch {
        return false;
    }
}

/**
 * Validates if a value is a positive number.
 *
 * @param {unknown} value - Value to validate
 * @param {boolean} allowZero - Whether to allow zero (default: true)
 * @returns {value is number} True if the value is a positive number
 */
export function isPositiveNumber(value: unknown, allowZero = true): value is number {
    if (typeof value !== "number" || isNaN(value)) {
        return false;
    }

    return allowZero ? value >= 0 : value > 0;
}

/**
 * Validates if a value is within a specified range.
 *
 * @param {unknown} value - Value to validate
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {value is number} True if the value is within range
 */
export function isInRange(value: unknown, min: number, max: number): value is number {
    if (typeof value !== "number" || isNaN(value)) {
        return false;
    }

    return value >= min && value <= max;
}

/**
 * Validates TextContent structure.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is TextContent} True if valid text content
 */
export function isValidTextContent(value: unknown): value is TextContent {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return typeof obj.text === "string";
}

/**
 * Validates HeadingContent structure.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is HeadingContent} True if valid heading content
 */
export function isValidHeadingContent(value: unknown): value is HeadingContent {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    if (typeof obj.text !== "string") {
        return false;
    }

    // level is optional, but if present must be 1-6
    if ("level" in obj && obj.level !== undefined) {
        return (
            typeof obj.level === "number" &&
            Number.isInteger(obj.level) &&
            obj.level >= 1 &&
            obj.level <= 6
        );
    }

    return true;
}

/**
 * Validates ButtonContent structure.
 *
 * @param {unknown} value - Value to validate
 * @param {boolean} strictUrl - Whether to validate URL format (default: true)
 * @returns {value is ButtonContent} True if valid button content
 */
export function isValidButtonContent(value: unknown, strictUrl = true): value is ButtonContent {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    if (typeof obj.text !== "string") {
        return false;
    }

    if (typeof obj.url !== "string") {
        return false;
    }

    // Optionally validate URL format
    if (strictUrl && obj.url !== "") {
        return isValidUrl(obj.url);
    }

    return true;
}

/**
 * Validates ImageContent structure.
 *
 * @param {unknown} value - Value to validate
 * @param {boolean} strictUrl - Whether to validate src URL format (default: false)
 * @returns {value is ImageContent} True if valid image content
 */
export function isValidImageContent(value: unknown, strictUrl = false): value is ImageContent {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    // src is required
    if (typeof obj.src !== "string") {
        return false;
    }

    // Optionally validate URL format (can be data URL, relative path, etc.)
    if (strictUrl && obj.src !== "" && !obj.src.startsWith("data:")) {
        if (!isValidUrl(obj.src)) {
            return false;
        }
    }

    // Optional alt text
    if ("alt" in obj && obj.alt !== undefined && typeof obj.alt !== "string") {
        return false;
    }

    // Optional dimensions - must be positive numbers
    if ("width" in obj && obj.width !== undefined) {
        if (!isPositiveNumber(obj.width, false)) {
            return false;
        }
    }

    if ("height" in obj && obj.height !== undefined) {
        if (!isPositiveNumber(obj.height, false)) {
            return false;
        }
    }

    return true;
}

/**
 * Validates DividerContent structure.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is DividerContent} True if valid divider content
 */
export function isValidDividerContent(value: unknown): value is DividerContent {
    // Divider content is optional
    if (value === undefined || value === null) {
        return true;
    }

    if (typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    // Optional style
    if ("style" in obj && obj.style !== undefined) {
        const validStyles = ["solid", "dashed", "dotted"];
        return typeof obj.style === "string" && validStyles.includes(obj.style);
    }

    return true;
}
