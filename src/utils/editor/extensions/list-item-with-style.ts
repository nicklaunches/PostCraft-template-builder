import ListItem from "@tiptap/extension-list-item";
import { mergeAttributes } from "@tiptap/core";

/**
 * Extended ListItem extension with custom styling.
 *
 * Configures list items with proper styling for both ordered and unordered lists.
 */
export const ListItemWithStyle = ListItem.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
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

    renderHTML({ HTMLAttributes }) {
        return ["li", mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
});
