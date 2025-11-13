import DragHandle from "@tiptap/extension-drag-handle-react";
import { EditorContent, useEditor, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Underline from "@tiptap/extension-underline";
import Code from "@tiptap/extension-code";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import {
    Command,
    renderItems,
    ParagraphWithStyle,
    HeadingWithStyle,
} from "@/utils/editor/extensions";
import { BubbleMenu } from "../BubbleMenu";
import { FloatingMenu } from "../FloatingMenu";

/**
 * Props for the ExtendedTipTap component.
 *
 * @property {string} [initialContent] - Initial HTML content to load in the editor
 * @property {string} [className] - CSS class name to apply to the editor container
 * @property {boolean} [editable] - Whether the editor is editable (default: true)
 * @property {(editor: Editor) => void} [onEditorReady] - Callback when editor is initialized
 * @property {(content: string) => void} [onChange] - Callback when content changes
 * @property {(blockId: string, level: number) => void} [onHeadingBlockCreated] - Callback when a new heading block is created
 * @property {(blockId: string) => void} [onParagraphBlockCreated] - Callback when a new paragraph block is created
 */
export interface ExtendedTipTapProps {
    initialContent?: string;
    className?: string;
    editable?: boolean;
    onEditorReady?: (editor: Editor) => void;
    onChange?: (content: string) => void;
    onHeadingBlockCreated?: (blockId: string, level: number) => void;
    onParagraphBlockCreated?: (blockId: string) => void;
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
export function ExtendedTipTap({
    initialContent = "",
    className = "",
    editable = true,
    onEditorReady,
    onChange,
    onHeadingBlockCreated,
    onParagraphBlockCreated,
}: ExtendedTipTapProps) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                gapcursor: false,
                paragraph: false, // Disable default paragraph
                heading: false, // Disable default heading
                bold: false, // Disable default bold to use custom
                italic: false, // Disable default italic to use custom
                strike: false, // Disable default strike to use custom
                code: false, // Disable default code to use custom
            }),
            ParagraphWithStyle.configure({
                onBlockCreated: onParagraphBlockCreated,
            }),
            HeadingWithStyle.configure({
                onBlockCreated: onHeadingBlockCreated,
            }),
            Bold,
            Italic,
            Strike,
            Underline,
            Code,
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline cursor-pointer",
                },
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
        editorProps: {
            attributes: {
                class: "focus:outline-none",
            },
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

    const handlePlusClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const { state } = editor;
        const { selection } = state;
        const { $from } = selection;

        // Find the end position of the current block
        let depth = $from.depth;
        let currentBlockPos = $from.pos;

        while (depth > 0) {
            const node = $from.node(depth);
            if (node.type.name === "paragraph" || node.type.name === "heading") {
                currentBlockPos = $from.after(depth);
                break;
            }
            depth--;
        }

        // Insert a new paragraph after the current block
        // Then insert "/" which triggers the slash command menu
        // The "/" will be automatically removed when user selects a command
        editor
            .chain()
            .focus()
            .insertContentAt(currentBlockPos, { type: "paragraph", content: [] })
            .setTextSelection(currentBlockPos + 1)
            .command(({ tr, dispatch }) => {
                if (dispatch) {
                    tr.insertText("/");
                }

                return true;
            })
            .run();
    };

    return (
        <>
            {editor && <BubbleMenu editor={editor} />}
            {editor && <FloatingMenu editor={editor} />}
            <DragHandle editor={editor}>
                <div className="flex items-center gap-1">
                    <button
                        onClick={handlePlusClick}
                        className="flex items-center justify-center w-6 h-6 bg-gray-100 border border-black/10 rounded cursor-pointer hover:bg-gray-50 transition-colors"
                        title="Insert block"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
                        </svg>
                    </button>
                    <div className="flex items-center justify-center w-6 h-6 bg-gray-100 border border-black/10 rounded cursor-grab">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-4"
                        >
                            <path
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                </div>
            </DragHandle>
            <EditorContent
                editor={editor}
                className={`${className} bg-white [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none transition-all duration-200`}
            />
        </>
    );
}
