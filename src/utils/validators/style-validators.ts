import { isValidHexColor, isPositiveNumber } from "./type-guards";
import type { ValidationResult, ValidationOptions } from "./types";

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
