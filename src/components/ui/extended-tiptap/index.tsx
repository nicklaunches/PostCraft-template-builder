import DragHandle from "@tiptap/extension-drag-handle-react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import { Command, renderItems } from "@/utils/extensions";

/**
 * Props for the ExtendedTipTap component.
 *
 * @property {string} [initialContent] - Initial HTML content to load in the editor
 * @property {string} [className] - CSS class name to apply to the editor container
 * @property {boolean} [editable] - Whether the editor is editable (default: true)
 * @property {(editor: Editor) => void} [onEditorReady] - Callback when editor is initialized
 * @property {(content: string) => void} [onChange] - Callback when content changes
 */
interface ExtendedTipTapProps {
    initialContent?: string;
    className?: string;
    editable?: boolean;
    onEditorReady?: (editor: Editor) => void;
    onChange?: (content: string) => void;
}

/**
 * Extended TipTap rich text editor with drag handle.
 *
 * Provides a TipTap-based WYSIWYG editor with drag-and-drop block reordering
 * via drag handles. Supports custom styling and editable mode toggling.
 *
 * @param {ExtendedTipTapProps} props - Component props
 * @returns {JSX.Element | null} Extended TipTap editor component
 */
export default function ExtendedTipTap({
    initialContent = "",
    className = "",
    editable = true,
    onEditorReady,
    onChange,
}: ExtendedTipTapProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                gapcursor: false,
            }),
            Command.configure({
                suggestion: {
                    items: () => [],
                    render: renderItems,
                },
            }),
        ],
        content: initialContent,
        editable,
        onUpdate: ({ editor }) => {
            onChange?.(editor.getHTML());
        },
    });

    // Notify parent when editor is ready
    useEffect(() => {
        if (editor && onEditorReady) {
            onEditorReady(editor);
        }
    }, [editor, onEditorReady]);

    // Update editable state when prop changes
    useEffect(() => {
        if (editor) {
            editor.setEditable(editable);
        }
    }, [editor, editable]);

    if (!editor) {
        return null;
    }

    return (
        <>
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
                className={`${className} bg-white [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none transition-all duration-200`}
            />
        </>
    );
}
