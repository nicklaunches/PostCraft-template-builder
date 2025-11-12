import { Node, mergeAttributes } from "@tiptap/core";
import type { Editor } from "@tiptap/core";
import { generateBlockId } from "@/utils/helpers";

/**
 * Configuration options for creating a styled node extension.
 */
export interface StyledNodeConfig {
    /** The name of the node (e.g., 'heading', 'paragraph') */
    name: string;
    /** The HTML tag to render (e.g., 'p', 'h1'). Defaults to name if not provided */
    tag?: string;
    /** Priority for the extension (default: 1000) */
    priority?: number;
    /** Content model for the node (default: 'inline*') */
    content?: string;
    /** Group the node belongs to (default: 'block') */
    group?: string;
    /** Whether this node defines its content structure (default: false) */
    defining?: boolean;
    /** HTML attributes to merge into the rendered element */
    HTMLAttributes?: Record<string, unknown>;
    /** CSS class name to add to the rendered element */
    className?: string;
    /** Additional attributes beyond id and style */
    additionalAttributes?: Record<string, unknown>;
    /** Custom parseHTML rules */
    parseHTML?: () => Array<{ tag: string; attrs?: Record<string, unknown> }>;
    /** Custom renderHTML implementation (overrides default) */
    renderHTML?: (params: { node: any; HTMLAttributes: Record<string, unknown> }) => any;
    /** Callback when a new block is created with its ID */
    onBlockCreated?: (blockId: string, attrs?: Record<string, unknown>) => void;
}

/**
 * Ensures all nodes of a given type have unique block IDs.
 * Assigns IDs to nodes that don't have one and optionally notifies via callback.
 *
 * @param editor - The TipTap editor instance
 * @param nodeName - The name of the node type to process
 * @param onBlockCreated - Optional callback invoked when new IDs are assigned
 */
export function ensureBlockIds(
    editor: Editor,
    nodeName: string,
    onBlockCreated?: (id: string, attrs?: Record<string, unknown>) => void
): void {
    const { tr } = editor.state;
    let modified = false;

    editor.state.doc.descendants((node, pos) => {
        if (node.type.name === nodeName && !node.attrs.id) {
            const id = generateBlockId();
            tr.setNodeMarkup(pos, null, { ...node.attrs, id });
            modified = true;

            // Notify about the newly created block
            if (onBlockCreated) {
                onBlockCreated(id, node.attrs);
            }
        }
    });

    if (modified) {
        editor.view.dispatch(tr);
    }
}

/**
 * Creates a TipTap node extension with standard styling and ID management.
 *
 * This higher-order function eliminates boilerplate by providing:
 * - Automatic unique ID assignment to all nodes
 * - Style attribute support for inline CSS
 * - Consistent parseHTML and renderHTML behavior
 * - Configurable options via the config parameter
 *
 * @param config - Configuration object for the styled node
 * @returns A TipTap node extension with styling and ID support
 *
 * @example
 * ```typescript
 * export const ParagraphWithStyle = createStyledNode({
 *   name: 'paragraph',
 *   className: 'postcraft-editor-paragraph',
 *   parseHTML: () => [{ tag: 'p' }],
 *   onBlockCreated: (blockId) => console.log('New paragraph:', blockId)
 * });
 * ```
 */
export function createStyledNode(config: StyledNodeConfig) {
    const {
        name,
        tag,
        priority = 1000,
        content = "inline*",
        group = "block",
        defining = false,
        HTMLAttributes = {},
        className,
        additionalAttributes = {},
        parseHTML,
        renderHTML,
        onBlockCreated,
    } = config;

    // Use tag if provided, otherwise default to name
    const htmlTag = tag || name;

    return Node.create({
        name,
        priority,
        group,
        content,
        defining,

        addOptions() {
            return {
                HTMLAttributes,
                onBlockCreated: onBlockCreated || null,
            };
        },

        addAttributes() {
            return {
                // Standard ID attribute for block tracking
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
                // Standard style attribute for inline CSS
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
                // Merge any additional attributes
                ...additionalAttributes,
            };
        },

        parseHTML() {
            if (parseHTML) {
                return parseHTML();
            }
            // Default parseHTML if not provided
            return [{ tag: htmlTag }];
        },

        renderHTML({ node, HTMLAttributes }) {
            if (renderHTML) {
                return renderHTML({ node, HTMLAttributes });
            }
            // Default renderHTML behavior - match the original paragraph pattern
            const attrs = className
                ? mergeAttributes(HTMLAttributes, { class: className })
                : mergeAttributes(HTMLAttributes);
            return [htmlTag, attrs, 0];
        },

        onCreate() {
            // Assign unique IDs to all nodes of this type on editor creation
            ensureBlockIds(this.editor, name);
        },

        onUpdate() {
            // Assign unique IDs to newly created nodes and notify via callback
            ensureBlockIds(this.editor, name, this.options.onBlockCreated);
        },
    });
}
