/**
 * Generates a simple hash from a string.
 *
 * Uses a basic hash algorithm to create a deterministic numeric hash
 * from the input string, then converts it to base-36 for compactness.
 *
 * @param {string} str - The string to hash
 * @returns {string} The hash as a base-36 string
 *
 * @example
 * simpleHash('hello') // "19i3st8"
 * simpleHash('world') // "1f8do2j"
 */
function simpleHash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
}

/**
 * Generates a unique, deterministic class name based on content.
 *
 * Uses a hash-based approach for SSR-friendly, deterministic output.
 * The same content will always produce the same class name, making it
 * ideal for server-side rendering and testing scenarios.
 *
 * @param {string} content - Content to hash for generating the class name
 * @param {string} [prefix="postcraft-email-"] - Prefix for the generated class name
 * @returns {string} Generated unique class name
 *
 * @example
 * generateClassName('my-styles') // "postcraft-email-1a2b3c4"
 * generateClassName('different-styles', 'custom-') // "custom-5d6e7f8"
 */
export function generateClassName(content: string, prefix: string = "postcraft-email-"): string {
    const hash = simpleHash(content);
    return `${prefix}${hash}`;
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
