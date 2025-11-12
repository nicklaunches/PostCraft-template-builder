import React from "react";
import { Editor } from "@tiptap/react";

/**
 * Props for the MenuBar component.
 *
 * @property {Editor | null} editor - TipTap editor instance
 */
export interface MenuBarProps {
    editor: Editor | null;
}

/**
 * Editor toolbar with text formatting controls.
 *
 * Provides buttons for common text formatting operations like bold, italic,
 * headings, and lists. Buttons show active state when corresponding format
 * is applied to selected text.
 *
 * @param {MenuBarProps} props - Component props
 * @returns {JSX.Element | null} Menu bar component or null if no editor
 */
export function MenuBar({ editor }: MenuBarProps) {
    if (!editor) {
        return null;
    }

    const Button = ({
        onClick,
        isActive,
        children,
    }: {
        onClick: () => void;
        isActive: boolean;
        children: React.ReactNode;
    }) => (
        <button
            onClick={onClick}
            className={`
                px-2 py-1.5 rounded-md text-sm font-medium transition-all duration-150
                ${
                    isActive
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                        : "text-gray-700 hover:bg-gray-100 active:bg-gray-200"
                }
            `}
        >
            {children}
        </button>
    );

    return (
        <div className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm px-4 py-2 mb-6">
            <div className="flex flex-wrap items-center gap-1">
                <Button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    isActive={editor.isActive("bold")}
                >
                    <strong>B</strong>
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    isActive={editor.isActive("italic")}
                >
                    <em>I</em>
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    isActive={editor.isActive("heading", { level: 1 })}
                >
                    H1
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    isActive={editor.isActive("heading", { level: 2 })}
                >
                    H2
                </Button>

                <div className="w-px h-6 bg-gray-300 mx-1" />

                <Button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    isActive={editor.isActive("bulletList")}
                >
                    • List
                </Button>
                <Button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    isActive={editor.isActive("orderedList")}
                >
                    1. List
                </Button>
            </div>
        </div>
    );
}
