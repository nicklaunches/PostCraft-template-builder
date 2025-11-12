import { Node, mergeAttributes } from "@tiptap/core";
import { generateBlockId } from "@/utils/helpers";

/**
 * Extended Paragraph extension that supports inline styles and unique IDs.
 *
 * Custom paragraph node that allows a "style" attribute for applying
 * inline CSS styles to paragraphs, and a unique "id" attribute for tracking
 * and managing block-specific styles. This enables block-specific styling
 * such as padding, border-radius, background-color, and text-align to be
 * applied directly to individual paragraph elements in the TipTap editor.
 */
export const ParagraphWithStyle = Node.create({
    name: "paragraph",
    priority: 1000,
    group: "block",
    content: "inline*",

    addOptions() {
        return {
            onBlockCreated: null as ((blockId: string) => void) | null,
        };
    },

    parseHTML() {
        return [{ tag: "p" }];
    },

    renderHTML({ HTMLAttributes }) {
        return ["p", mergeAttributes(HTMLAttributes, { class: "postcraft-editor-paragraph" }), 0];
    },

    addAttributes() {
        return {
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

    onCreate() {
        // Assign unique IDs to all paragraph nodes that don't have one
        const { tr } = this.editor.state;
        let modified = false;

        this.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "paragraph" && !node.attrs.id) {
                const id = generateBlockId();
                tr.setNodeMarkup(pos, null, { ...node.attrs, id });
                modified = true;
            }
        });

        if (modified) {
            this.editor.view.dispatch(tr);
        }
    },

    onUpdate() {
        // Assign unique IDs to newly created paragraph nodes
        const { tr } = this.editor.state;
        let modified = false;

        this.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "paragraph" && !node.attrs.id) {
                const id = generateBlockId();
                tr.setNodeMarkup(pos, null, { ...node.attrs, id });
                modified = true;

                // Notify that a new paragraph block was created
                if (this.options.onBlockCreated) {
                    this.options.onBlockCreated(id);
                }
            }
        });

        if (modified) {
            this.editor.view.dispatch(tr);
        }
    },
});
