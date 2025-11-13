/**
 * Editor utilities module.
 *
 * Provides TipTap editor helpers for selection, manipulation, commands, and extensions.
 */

// Selection utilities
export { getBlockIdFromSelection, getBlockNodeInfoFromSelection } from "./selection";

// Block manipulation
export { findBlockNode, duplicateBlock, deleteBlock } from "./manipulation";

// Command utilities
export { applyDefaultBlockStyles, createSlashCommand } from "./commands";

// TipTap extensions
export {
    Command,
    renderItems,
    ParagraphWithStyle,
    HeadingWithStyle,
    createStyledNode,
    ensureBlockIds,
    suggestionItems,
} from "./extensions";
export type { SuggestionItem, StyledNodeConfig, HTMLTag } from "./extensions";
