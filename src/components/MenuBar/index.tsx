"use client";

import React from "react";
import { Editor } from "@tiptap/react";

interface MenuBarProps {
    editor: Editor | null;
}

export default function MenuBar({ editor }: MenuBarProps) {
    if (!editor) {
        return null;
    }

    return (
        <div className="border-b bg-gray-50 p-2 flex flex-wrap gap-1 mb-4">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`px-3 py-1 rounded ${editor.isActive("bold") ? "bg-gray-800 text-white" : "bg-white"}`}
            >
                Bold
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`px-3 py-1 rounded ${editor.isActive("italic") ? "bg-gray-800 text-white" : "bg-white"}`}
            >
                Italic
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`px-3 py-1 rounded ${editor.isActive("heading", { level: 1 }) ? "bg-gray-800 text-white" : "bg-white"}`}
            >
                H1
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`px-3 py-1 rounded ${editor.isActive("heading", { level: 2 }) ? "bg-gray-800 text-white" : "bg-white"}`}
            >
                H2
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`px-3 py-1 rounded ${editor.isActive("bulletList") ? "bg-gray-800 text-white" : "bg-white"}`}
            >
                Bullet List
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`px-3 py-1 rounded ${editor.isActive("orderedList") ? "bg-gray-800 text-white" : "bg-white"}`}
            >
                Numbered List
            </button>
        </div>
    );
}
