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
