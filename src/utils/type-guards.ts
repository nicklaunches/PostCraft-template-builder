import type {
    Block,
    TypedBlock,
    TextBlock,
    HeadingBlock,
    ButtonBlock,
    ImageBlock,
    DividerBlock,
    ButtonContent,
    ImageContent,
} from "@/types";
import { BLOCK_TYPES } from "./constants";

/**
 * Type guard to check if a value is a valid block type.
 *
 * @param {unknown} type - Value to check
 * @returns {type is BlockType} True if the value is a valid block type
 */
export function isValidBlockType(type: unknown): type is (typeof BLOCK_TYPES)[number] {
    return typeof type === "string" && (BLOCK_TYPES as readonly string[]).includes(type);
}

/**
 * Type guard to check if a block is a text block.
 *
 * @param {Block | TypedBlock} block - Block to check
 * @returns {block is TextBlock} True if the block is a text block
 */
export function isTextBlock(block: Block | TypedBlock): block is TextBlock {
    return block.type === "text";
}

/**
 * Type guard to check if a block is a heading block.
 *
 * @param {Block | TypedBlock} block - Block to check
 * @returns {block is HeadingBlock} True if the block is a heading block
 */
export function isHeadingBlock(block: Block | TypedBlock): block is HeadingBlock {
    return block.type === "heading";
}

/**
 * Type guard to check if a block is a button block.
 *
 * @param {Block | TypedBlock} block - Block to check
 * @returns {block is ButtonBlock} True if the block is a button block
 */
export function isButtonBlock(block: Block | TypedBlock): block is ButtonBlock {
    return block.type === "button";
}

/**
 * Type guard to check if a block is an image block.
 *
 * @param {Block | TypedBlock} block - Block to check
 * @returns {block is ImageBlock} True if the block is an image block
 */
export function isImageBlock(block: Block | TypedBlock): block is ImageBlock {
    return block.type === "image";
}

/**
 * Type guard to check if a block is a divider block.
 *
 * @param {Block | TypedBlock} block - Block to check
 * @returns {block is DividerBlock} True if the block is a divider block
 */
export function isDividerBlock(block: Block | TypedBlock): block is DividerBlock {
    return block.type === "divider";
}

/**
 * Validates if an unknown value is a valid Block structure.
 *
 * Performs runtime validation to check if the value has the required
 * properties of a Block interface.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is Block} True if the value is a valid block
 *
 * @example
 * if (isValidBlock(data)) {
 *   // TypeScript knows data is a Block
 *   console.log(data.id, data.type);
 * }
 */
export function isValidBlock(value: unknown): value is Block {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    // Check required properties
    if (typeof obj.id !== "string") {
        return false;
    }

    if (!isValidBlockType(obj.type)) {
        return false;
    }

    // content can be any type, but must exist
    if (!("content" in obj)) {
        return false;
    }

    // styles is optional, but if present must be an object
    if ("styles" in obj && obj.styles !== undefined) {
        if (typeof obj.styles !== "object" || obj.styles === null) {
            return false;
        }
    }

    return true;
}

/**
 * Validates if an unknown value is valid button content.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is ButtonContent} True if the value is valid button content
 */
export function isValidButtonContent(value: unknown): value is ButtonContent {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return typeof obj.text === "string" && typeof obj.url === "string";
}

/**
 * Validates if an unknown value is valid image content.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is ImageContent} True if the value is valid image content
 */
export function isValidImageContent(value: unknown): value is ImageContent {
    if (!value || typeof value !== "object") {
        return false;
    }

    const obj = value as Record<string, unknown>;

    if (typeof obj.src !== "string") {
        return false;
    }

    // Optional properties
    if ("alt" in obj && obj.alt !== undefined && typeof obj.alt !== "string") {
        return false;
    }

    if ("width" in obj && obj.width !== undefined && typeof obj.width !== "number") {
        return false;
    }

    if ("height" in obj && obj.height !== undefined && typeof obj.height !== "number") {
        return false;
    }

    return true;
}

/**
 * Validates an array of blocks.
 *
 * Checks if all items in the array are valid blocks.
 *
 * @param {unknown} value - Value to validate
 * @returns {value is Block[]} True if the value is an array of valid blocks
 *
 * @example
 * if (isValidBlockArray(data)) {
 *   // TypeScript knows data is Block[]
 *   data.forEach(block => console.log(block.type));
 * }
 */
export function isValidBlockArray(value: unknown): value is Block[] {
    if (!Array.isArray(value)) {
        return false;
    }

    return value.every((item) => isValidBlock(item));
}

/**
 * Safely converts an unknown block to a typed block.
 *
 * Returns null if the block is invalid or has incorrect structure.
 *
 * @param {unknown} value - Value to convert
 * @returns {TypedBlock | null} Typed block or null if invalid
 */
export function toTypedBlock(value: unknown): TypedBlock | null {
    if (!isValidBlock(value)) {
        return null;
    }

    // Already validated, so we can safely cast
    return value as TypedBlock;
}
