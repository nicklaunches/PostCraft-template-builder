import type { Editor } from "@tiptap/core";

/**
 * Get the block ID from the current editor selection.
 *
 * Traverses up the document tree from the current selection position
 * to find the nearest block node (listItem, paragraph, or heading) and returns its ID attribute.
 * Prioritizes listItem over paragraph when inside a list.
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

    // First pass: look for listItem (highest priority for lists)
    while (depth > 0) {
        const node = $from.node(depth);
        if (node.type.name === "listItem") {
            blockId = node.attrs.id || null;
            if (blockId) return blockId;
        }
        depth--;
    }

    // Second pass: look for paragraph or heading
    depth = $from.depth;
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
 * to find the nearest block node (listItem, paragraph, or heading) and returns its ID and type.
 * Prioritizes listItem over paragraph when inside a list.
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

    // First pass: look for listItem (highest priority for lists)
    while (depth > 0) {
        const node = $from.node(depth);
        if (node.type.name === "listItem") {
            blockId = node.attrs.id || null;
            nodeType = node.type.name;
            if (blockId) return { blockId, nodeType };
        }
        depth--;
    }

    // Second pass: look for paragraph or heading
    depth = $from.depth;
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
