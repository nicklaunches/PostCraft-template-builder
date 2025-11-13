import type { Editor } from "@tiptap/core";
import { getBlockIdFromSelection } from "./selection";

/**
 * Apply default block styles after a block type change via slash command.
 *
 * This function is called after changing a block's type (e.g., paragraph to heading)
 * to ensure the block has the appropriate default styles for its new type.
 *
 * @param {Editor} editor - TipTap editor instance with storage.setDefaultBlockStyles
 * @param {string} blockId - The ID of the block to style
 * @param {string} blockType - The type of block ("paragraph" or "heading")
 * @param {number} [level] - The heading level (1, 2, or 3) if blockType is "heading"
 *
 * @example
 * applyDefaultBlockStyles(editor, "block-123", "heading", 1);
 * applyDefaultBlockStyles(editor, "block-456", "paragraph");
 */
export function applyDefaultBlockStyles(
    editor: Editor,
    blockId: string,
    blockType: string,
    level?: number
): void {
    if (blockId && (editor.storage as any)?.setDefaultBlockStyles) {
        (editor.storage as any).setDefaultBlockStyles(blockId, blockType, level);
    }
}

/**
 * Create a slash command handler for transforming blocks.
 *
 * Returns a command function that changes the current block's type and applies
 * appropriate default styles. This factory function reduces code duplication
 * across multiple slash command items.
 *
 * @param {string} nodeType - The target node type ("paragraph" or "heading")
 * @param {object} [nodeAttrs] - Optional node attributes (e.g., { level: 1 } for headings)
 * @param {string} blockType - The block type for styling ("paragraph" or "heading")
 * @param {number} [level] - The heading level (1, 2, or 3) if blockType is "heading"
 * @returns {Function} Command handler function for slash command
 *
 * @example
 * const h1Command = createSlashCommand("heading", { level: 1 }, "heading", 1);
 * const paragraphCommand = createSlashCommand("paragraph", {}, "paragraph");
 */
export function createSlashCommand(
    nodeType: string,
    nodeAttrs: Record<string, any> = {},
    blockType: string,
    level?: number
) {
    return ({ editor, range }: { editor: Editor; range: { from: number; to: number } }) => {
        // Get the block ID from the current node before transformation
        const blockId = getBlockIdFromSelection(editor);

        // Transform the block type and clear inline styles
        editor
            .chain()
            .focus()
            .deleteRange(range)
            .setNode(nodeType, nodeAttrs)
            .updateAttributes(nodeType, { style: null })
            .run();

        // Apply default styles for the new block type
        if (blockId) {
            applyDefaultBlockStyles(editor, blockId, blockType, level);
        }
    };
}
