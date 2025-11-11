import { Bars3BottomLeftIcon, H1Icon, H2Icon, H3Icon } from "@heroicons/react/24/outline";
import type { SuggestionItem } from "./slash-command";

/**
 * Available slash command suggestions.
 *
 * Defines the list of commands that appear when the user types "/" in the editor.
 * Each item includes a title, description, icon, search terms, and the command
 * function to execute when selected.
 *
 * Current commands:
 * - Paragraph: Convert to plain text paragraph
 * - Heading 1: Convert to large heading (h1)
 * - Heading 2: Convert to medium heading (h2)
 * - Heading 3: Convert to small heading (h3)
 */
export const suggestionItems: SuggestionItem[] = [
    {
        title: "Paragraph",
        description: "Start writing with plain text",
        searchTerms: ["p", "paragraph", "text"],
        icon: <Bars3BottomLeftIcon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("paragraph").run();
        },
    },
    {
        title: "Heading 1",
        description: "Large section heading",
        searchTerms: ["h1", "heading", "title"],
        icon: <H1Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run();
        },
    },
    {
        title: "Heading 2",
        description: "Medium section heading",
        searchTerms: ["h2", "heading", "subtitle"],
        icon: <H2Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run();
        },
    },
    {
        title: "Heading 3",
        description: "Small section heading",
        searchTerms: ["h3", "heading", "subheading"],
        icon: <H3Icon className="w-5 h-5" />,
        command: ({ editor, range }) => {
            editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run();
        },
    },
];
