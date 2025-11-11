import DragHandle from "@tiptap/extension-drag-handle-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { useGlobalState } from "@/context/GlobalState";

export interface ContentEditorProps {
    initialContent?: string;
    onSave?: (content: string) => void;
}

export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    const { emailStyles } = useGlobalState();

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
        editor?.setEditable(!editor.isEditable);
        editor?.view.dispatch(editor.view.state.tr);
    };

    // Generate dynamic inline styles from emailStyles
    const containerStyle = useMemo(() => {
        const style: React.CSSProperties = {
            fontFamily: `${emailStyles.font}, ${emailStyles.fallback}`,
            padding: `${emailStyles.padding.vertical}px ${emailStyles.padding.horizontal}px`,
            margin: `${emailStyles.margin.vertical}px ${emailStyles.margin.horizontal}px`,
        };

        if (emailStyles.bodyColor) {
            style.color = emailStyles.bodyColor;
        }

        if (emailStyles.backgroundColor) {
            style.backgroundColor = emailStyles.backgroundColor;
        }

        if (emailStyles.radius > 0) {
            style.borderRadius = `${emailStyles.radius}px`;
        }

        if (emailStyles.borderWidth > 0) {
            style.borderWidth = `${emailStyles.borderWidth}px`;
            style.borderStyle = "solid";

            if (emailStyles.borderColor) {
                style.borderColor = emailStyles.borderColor;
            }
        }

        return style;
    }, [emailStyles]);

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="mx-auto px-8 py-16 max-w-[600px]">
                <div className="mb-8 flex gap-4">
                    <button
                        onClick={toggleEditable}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Toggle editable
                    </button>
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
                    style={containerStyle}
                    className="bg-white [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none transition-all duration-200"
                />
            </div>
        </main>
    );
}
