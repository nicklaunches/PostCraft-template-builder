import type {
    Block,
    BlockStyles, // eslint-disable-line @typescript-eslint/no-unused-vars
    EmailStyles, // eslint-disable-line @typescript-eslint/no-unused-vars
    TextContent,
    HeadingContent,
    ButtonContent,
    ImageContent,
    DividerContent,
    TemplateData, // eslint-disable-line @typescript-eslint/no-unused-vars
} from "@/types";
import { BLOCK_TYPES } from "./constants";

/**
 * Validation result interface
 */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

/**
 * Validation options for customizing validation behavior
 */
export interface ValidationOptions {
    strict?: boolean; // If true, enforce stricter validation rules
    allowEmpty?: boolean; // If true, allow empty strings and zero values
}

// ============================================================================
// TYPE GUARDS & VALIDATORS
// ============================================================================

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

/**
 * Validates Block structure with content type checking.
 *
 * Performs comprehensive validation including type checking,
 * content structure validation, and style validation.
 *
 * @param {unknown} value - Value to validate
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with errors
 *
 * @example
 * const result = validateBlock(myBlock);
 * if (result.valid) {
 *   // Block is valid
 * } else {
 *   console.error(result.errors);
 * }
 */
export function validateBlock(value: unknown, options: ValidationOptions = {}): ValidationResult {
    const errors: string[] = [];

    // Basic structure validation
    if (!value || typeof value !== "object") {
        errors.push("Block must be an object");
        return { valid: false, errors };
    }

    const block = value as Record<string, unknown>;

    // Validate ID
    if (typeof block.id !== "string" || block.id.trim() === "") {
        errors.push("Block must have a non-empty string id");
    }

    // Validate type
    if (!block.type || typeof block.type !== "string") {
        errors.push("Block must have a type");
    } else if (!(BLOCK_TYPES as readonly string[]).includes(block.type)) {
        errors.push(`Invalid block type: ${block.type}`);
    }

    // Validate content exists
    if (!("content" in block)) {
        errors.push("Block must have content property");
    } else {
        // Type-specific content validation
        switch (block.type) {
            case "text":
                if (typeof block.content === "string") {
                    // Simple string content is OK
                } else if (!isValidTextContent(block.content)) {
                    errors.push("Text block content must be a string or TextContent object");
                }
                break;

            case "heading":
                if (typeof block.content === "string") {
                    // Simple string content is OK
                } else if (!isValidHeadingContent(block.content)) {
                    errors.push("Heading block content must be a string or HeadingContent object");
                }
                break;

            case "button":
                if (!isValidButtonContent(block.content, options.strict)) {
                    errors.push("Button block content must have text and url properties");
                }
                break;

            case "image":
                if (!isValidImageContent(block.content, options.strict)) {
                    errors.push("Image block content must have a valid src property");
                }
                break;

            case "divider":
                if (!isValidDividerContent(block.content)) {
                    errors.push("Divider block content is invalid");
                }
                break;
        }
    }

    // Validate styles if present
    if ("styles" in block && block.styles !== undefined) {
        if (typeof block.styles !== "object" || block.styles === null) {
            errors.push("Block styles must be an object");
        } else {
            const styleErrors = validateBlockStyles(block.styles, options).errors;
            errors.push(...styleErrors);
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Validates BlockStyles structure.
 *
 * @param {unknown} value - Value to validate
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with errors
 */
export function validateBlockStyles(
    value: unknown,
    options: ValidationOptions = {}
): ValidationResult {
    const errors: string[] = [];

    if (!value || typeof value !== "object") {
        errors.push("BlockStyles must be an object");
        return { valid: false, errors };
    }

    const styles = value as Record<string, unknown>;

    // Validate alignment
    if ("alignment" in styles) {
        const validAlignments = ["left", "center", "right"];
        if (typeof styles.alignment !== "string" || !validAlignments.includes(styles.alignment)) {
            errors.push("alignment must be 'left', 'center', or 'right'");
        }
    }

    // Validate numeric properties
    const numericProps = [
        "borderWidth",
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
    ];

    for (const prop of numericProps) {
        if (prop in styles && styles[prop] !== undefined) {
            if (!isPositiveNumber(styles[prop], !options.strict)) {
                errors.push(`${prop} must be a non-negative number`);
            }
        }
    }

    // Validate backgroundColor
    if ("backgroundColor" in styles && styles.backgroundColor !== undefined) {
        if (!isValidHexColor(styles.backgroundColor)) {
            errors.push("backgroundColor must be a valid hex color");
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Validates EmailStyles structure.
 *
 * @param {unknown} value - Value to validate
 * @param {ValidationOptions} options - Validation options
 * @returns {ValidationResult} Validation result with errors
 */
export function validateEmailStyles(
    value: unknown,
    options: ValidationOptions = {}
): ValidationResult {
    const errors: string[] = [];

    if (!value || typeof value !== "object") {
        errors.push("EmailStyles must be an object");
        return { valid: false, errors };
    }

    const styles = value as Record<string, unknown>;

    // Validate required string properties
    if (typeof styles.font !== "string" || styles.font.trim() === "") {
        errors.push("font must be a non-empty string");
    }

    if (typeof styles.fallback !== "string" || styles.fallback.trim() === "") {
        errors.push("fallback must be a non-empty string");
    }

    // Validate numeric properties
    const numericProps = [
        "paddingLeft",
        "paddingRight",
        "paddingTop",
        "paddingBottom",
        "marginLeft",
        "marginRight",
        "marginTop",
        "marginBottom",
        "radius",
        "borderWidth",
    ];

    for (const prop of numericProps) {
        if (prop in styles && styles[prop] !== undefined) {
            if (!isPositiveNumber(styles[prop], !options.strict)) {
                errors.push(`${prop} must be a non-negative number`);
            }
        }
    }

    // Validate color properties
    const colorProps = ["bodyColor", "backgroundColor", "contentBackgroundColor", "borderColor"];

    for (const prop of colorProps) {
        if (prop in styles && styles[prop] !== undefined) {
            if (!isValidHexColor(styles[prop])) {
                errors.push(`${prop} must be a valid hex color`);
            }
        }
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

/**
 * Validates TemplateData structure.
 *
 * @param {unknown} value - Value to validate
 * @returns {ValidationResult} Validation result with errors
 */
export function validateTemplateData(value: unknown): ValidationResult {
    const errors: string[] = [];

    if (!value || typeof value !== "object") {
        errors.push("TemplateData must be an object");
        return { valid: false, errors };
    }

    const template = value as Record<string, unknown>;

    // Validate name (required)
    if (typeof template.name !== "string" || template.name.trim() === "") {
        errors.push("name must be a non-empty string");
    }

    // Validate optional properties
    if ("id" in template && template.id !== undefined) {
        if (typeof template.id !== "string") {
            errors.push("id must be a string");
        }
    }

    if ("subject" in template && template.subject !== undefined) {
        if (typeof template.subject !== "string") {
            errors.push("subject must be a string");
        }
    }

    if ("updatedAt" in template && template.updatedAt !== undefined) {
        if (!(template.updatedAt instanceof Date)) {
            errors.push("updatedAt must be a Date");
        }
    }

    // content is required but can be any type
    if (!("content" in template)) {
        errors.push("content is required");
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

// ============================================================================
// INPUT SANITIZATION
// ============================================================================

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

/**
 * Validates an array of blocks and filters out invalid ones.
 *
 * @param {unknown} value - Value to validate
 * @param {ValidationOptions} options - Validation options
 * @returns {Block[]} Array of valid blocks
 *
 * @example
 * const blocks = sanitizeBlockArray(data);
 * // Only valid blocks are returned
 */
export function sanitizeBlockArray(value: unknown, options: ValidationOptions = {}): Block[] {
    if (!Array.isArray(value)) {
        return [];
    }

    return value.filter((item) => {
        const result = validateBlock(item, options);
        if (!result.valid) {
            console.warn("Invalid block filtered out:", result.errors);
            return false;
        }
        return true;
    }) as Block[];
}
