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
 * @param {any} editor - TipTap editor instance
 * @returns {string | null} Block ID if found, null otherwise
 *
 * @example
 * const blockId = getBlockIdFromSelection(editor);
 * if (blockId) {
 *   // Do something with the block ID
 * }
 */
export function getBlockIdFromSelection(editor: any): string | null {
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
 * Apply default block styles after a block type change via slash command.
 *
 * This function is called after changing a block's type (e.g., paragraph to heading)
 * to ensure the block has the appropriate default styles for its new type.
 *
 * @param {any} editor - TipTap editor instance with storage.setDefaultBlockStyles
 * @param {string} blockId - The ID of the block to style
 * @param {string} blockType - The type of block ("paragraph" or "heading")
 * @param {number} [level] - The heading level (1, 2, or 3) if blockType is "heading"
 *
 * @example
 * applyDefaultBlockStyles(editor, "block-123", "heading", 1);
 * applyDefaultBlockStyles(editor, "block-456", "paragraph");
 */
export function applyDefaultBlockStyles(
    editor: any,
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
    return ({ editor, range }: { editor: any; range: any }) => {
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
