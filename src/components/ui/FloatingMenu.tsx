import { FloatingMenu as TiptapFloatingMenu } from "@tiptap/react/menus";
import { Editor } from "@tiptap/core";
import {
    BoldIcon,
    ItalicIcon,
    UnderlineIcon,
    StrikethroughIcon,
    CodeBracketIcon,
    LinkIcon,
} from "@heroicons/react/24/outline";
import Tooltip from "./Tooltip";

interface FloatingMenuProps {
    editor: Editor | null;
}

/**
 * Floating menu component for text formatting.
 *
 * Displays a floating menu on empty lines, providing quick access
 * to text formatting options like bold, italic, strikethrough, underline,
 * code, and link.
 *
 * @param {FloatingMenuProps} props - Component props
 * @returns {JSX.Element | null} Floating menu component
 */
export default function FloatingMenu({ editor }: FloatingMenuProps) {
    if (!editor) {
        return null;
    }

    const setLink = () => {
        const previousUrl = editor.getAttributes("link").href;
        const url = window.prompt("URL", previousUrl);

        // cancelled
        if (url === null) {
            return;
        }

        // empty
        if (url === "") {
            editor.chain().focus().extendMarkRange("link").unsetLink().run();
            return;
        }

        // update link
        editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    };

    return (
        <TiptapFloatingMenu
            editor={editor}
            className="flex items-center gap-1 p-1 bg-white border border-gray-200 rounded-lg shadow-lg"
        >
            <Tooltip content="Bold (Ctrl+B)">
                <button
                    onClick={() => {
                        editor.chain().focus().toggleBold().run();
                    }}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        editor.isActive("bold") ? "bg-gray-200" : ""
                    }`}
                    title="Bold"
                >
                    <BoldIcon className="w-4 h-4" />
                </button>
            </Tooltip>

            <Tooltip content="Italic (Ctrl+I)">
                <button
                    onClick={() => {
                        editor.chain().focus().toggleItalic().run();
                    }}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        editor.isActive("italic") ? "bg-gray-200" : ""
                    }`}
                    title="Italic"
                >
                    <ItalicIcon className="w-4 h-4" />
                </button>
            </Tooltip>

            <Tooltip content="Strikethrough">
                <button
                    onClick={() => {
                        editor.chain().focus().toggleStrike().run();
                    }}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        editor.isActive("strike") ? "bg-gray-200" : ""
                    }`}
                    title="Strikethrough"
                >
                    <StrikethroughIcon className="w-4 h-4" />
                </button>
            </Tooltip>

            <Tooltip content="Underline (Ctrl+U)">
                <button
                    onClick={() => {
                        editor.chain().focus().toggleUnderline().run();
                    }}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        editor.isActive("underline") ? "bg-gray-200" : ""
                    }`}
                    title="Underline"
                >
                    <UnderlineIcon className="w-4 h-4" />
                </button>
            </Tooltip>

            <Tooltip content="Code (Ctrl+E)">
                <button
                    onClick={() => {
                        editor.chain().focus().toggleCode().run();
                    }}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        editor.isActive("code") ? "bg-gray-200" : ""
                    }`}
                    title="Code"
                >
                    <CodeBracketIcon className="w-4 h-4" />
                </button>
            </Tooltip>

            <div className="w-px h-6 bg-gray-300" />

            <Tooltip content="Add or edit link (Ctrl+K)">
                <button
                    onClick={() => {
                        setLink();
                    }}
                    className={`p-2 rounded hover:bg-gray-100 transition-colors ${
                        editor.isActive("link") ? "bg-gray-200" : ""
                    }`}
                    title="Link"
                >
                    <LinkIcon className="w-4 h-4" />
                </button>
            </Tooltip>
        </TiptapFloatingMenu>
    );
}
