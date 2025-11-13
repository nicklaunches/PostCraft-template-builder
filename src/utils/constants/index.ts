/**
 * Constants for the PostCraft Template Builder
 *
 * This module re-exports all constants from their respective domain-specific modules.
 * Organized by domain for better maintainability and discoverability.
 */

// Block types
export { BLOCK_TYPES, type BlockType } from "./block-types";

// Default styles
export {
    DEFAULT_EMAIL_STYLES,
    DEFAULT_P_STYLES,
    DEFAULT_H1_STYLES,
    DEFAULT_H2_STYLES,
    DEFAULT_H3_STYLES,
    DEFAULT_OL_STYLES,
    DEFAULT_UL_STYLES,
} from "./default-styles";

// UI options
export { FONT_OPTIONS, FALLBACK_OPTIONS } from "./ui-options";

// Editor configuration
export { MAX_HISTORY_SIZE } from "./editor-config";
