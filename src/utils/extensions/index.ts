/**
 * Slash command extensions module exports.
 *
 * Provides a TipTap extension for slash commands, allowing users to quickly
 * insert different block types by typing "/" followed by a command name.
 * Includes the command extension, suggestion items, and utility functions.
 */

export {
    Command,
    renderItems,
    createSuggestionItems,
    handleCommandNavigation,
} from "./slash-command";
export type { SuggestionItem } from "./slash-command";
export { suggestionItems } from "./suggestion-items";
