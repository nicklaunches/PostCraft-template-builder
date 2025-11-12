/**
 * Block types supported by the email template builder.
 * Use const assertion for strict type safety.
 */
export const BLOCK_TYPES = ["text", "heading", "image", "button", "divider"] as const;

/**
 * Block type union derived from BLOCK_TYPES constant.
 */
export type BlockType = (typeof BLOCK_TYPES)[number];
