import { Node, mergeAttributes } from "@tiptap/core";
import { generateBlockId } from "@/utils/helpers";
import { DEFAULT_H1_STYLES, DEFAULT_H2_STYLES, DEFAULT_H3_STYLES } from "@/utils/constants";
import type { BlockStyles } from "@/types";

/**
 * Get default styles for a heading based on its level.
 */
export function getDefaultStylesForLevel(level: number): BlockStyles | null {
    switch (level) {
        case 1:
            return { ...DEFAULT_H1_STYLES };
        case 2:
            return { ...DEFAULT_H2_STYLES };
        case 3:
            return { ...DEFAULT_H3_STYLES };
        default:
            return null;
    }
}

/**
 * Extended Heading extension that supports inline styles and unique IDs.
 *
 * Custom heading node that allows a "style" attribute for applying
 * inline CSS styles to headings (h1-h6), and a unique "id" attribute for tracking
 * and managing block-specific styles. This enables block-specific styling
 * such as padding, border-radius, background-color, and text-align to be
 * applied directly to individual heading elements in the TipTap editor.
 */
export const HeadingWithStyle = Node.create({
    name: "heading",
    priority: 1000,
    group: "block",
    content: "inline*",
    defining: true,

    addOptions() {
        return {
            levels: [1, 2, 3, 4, 5, 6],
            HTMLAttributes: {},
            onBlockCreated: null as ((blockId: string, level: number) => void) | null,
        };
    },

    addAttributes() {
        return {
            level: {
                default: 1,
                rendered: false,
            },
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

    parseHTML() {
        return this.options.levels.map((level: number) => ({
            tag: `h${level}`,
            attrs: { level },
        }));
    },

    renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel ? node.attrs.level : this.options.levels[0];

        // Add CSS class based on heading level
        const className = `postcraft-editor-h${level}`;

        return [
            `h${level}`,
            mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { class: className }),
            0,
        ];
    },

    onCreate() {
        // Assign unique IDs to all heading nodes that don't have one
        const { tr } = this.editor.state;
        let modified = false;

        this.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "heading" && !node.attrs.id) {
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
        // Assign unique IDs to newly created heading nodes and notify about new blocks
        const { tr } = this.editor.state;
        let modified = false;

        this.editor.state.doc.descendants((node, pos) => {
            if (node.type.name === "heading" && !node.attrs.id) {
                const id = generateBlockId();
                tr.setNodeMarkup(pos, null, { ...node.attrs, id });
                modified = true;

                // Notify that a new heading block was created
                if (this.options.onBlockCreated) {
                    this.options.onBlockCreated(id, node.attrs.level);
                }
            }
        });

        if (modified) {
            this.editor.view.dispatch(tr);
        }
    },
});
