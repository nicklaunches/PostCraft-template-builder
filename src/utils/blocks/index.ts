/**
 * Block utilities module.
 *
 * Provides block creation, conversion, and type guard utilities.
 */

// Converters
export { blocksToHTML, blocksToJSON, blocksFromJSON, generateEmailTemplate } from "./converters";

// Factory functions
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
} from "./factory";

// Type guards
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
} from "./type-guards";
