/**
 * Main exports for PostCraft Template Builder.
 *
 * Provides tiered exports for different use cases:
 * - Basic users: TemplateBuilder (recommended)
 * - Intermediate users: TemplateBuilderCore with manual provider setup
 * - Advanced users: Individual components for custom layouts
 */

// =============================================================================
// TIER 1: BASIC USAGE (Recommended for most users)
// =============================================================================

/**
 * Main template builder component with providers, error handling, and loading states.
 * This is the recommended export for basic usage - just import and use.
 *
 * @example
 * ```tsx
 * import { TemplateBuilder } from 'postcraft-template-builder';
 *
 * function App() {
 *   return <TemplateBuilder onSave={handleSave} />;
 * }
 * ```
 */
export { TemplateBuilder } from "./components/TemplateBuilder";
export type { TemplateBuilderProps } from "./components/TemplateBuilder";

// =============================================================================
// TIER 2: INTERMEDIATE USAGE (Manual provider setup)
// =============================================================================

/**
 * Core template builder component without providers (internal).
 * Use this when you need custom provider setup or error handling.
 *
 * @example
 * ```tsx
 * import { TemplateBuilderCore, GlobalStateProvider, ErrorBoundary } from 'postcraft-template-builder';
 *
 * function App() {
 *   return (
 *     <GlobalStateProvider>
 *       <ErrorBoundary>
 *         <TemplateBuilderCore onSave={handleSave} />
 *       </ErrorBoundary>
 *     </GlobalStateProvider>
 *   );
 * }
 * ```
 */
export { TemplateBuilderCore } from "./components/layout/TemplateBuilderCore";
export type { TemplateBuilderCoreProps } from "./components/layout/TemplateBuilderCore";

// Context providers for manual setup
export { GlobalStateProvider } from "./context/GlobalState";
export { EmailStylesProvider, useEmailStyles } from "./context/EmailStylesContext";
export { BlockStylesProvider, useBlockStyles } from "./context/BlockStylesContext";
export { EditorProvider, useEditorContext } from "./context/EditorContext";

// Shared utilities
export { ErrorBoundary, LoadingSpinner } from "./components/shared";

// =============================================================================
// TIER 3: ADVANCED USAGE (Custom layouts with individual components)
// =============================================================================

// Layout components for building custom UIs
export { Nav } from "./components/layout/Nav";
export { LeftSidebar } from "./components/layout/LeftSidebar";
export { ContentEditor } from "./components/layout/ContentEditor";
export type { ContentEditorProps } from "./components/layout/ContentEditor";
export { RightSidebar } from "./components/layout/RightSidebar";

// Panel components for granular control
export { EmailStylesPanel } from "./components/panels/EmailStylesPanel";
export { BlockStylesPanel } from "./components/panels/BlockStylesPanel";

// =============================================================================
// HOOKS
// =============================================================================

export { useTemplateBuilder, useEditor, useDynamicCss } from "./hooks";

// =============================================================================
// TYPES
// =============================================================================

export type * from "./types";

// =============================================================================
// UTILITIES
// =============================================================================

export {
    // Converters
    blocksToHTML,
    blocksToJSON,
    blocksFromJSON,
    generateEmailTemplate,
    // Helpers
    generateClassName,
    generateBlockId,
    getBlockIdFromSelection,
    getBlockNodeInfoFromSelection,
    // Type Guards
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
    // Constants
    BLOCK_TYPES,
    DEFAULT_EMAIL_STYLES,
    DEFAULT_P_STYLES,
    DEFAULT_H1_STYLES,
    DEFAULT_H2_STYLES,
    DEFAULT_H3_STYLES,
    FONT_OPTIONS,
    FALLBACK_OPTIONS,
    MAX_HISTORY_SIZE,
    // Block Factories
    createBlock,
    createTextBlock,
    createHeadingBlock,
    createButtonBlock,
    createImageBlock,
    createDividerBlock,
    cloneBlock,
    createDefaultBlock,
    createBlocksFromTypes,
    // Validators
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
    // CSS Generators
    generateEmailCSS,
    generateBlockCSS,
    generateEmailInlineStyles,
    generateBlockInlineStyles,
    generateCompleteStylesheet,
    minifyCSS,
    addVendorPrefixes,
    // Style Applicator
    applyBlockStylesToNode,
} from "./utils";
export type { BlockType, ValidationResult, ValidationOptions } from "./utils";
