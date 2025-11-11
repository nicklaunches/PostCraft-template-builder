import { Node, mergeAttributes } from "@tiptap/core";

/**
 * Extended Heading extension that supports inline styles.
 *
 * Custom heading node that allows a "style" attribute for applying
 * inline CSS styles to headings (h1-h6). This enables block-specific styling
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
        };
    },

    addAttributes() {
        return {
            level: {
                default: 1,
                rendered: false,
            },
            style: {
                default: null,
                parseHTML: (element: HTMLElement) => element.getAttribute("style"),
                renderHTML: (attributes: Record<string, any>) => {
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

        return [`h${level}`, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
});
