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
    DEFAULT_P_STYLES,
    DEFAULT_H1_STYLES,
    DEFAULT_H2_STYLES,
    DEFAULT_H3_STYLES,
    FONT_OPTIONS,
    FALLBACK_OPTIONS,
    MAX_HISTORY_SIZE,
} from "./constants";
export type { BlockType } from "./constants";

// Helpers
export {
    generateClassName,
    generateBlockId,
    getBlockIdFromSelection,
    getBlockNodeInfoFromSelection,
} from "./helpers";

// Type Guards
export {
    isValidBlockType,
    isTextBlock,
    isHeadingBlock,
    isButtonBlock,
    isImageBlock,
    isDividerBlock,
    isValidBlock,
    isValidButtonContent,
    isValidImageContent,
    isValidBlockArray,
    toTypedBlock,
} from "./type-guards";

// Block Factories
export {
    createBlock,
    createTextBlock,
    createHeadingBlock,
    createButtonBlock,
    createImageBlock,
    createDividerBlock,
    cloneBlock,
    createDefaultBlock,
    createBlocksFromTypes,
} from "./factories/blockFactory";

// Validators
export {
    isValidHexColor,
    isValidUrl,
    isPositiveNumber,
    isInRange,
    isValidTextContent,
    isValidHeadingContent,
    isValidDividerContent,
    validateBlock,
    validateBlockStyles,
    validateEmailStyles,
    validateTemplateData,
    sanitizeNumber,
    sanitizeHexColor,
    sanitizeUrl,
    sanitizeString,
    sanitizeBlockArray,
} from "./validators/index";
export type { ValidationResult, ValidationOptions } from "./validators/index";

// CSS Generators
export {
    generateEmailCSS,
    generateBlockCSS,
    generateEmailInlineStyles,
    generateBlockInlineStyles,
    generateCompleteStylesheet,
    minifyCSS,
    addVendorPrefixes,
} from "./cssGenerator";

// Style Applicator
export { applyBlockStylesToNode } from "./styleApplicator";
