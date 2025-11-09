"use client";

import React from "react";

export interface ContentEditorProps {
    initialContent?: any;
    onSave?: (content: any) => void;
}

export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    return (
        <main className="flex-1 overflow-y-auto bg-white p-8">
            <div className="mx-auto max-w-3xl">
                {/* Notion-style editor will go here */}
                <h1 className="text-2xl">Content Editor</h1>
            </div>
        </main>
    );
}
