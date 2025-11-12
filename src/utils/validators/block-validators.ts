import type { Block } from "@/types";
import { BLOCK_TYPES } from "../constants";
import {
    isValidTextContent,
    isValidHeadingContent,
    isValidButtonContent,
    isValidImageContent,
    isValidDividerContent,
} from "./type-guards";
import type { ValidationResult, ValidationOptions } from "./types";

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
        }
        // Note: Detailed style validation would require importing validateBlockStyles
        // from style-validators.ts, which would create a circular dependency.
        // Style validation is handled separately by validateBlockStyles.
    }

    return {
        valid: errors.length === 0,
        errors,
    };
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
