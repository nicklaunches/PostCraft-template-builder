import {
    Bars3BottomLeftIcon,
    H1Icon,
    H2Icon,
    H3Icon,
    ListBulletIcon,
} from "@heroicons/react/24/outline";
import type { SuggestionItem } from "./slash-command";
import { createSlashCommand } from "../commands";

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
 * - Numbered List: Create an ordered list with numbers
 * - Bullet List: Create an unordered list with bullets
 */
export const suggestionItems: SuggestionItem[] = [
    {
        title: "Paragraph",
        description: "Start writing with plain text",
        searchTerms: ["p", "paragraph", "text"],
        icon: <Bars3BottomLeftIcon className="w-5 h-5" />,
        command: createSlashCommand("paragraph", {}, "paragraph"),
    },
    {
        title: "Heading 1",
        description: "Large section heading",
        searchTerms: ["h1", "heading", "title"],
        icon: <H1Icon className="w-5 h-5" />,
        command: createSlashCommand("heading", { level: 1 }, "heading", 1),
    },
    {
        title: "Heading 2",
        description: "Medium section heading",
        searchTerms: ["h2", "heading", "subtitle"],
        icon: <H2Icon className="w-5 h-5" />,
        command: createSlashCommand("heading", { level: 2 }, "heading", 2),
    },
    {
        title: "Heading 3",
        description: "Small section heading",
        searchTerms: ["h3", "heading", "subheading"],
        icon: <H3Icon className="w-5 h-5" />,
        command: createSlashCommand("heading", { level: 3 }, "heading", 3),
    },
    {
        title: "Numbered List",
        description: "Create a list with numbering",
        searchTerms: ["ol", "ordered", "numbered", "list", "1", "numbers"],
        icon: <ListBulletIcon className="w-5 h-5" />,
        command: ({ editor, range }: { editor: any; range: { from: number; to: number } }) => {
            editor.chain().focus().deleteRange(range).toggleOrderedList().run();
        },
    },
    {
        title: "Bullet List",
        description: "Create a list with bullets",
        searchTerms: ["ul", "unordered", "bullet", "list", "bullets"],
        icon: <ListBulletIcon className="w-5 h-5" />,
        command: ({ editor, range }: { editor: any; range: { from: number; to: number } }) => {
            editor.chain().focus().deleteRange(range).toggleBulletList().run();
        },
    },
];
