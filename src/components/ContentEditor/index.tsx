import DragHandle from "@tiptap/extension-drag-handle-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export interface ContentEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
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

    return (
        <main className="flex-1 overflow-y-auto bg-white">
            <div className="mx-auto max-w-4xl px-8 py-16">
                <div>
                    <button onClick={toggleEditable}>Toggle editable</button>
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
                <EditorContent editor={editor} />
            </div>
        </main>
    );
}
