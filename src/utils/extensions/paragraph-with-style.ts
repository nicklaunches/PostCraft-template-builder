import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Extended Paragraph extension that supports inline styles.
 *
 * Custom paragraph node that allows a "style" attribute for applying
 * inline CSS styles to paragraphs. This enables block-specific styling
 * such as padding, border-radius, background-color, and text-align to be
 * applied directly to individual paragraph elements in the TipTap editor.
 */
export const ParagraphWithStyle = Node.create({
    name: "paragraph",
    priority: 1000,
    group: "block",
    content: "inline*",

    parseHTML() {
        return [{ tag: "p" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["p", mergeAttributes(HTMLAttributes), 0];
    },

    addAttributes() {
        return {
            style: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute("style"),
                renderHTML: (attributes: Record<string, unknown>) => {
                    if (!attributes.style) {
                        return {};
                    }
                    return {
                        style: attributes.style,
                    };
                },
            },
        };
    },
});
