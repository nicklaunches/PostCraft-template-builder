/**
 * Generates a unique random class name with a given prefix.
 *
 * Creates a random alphanumeric string appended to the provided prefix
 * for use as a unique CSS class identifier.
 *
 * @param {string} [prefix="postcraft-email-"] - Prefix for the generated class name
 * @param {number} [length=10] - Length of the random suffix
 * @returns {string} Generated unique class name
 *
 * @example
 * generateClassName() // "postcraft-email-A3F9G2K1H5"
 * generateClassName("custom-", 6) // "custom-X7Y2Z9"
 */
export function generateClassName(
    prefix: string = "postcraft-email-",
    length: number = 10
): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = prefix;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generate a unique ID for a block node in the TipTap editor.
 *
 * Creates a unique identifier using a timestamp and random string
 * for tracking individual blocks and their associated styles.
 *
 * @returns {string} A unique block identifier in the format "block-{timestamp}-{random}"
 *
 * @example
 * generateBlockId() // "block-1699999999999-abc123xy"
 */
export function generateBlockId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
