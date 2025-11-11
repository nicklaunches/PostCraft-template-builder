/**
 * Main exports for PostCraft Template Builder.
 *
 * Provides both the full TemplateBuilder component and modular exports
 * for individual layout components, hooks, context, and types.
 */

// Full builder export
export { default as TemplateBuilder } from "./components/layout/TemplateBuilder";

// Modular component exports
export { default as Nav } from "./components/layout/Nav";
export { default as LeftSidebar } from "./components/layout/LeftSidebar";
export { default as ContentEditor } from "./components/layout/ContentEditor";
export { default as RightSidebar } from "./components/layout/RightSidebar";

// Hooks
export { useTemplateBuilder, useEditor, useDynamicCss } from "./hooks";

// Context
export { GlobalStateProvider, useGlobalState } from "./context/GlobalState";

// Types
export type * from "./types";

// Utilities
export {
    // Converters
    blocksToHTML,
    blocksToJSON,
    blocksFromJSON,
    generateEmailTemplate,
    // Helpers
    generateClassName,
    generateBlockId,
    // Constants
    BLOCK_TYPES,
    DEFAULT_EMAIL_STYLES,
    DEFAULT_BLOCK_STYLES,
    FONT_OPTIONS,
    FALLBACK_OPTIONS,
    MAX_HISTORY_SIZE,
} from "./utils";
export type { BlockType } from "./utils";
