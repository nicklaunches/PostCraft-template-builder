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
            console.log("=== Paragraph Command Started ===");
            console.log("Range before delete:", range);
            console.log("Editor state before:", editor.state.doc.toJSON());

            editor.chain().focus().deleteRange(range).setNode("paragraph").run();

            console.log("Editor state after:", editor.state.doc.toJSON());
            console.log("HTML output:", editor.getHTML());
            console.log("=== Paragraph Command Ended ===");
        },
    },
    {
        title: "Heading 1",
        description: "Large section heading",
        searchTerms: ["h1", "heading", "title"],
        icon: <H1Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            console.log("=== H1 Command Started ===");
            console.log("Range before:", range);
            console.log("Editor state before:", editor.state.doc.toJSON());

            editor.chain().focus().setNode("heading", { level: 1 }).deleteRange(range).run();

            console.log("Editor state after:", editor.state.doc.toJSON());
            console.log("HTML output:", editor.getHTML());
            console.log("=== H1 Command Ended ===");
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading",
        searchTerms: ["h2", "heading", "subtitle"],
        icon: <H2Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            console.log("=== H2 Command Started ===");
            console.log("Range before:", range);
            console.log("Editor state before:", editor.state.doc.toJSON());

            editor.chain().focus().setNode("heading", { level: 2 }).deleteRange(range).run();

            console.log("Editor state after:", editor.state.doc.toJSON());
            console.log("HTML output:", editor.getHTML());
            console.log("=== H2 Command Ended ===");
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading",
        searchTerms: ["h3", "heading", "subheading"],
        icon: <H3Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            console.log("=== H3 Command Started ===");
            console.log("Range before:", range);
            console.log("Editor state before:", editor.state.doc.toJSON());

            editor.chain().focus().setNode("heading", { level: 3 }).deleteRange(range).run();

            console.log("Editor state after:", editor.state.doc.toJSON());
            console.log("HTML output:", editor.getHTML());
            console.log("=== H3 Command Ended ===");
        },
    },
];
