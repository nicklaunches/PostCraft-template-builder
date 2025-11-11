import DragHandle from "@tiptap/extension-drag-handle-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export interface ContentEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    const [bgColor, setBgColor] = useState("bg-white");

    const editor = useEditor({
        extensions: [StarterKit],
        content: `
      <h1>
        This is a very unique heading.
      </h1>
      <p>
        This is a unique paragraph. It's so unique, it even has an ID attached to it.
      </p>
      <p>
        And this one, too.
      </p>
    `,
    });

    const toggleEditable = () => {
        editor.setEditable(!editor.isEditable);
        editor.view.dispatch(editor.view.state.tr);
    };

    const changeColor = () => {
        const colors = ["bg-red-100", "bg-green-100", "bg-blue-100"];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBgColor(randomColor);
    };

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="mx-auto px-8 py-16 max-w-[600px]">
                <div className="mb-8 flex gap-4">
                    <button onClick={toggleEditable}>Toggle editable</button>
                    <button onClick={changeColor}>Change color</button>
                </div>
                <DragHandle editor={editor}>
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 border border-black/10 rounded cursor-grab">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.75 9h16.5m-16.5 6.75h16.5"
                            />
                        </svg>
                    </div>
                </DragHandle>
                <EditorContent
                    editor={editor}
                    className={`${bgColor} [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none`}
                />
            </div>
        </main>
    );
}
