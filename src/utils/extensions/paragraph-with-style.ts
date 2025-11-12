import { createStyledNode } from "./createStyledNode";

/**
 * Extended Paragraph extension that supports inline styles and unique IDs.
 *
 * Custom paragraph node that allows a "style" attribute for applying
 * inline CSS styles to paragraphs, and a unique "id" attribute for tracking
 * and managing block-specific styles. This enables block-specific styling
 * such as padding, border-radius, background-color, and text-align to be
 * applied directly to individual paragraph elements in the TipTap editor.
 */
export const ParagraphWithStyle = createStyledNode({
    name: "paragraph",
    tag: "p",
    className: "postcraft-editor-paragraph",
    parseHTML: () => [{ tag: "p" }],
});
