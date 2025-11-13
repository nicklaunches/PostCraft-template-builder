/**
 * TipTap extensions module exports.
 *
 * Provides custom TipTap extensions including slash commands for quick
 * formatting and block-level nodes with style support.
 */

export { Command, renderItems } from "./slash-command";
export { ParagraphWithStyle } from "./paragraph-with-style";
export { HeadingWithStyle } from "./heading-with-style";
export { createStyledNode, ensureBlockIds } from "./createStyledNode";
export type { SuggestionItem } from "./slash-command";
export type { StyledNodeConfig, HTMLTag } from "./createStyledNode";
export { suggestionItems } from "./suggestion-items";
