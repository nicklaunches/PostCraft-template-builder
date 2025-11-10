"use client";

export interface ContentEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    return (
        <main className="flex-1 overflow-y-auto bg-white">
            <div className="mx-auto max-w-4xl px-8 py-16">
                {/* ContentEditor will be implemented here later */}
            </div>
        </main>
    );
}
