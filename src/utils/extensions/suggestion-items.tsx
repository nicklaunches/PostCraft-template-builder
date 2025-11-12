import { Bars3BottomLeftIcon, H1Icon, H2Icon, H3Icon } from "@heroicons/react/24/outline";
import type { SuggestionItem } from "./slash-command";

/**
 * Available slash command suggestions.
 *
 * Defines the list of commands that appear when the user types "/" in the editor.
 * Each item includes a title, description, icon, search terms, and the command
 * function to execute when selected.
 *
 * Commands transform the current paragraph node by first converting its type,
 * then removing the "/" trigger character. This prevents unwanted extra nodes
 * from being created in the document structure.
 *
 * When a block type is changed, the command also applies the appropriate default
 * styles (DEFAULT_P_STYLES, DEFAULT_H1_STYLES, etc.) to ensure proper styling.
 *
 * Current commands:
 * - Paragraph: Keep as plain text paragraph (removes "/" only)
 * - Heading 1: Transform current node to large heading (h1)
 * - Heading 2: Transform current node to medium heading (h2)
 * - Heading 3: Transform current node to small heading (h3)
 */
export const suggestionItems: SuggestionItem[] = [
    {
        title: "Paragraph",
        description: "Start writing with plain text",
        searchTerms: ["p", "paragraph", "text"],
        icon: <Bars3BottomLeftIcon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            // Get the block ID from the current node
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            let blockId: string | null = null;
            let depth = $from.depth;

            while (depth > 0) {
                const node = $from.node(depth);
                if (node.type.name === "paragraph" || node.type.name === "heading") {
                    blockId = node.attrs.id || null;
                    break;
                }
                depth--;
            }

            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("paragraph")
                .updateAttributes("paragraph", { style: null })
                .run();

            // Apply default paragraph styles if setDefaultBlockStyles is available
            if (blockId && (editor.storage as any)?.setDefaultBlockStyles) {
                (editor.storage as any).setDefaultBlockStyles(blockId, "paragraph");
            }
        },
    },
    {
        title: "Heading 1",
        description: "Large section heading",
        searchTerms: ["h1", "heading", "title"],
        icon: <H1Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            // Get the block ID from the current node
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            let blockId: string | null = null;
            let depth = $from.depth;

            while (depth > 0) {
                const node = $from.node(depth);
                if (node.type.name === "paragraph" || node.type.name === "heading") {
                    blockId = node.attrs.id || null;
                    break;
                }
                depth--;
            }

            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 1 })
                .updateAttributes("heading", { style: null })
                .run();

            // Apply default H1 styles if setDefaultBlockStyles is available
            if (blockId && (editor.storage as any)?.setDefaultBlockStyles) {
                (editor.storage as any).setDefaultBlockStyles(blockId, "heading", 1);
            }
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading",
        searchTerms: ["h2", "heading", "subtitle"],
        icon: <H2Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            // Get the block ID from the current node
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            let blockId: string | null = null;
            let depth = $from.depth;

            while (depth > 0) {
                const node = $from.node(depth);
                if (node.type.name === "paragraph" || node.type.name === "heading") {
                    blockId = node.attrs.id || null;
                    break;
                }
                depth--;
            }

            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 2 })
                .updateAttributes("heading", { style: null })
                .run();

            // Apply default H2 styles if setDefaultBlockStyles is available
            if (blockId && (editor.storage as any)?.setDefaultBlockStyles) {
                (editor.storage as any).setDefaultBlockStyles(blockId, "heading", 2);
            }
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading",
        searchTerms: ["h3", "heading", "subheading"],
        icon: <H3Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            // Get the block ID from the current node
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            let blockId: string | null = null;
            let depth = $from.depth;

            while (depth > 0) {
                const node = $from.node(depth);
                if (node.type.name === "paragraph" || node.type.name === "heading") {
                    blockId = node.attrs.id || null;
                    break;
                }
                depth--;
            }

            editor
                .chain()
                .focus()
                .deleteRange(range)
                .setNode("heading", { level: 3 })
                .updateAttributes("heading", { style: null })
                .run();

            // Apply default H3 styles if setDefaultBlockStyles is available
            if (blockId && (editor.storage as any)?.setDefaultBlockStyles) {
                (editor.storage as any).setDefaultBlockStyles(blockId, "heading", 3);
            }
        },
    },
];
