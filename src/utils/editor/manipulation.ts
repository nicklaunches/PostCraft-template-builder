import type { Editor } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";
import { generateBlockId } from "../shared/generators";

/**
 * Find a block node by its ID in the current editor selection context.
 *
 * Traverses up the document tree from the current selection position
 * to find a paragraph or heading node with the specified block ID and
 * returns comprehensive information about the node including its position and size.
 *
 * @param {Editor} editor - TipTap editor instance
 * @param {string} blockId - The ID of the block to find
 * @returns {{ node: ProseMirrorNode; pos: number; size: number } | null} Block node info or null if not found
 *
 * @example
 * const blockInfo = findBlockNode(editor, "block-123");
 * if (blockInfo) {
 *   console.log(blockInfo.node, blockInfo.pos, blockInfo.size);
 * }
 */
export function findBlockNode(
    editor: Editor,
    blockId: string
): { node: ProseMirrorNode; pos: number; size: number } | null {
    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    let depth = $from.depth;

    while (depth > 0) {
        const node = $from.node(depth);
        if (
            (node.type.name === "paragraph" || node.type.name === "heading") &&
            node.attrs.id === blockId
        ) {
            return {
                node,
                pos: $from.before(depth),
                size: node.nodeSize,
            };
        }
        depth--;
    }

    return null;
}

/**
 * Duplicate a block in the editor.
 *
 * Creates a copy of the specified block with a new unique ID and inserts it
 * immediately after the original block. Optionally calls a callback to handle
 * copying associated styles or other data.
 *
 * @param {Editor} editor - TipTap editor instance
 * @param {string} blockId - The ID of the block to duplicate
 * @param {(oldId: string, newId: string) => void} [onStylesCopy] - Optional callback for copying styles
 * @returns {string | null} The new block ID if successful, null if block not found
 *
 * @example
 * const newId = duplicateBlock(editor, "block-123", (oldId, newId) => {
 *   // Copy styles from old block to new block
 *   copyBlockStyles(oldId, newId);
 * });
 */
export function duplicateBlock(
    editor: Editor,
    blockId: string,
    onStylesCopy?: (oldId: string, newId: string) => void
): string | null {
    const blockInfo = findBlockNode(editor, blockId);
    if (!blockInfo) return null;

    const newId = generateBlockId();
    const duplicatedNode = blockInfo.node.type.create(
        { ...blockInfo.node.attrs, id: newId },
        blockInfo.node.content
    );

    const transaction = editor.state.tr.insert(blockInfo.pos + blockInfo.size, duplicatedNode);
    editor.view.dispatch(transaction);

    onStylesCopy?.(blockId, newId);
    return newId;
}

/**
 * Delete a block from the editor.
 *
 * Removes the specified block from the document. Does not clean up associated
 * styles - caller should handle style cleanup separately if needed.
 *
 * @param {Editor} editor - TipTap editor instance
 * @param {string} blockId - The ID of the block to delete
 * @returns {boolean} True if the block was deleted successfully, false if not found
 *
 * @example
 * const deleted = deleteBlock(editor, "block-123");
 * if (deleted) {
 *   // Clean up associated styles
 *   deleteBlockStyles("block-123");
 * }
 */
export function deleteBlock(editor: Editor, blockId: string): boolean {
    const blockInfo = findBlockNode(editor, blockId);
    if (!blockInfo) return false;

    const transaction = editor.state.tr.delete(blockInfo.pos, blockInfo.pos + blockInfo.size);
    editor.view.dispatch(transaction);
    return true;
}
