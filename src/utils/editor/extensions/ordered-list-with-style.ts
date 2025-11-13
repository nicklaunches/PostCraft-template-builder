import OrderedList from "@tiptap/extension-ordered-list";
import { mergeAttributes } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import { generateBlockId } from "../../shared/generators";

/**
 * Ensures all ordered list nodes have unique block IDs.
 * Assigns IDs to nodes that don't have one and optionally notifies via callback.
 */
function ensureOrderedListIds(editor: Editor, onBlockCreated?: (id: string) => void): void {
    const { tr } = editor.state;
    let modified = false;

    editor.state.doc.descendants((node, pos) => {
        if (node.type.name === "orderedList" && !node.attrs.id) {
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
 * Extended OrderedList extension with custom styling and block ID tracking.
 *
 * Configures ordered lists to:
 * - Display numbers with appropriate styling
 * - Track unique block IDs for per-block styling
 * - Support style attributes for inline CSS
 */
export const OrderedListWithStyle = OrderedList.extend({
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
        return [
            "ol",
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
                class: "postcraft-editor-ol",
            }),
            0,
        ];
    },

    onCreate() {
        ensureOrderedListIds(this.editor);
    },

    onUpdate() {
        ensureOrderedListIds(this.editor, (this.options as any).onBlockCreated);
    },
});
