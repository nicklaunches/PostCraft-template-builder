/**
 * Style utilities module.
 *
 * Provides CSS generation, inline styles, and style application utilities.
 */

// CSS generation
export {
    generateEmailCSS,
    generateBlockCSS,
    generateCompleteStylesheet,
    minifyCSS,
    addVendorPrefixes,
} from "./css-generator";

// Inline styles generation
export { generateEmailInlineStyles, generateBlockInlineStyles } from "./inline-generator";

// Style application
export { applyBlockStylesToNode } from "./applicator";
