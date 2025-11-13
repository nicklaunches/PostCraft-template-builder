import ListItem from "@tiptap/extension-list-item";
import { mergeAttributes } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import { generateBlockId } from "../../shared/generators";

/**
 * Ensures all list item nodes have unique block IDs.
 * Assigns IDs to nodes that don't have one and optionally notifies via callback.
 */
function ensureListItemIds(editor: Editor, onBlockCreated?: (id: string) => void): void {
    const { tr } = editor.state;
    let modified = false;

    editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "listItem" && !node.attrs.id) {
            const id = generateBlockId();
            tr.setNodeMarkup(pos, null, { ...node.attrs, id });
            modified = true;

            if (onBlockCreated) {
                onBlockCreated(id);
            }
        }
    });

    if (modified) {
        editor.view.dispatch(tr);
    }
}

/**
 * Extended ListItem extension with custom styling and block ID tracking.
 *
 * Configures list items with:
 * - Unique block IDs for per-item styling
 * - Style attribute support for inline CSS
 * - Proper styling for both ordered and unordered lists
 */
export const ListItemWithStyle = ListItem.extend({
    addOptions() {
        return {
            ...this.parent?.(),
            HTMLAttributes: {},
            onBlockCreated: null,
        };
    },

    addAttributes() {
        return {
            ...this.parent?.(),
            id: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute("data-block-id"),
                renderHTML: (attributes: Record<string, unknown>) => {
                    if (!attributes.id) {
                        return {};
                    }
                    return {
                        "data-block-id": attributes.id,
                    };
                },
            },
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

    onCreate() {
        ensureListItemIds(this.editor);
    },

    onUpdate() {
        ensureListItemIds(this.editor, (this.options as any).onBlockCreated);
    },
});
