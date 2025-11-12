import { Node, mergeAttributes } from "@tiptap/core";
import { ensureBlockIds } from "./createStyledNode";
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
        // Use the shared ensureBlockIds utility
        ensureBlockIds(this.editor, "heading");
    },

    onUpdate() {
        // Use the shared ensureBlockIds utility with callback
        ensureBlockIds(this.editor, "heading", (id, attrs) => {
            if (this.options.onBlockCreated && attrs) {
                this.options.onBlockCreated(id, attrs.level);
            }
        });
    },
});
