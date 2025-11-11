/**
 * Utilities module exports.
 *
 * Provides helper functions, converters, constants, and other utilities
 * for the PostCraft template builder.
 */

// Converters
export { blocksToHTML, blocksToJSON, blocksFromJSON, generateEmailTemplate } from "./converters";

// Constants
export {
    BLOCK_TYPES,
    DEFAULT_EMAIL_STYLES,
    DEFAULT_BLOCK_STYLES,
    FONT_OPTIONS,
    FALLBACK_OPTIONS,
    MAX_HISTORY_SIZE,
} from "./constants";
export type { BlockType } from "./constants";

// Helpers
export { generateClassName, generateBlockId } from "./helpers";
