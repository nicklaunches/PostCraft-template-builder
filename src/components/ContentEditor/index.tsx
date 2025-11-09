"use client";

import { useEffect, useState } from "react";
import MenuBar from "../MenuBar";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { SlashCommand, suggestion } from "./SplashCommand";

export interface ContentEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const editor = useEditor({
        immediatelyRender: false,
        extensions: [
            StarterKit,
            Placeholder.configure({
                placeholder: "Start writing your thoughts here … ✍️",
            }),
            SlashCommand.configure({
                suggestion,
            }),
        ],
        content: _initialContent || "",
        editorProps: {
            attributes: {
                class: "prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none min-h-[500px] max-w-none",
            },
        },
    });

    if (!isMounted) {
        return (
            <main className="flex-1 overflow-y-auto bg-white">
                <div className="mx-auto max-w-4xl px-8 py-16">
                    <div className="min-h-[500px] animate-pulse bg-gray-100 rounded"></div>
                </div>
            </main>
        );
    }

    return (
        <main className="flex-1 overflow-y-auto bg-white">
            <div className="mx-auto max-w-4xl px-8 py-16">
                <MenuBar editor={editor} />
                <EditorContent editor={editor} className="tiptap" />
            </div>
        </main>
    );
}
