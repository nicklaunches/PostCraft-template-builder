/**
 * Utilities module exports.
 *
 * Provides helper functions, converters, constants, and other utilities
 * for the PostCraft template builder.
 */

// ============================================================================
// Block Utilities
// ============================================================================

// Converters
export {
    blocksToHTML,
    blocksToJSON,
    blocksFromJSON,
    generateEmailTemplate,
} from "./blocks/converters";

// Block Factories
export {
    blockBuilder,
    createBlock,
    createTextBlock,
    createHeadingBlock,
    createButtonBlock,
    createImageBlock,
    createDividerBlock,
    cloneBlock,
    createDefaultBlock,
    createBlocksFromTypes,
    // Simplified convenience functions
    text,
    heading,
    button,
    image,
    divider,
} from "./blocks/factory";

// Block Type Guards
export {
    isValidBlockType,
    isTextBlock,
    isHeadingBlock,
    isButtonBlock,
    isImageBlock,
    isDividerBlock,
    isValidBlock,
    isValidBlockArray,
    toTypedBlock,
} from "./blocks/type-guards";

// ============================================================================
// Style Utilities
// ============================================================================

// CSS Generators
export {
    generateEmailCSS,
    generateBlockCSS,
    generateCompleteStylesheet,
    minifyCSS,
    addVendorPrefixes,
} from "./styles/css-generator";

// Inline Style Generators
export { generateEmailInlineStyles, generateBlockInlineStyles } from "./styles/inline-generator";

// Style Applicator
export { applyBlockStylesToNode } from "./styles/applicator";

// ============================================================================
// Editor Utilities
// ============================================================================

// Selection helpers
export { getBlockIdFromSelection, getBlockNodeInfoFromSelection } from "./editor/selection";

// Block manipulation
export { findBlockNode, duplicateBlock, deleteBlock } from "./editor/manipulation";

// Command helpers
export { applyDefaultBlockStyles, createSlashCommand } from "./editor/commands";

// TipTap Extensions
export {
    Command,
    renderItems,
    ParagraphWithStyle,
    HeadingWithStyle,
    createStyledNode,
    ensureBlockIds,
    suggestionItems,
} from "./editor/extensions";
export type { SuggestionItem, StyledNodeConfig, HTMLTag } from "./editor/extensions";

// ============================================================================
// Shared Utilities
// ============================================================================

export { generateClassName, generateBlockId } from "./shared/generators";

// ============================================================================
// Constants
// ============================================================================

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

// ============================================================================
// Validation Utilities
// ============================================================================

export {
    // Type guards
    isValidHexColor,
    isValidUrl,
    isPositiveNumber,
    isInRange,
    isValidTextContent,
    isValidHeadingContent,
    isValidButtonContent,
    isValidImageContent,
    isValidDividerContent,
    // Validators
    validateBlock,
    validateBlockStyles,
    validateEmailStyles,
    validateTemplateData,
    // Sanitizers
    sanitizeNumber,
    sanitizeHexColor,
    sanitizeUrl,
    sanitizeString,
    sanitizeBlockArray,
} from "./validators/index";
export type { ValidationResult, ValidationOptions } from "./validators/index";
