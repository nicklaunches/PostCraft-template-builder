import type { Editor } from "@tiptap/core";
import type { Node as ProseMirrorNode } from "@tiptap/pm/model";

/**
 * Generates a unique random class name with a given prefix.
 *
 * Creates a random alphanumeric string appended to the provided prefix
 * for use as a unique CSS class identifier.
 *
 * @param {string} [prefix="postcraft-email-"] - Prefix for the generated class name
 * @param {number} [length=10] - Length of the random suffix
 * @returns {string} Generated unique class name
 *
 * @example
 * generateClassName() // "postcraft-email-A3F9G2K1H5"
 * generateClassName("custom-", 6) // "custom-X7Y2Z9"
 */
export function generateClassName(
    prefix: string = "postcraft-email-",
    length: number = 10
): string {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = prefix;
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

/**
 * Generate a unique ID for a block node in the TipTap editor.
 *
 * Creates a unique identifier using a timestamp and random string
 * for tracking individual blocks and their associated styles.
 *
 * @returns {string} A unique block identifier in the format "block-{timestamp}-{random}"
 *
 * @example
 * generateBlockId() // "block-1699999999999-abc123xy"
 */
export function generateBlockId(): string {
    return `block-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Get the block ID from the current editor selection.
 *
 * Traverses up the document tree from the current selection position
 * to find the nearest paragraph or heading node and returns its ID attribute.
 *
 * @param {Editor} editor - TipTap editor instance
 * @returns {string | null} Block ID if found, null otherwise
 *
 * @example
 * const blockId = getBlockIdFromSelection(editor);
 * if (blockId) {
 *   // Do something with the block ID
 * }
 */
export function getBlockIdFromSelection(editor: Editor): string | null {
    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    let blockId: string | null = null;
    let depth = $from.depth;

    while (depth > 0) {
        const node = $from.node(depth);
        if (node.type.name === "paragraph" || node.type.name === "heading") {
            blockId = node.attrs.id || null;
            break;
        }
        depth--;
    }

    return blockId;
}

/**
 * Get block node information from the current editor selection.
 *
 * Traverses up the document tree from the current selection position
 * to find the nearest paragraph or heading node and returns its ID and type.
 *
 * @param {Editor} editor - TipTap editor instance
 * @returns {{ blockId: string | null; nodeType: string | null }} Object containing block ID and node type
 *
 * @example
 * const { blockId, nodeType } = getBlockNodeInfoFromSelection(editor);
 * if (blockId && nodeType) {
 *   // Do something with the block
 * }
 */
export function getBlockNodeInfoFromSelection(editor: Editor): {
    blockId: string | null;
    nodeType: string | null;
} {
    const { state } = editor;
    const { selection } = state;
    const { $from } = selection;

    let blockId: string | null = null;
    let nodeType: string | null = null;
    let depth = $from.depth;

    while (depth > 0) {
        const node = $from.node(depth);
        if (node.type.name === "paragraph" || node.type.name === "heading") {
            blockId = node.attrs.id || null;
            nodeType = node.type.name;
            break;
        }
        depth--;
    }

    return { blockId, nodeType };
}

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
