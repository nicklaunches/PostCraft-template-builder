import type { Editor } from "@tiptap/core";
import type { BlockStyles } from "@/types";
import { generateBlockInlineStyles, generateListInlineStyles } from "./inline-generator";

/**
 * Converts a camelCase string to kebab-case.
 *
 * @param {string} str - String to convert
 * @returns {string} Kebab-case string
 *
 * @example
 * camelToKebab("backgroundColor") // "background-color"
 */
function camelToKebab(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);
}

/**
 * Applies block styles to a TipTap editor node as inline styles.
 *
 * This function takes block styles and converts them to an inline style string,
 * then applies them to the specified node type in the editor. If no styles are
 * provided, it clears any existing inline styles.
 *
 * @param {Editor} editor - TipTap editor instance
 * @param {string} nodeType - Type of node to apply styles to (e.g., "paragraph", "heading")
 * @param {BlockStyles | undefined} styles - Style configuration to apply
 *
 * @example
 * applyBlockStylesToNode(editor, "paragraph", blockStyles);
 */
export function applyBlockStylesToNode(
    editor: Editor,
    nodeType: string,
    styles: BlockStyles | undefined
): void {
    if (!styles) {
        // Clear styles if none are provided
        editor.chain().focus().updateAttributes(nodeType, { style: null }).run();
        return;
    }

    // Generate inline styles object using the existing CSS generator
    const inlineStyles = generateBlockInlineStyles(styles);

    // Convert React.CSSProperties object to inline style string
    const styleString = Object.entries(inlineStyles)
        .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
        .join("; ");

    // Apply the style string to the node
    editor.chain().focus().updateAttributes(nodeType, { style: styleString }).run();
}

/**
 * Applies list-specific block styles to a TipTap editor list node as inline styles.
 *
 * Lists require special handling for padding-left to accommodate list markers.
 * A base padding of 26px is applied, and the user's paddingLeft is added on top.
 *
 * @param {Editor} editor - TipTap editor instance
 * @param {string} nodeType - Type of list node ("orderedList" or "bulletList")
 * @param {BlockStyles | undefined} styles - Style configuration to apply
 *
 * @example
 * applyListStylesToNode(editor, "orderedList", blockStyles);
 */
export function applyListStylesToNode(
    editor: Editor,
    nodeType: string,
    styles: BlockStyles | undefined
): void {
    if (!styles) {
        // Clear styles if none are provided
        editor.chain().focus().updateAttributes(nodeType, { style: null }).run();
        return;
    }

    // Generate list-specific inline styles with base padding
    const inlineStyles = generateListInlineStyles(styles);

    // Convert React.CSSProperties object to inline style string
    const styleString = Object.entries(inlineStyles)
        .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
        .join("; ");

    // Apply the style string to the node
    editor.chain().focus().updateAttributes(nodeType, { style: styleString }).run();
}
