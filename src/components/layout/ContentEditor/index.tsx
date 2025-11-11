import DragHandle from "@tiptap/extension-drag-handle-react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";
import { useGlobalState } from "@/context/GlobalState";

/**
 * Props for the ContentEditor component.
 *
 * @property {any} [initialContent] - Initial content to load in the editor
 * @property {(content: any) => void} [onSave] - Callback when content is saved
 */
export interface ContentEditorProps {
    initialContent?: any;
    onSave?: (content: any) => void;
}

/**
 * Rich text content editor with drag handle and dynamic styling.
 *
 * Provides a TipTap-based WYSIWYG editor with drag-and-drop block reordering.
 * Applies email styles from global state dynamically via CSS-in-JS. Includes
 * a toggle for editable mode.
 *
 * @param {ContentEditorProps} props - Component props
 * @returns {JSX.Element} Content editor component
 */
export default function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    const { emailStyles } = useGlobalState();

    // Generate a unique class name for this template
    const className = useMemo(() => {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let result = "postcraft-email-";
        for (let i = 0; i < 10; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }, []);

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

    // Generate dynamic CSS from emailStyles
    const dynamicCSS = useMemo(() => {
        let css = `.${className} {\n`;

        css += `  font-family: ${emailStyles.font}, ${emailStyles.fallback};\n`;
        css += `  padding: ${emailStyles.padding.vertical}px ${emailStyles.padding.horizontal}px;\n`;
        css += `  margin: ${emailStyles.margin.vertical}px ${emailStyles.margin.horizontal}px;\n`;

        if (emailStyles.bodyColor) {
            css += `  color: ${emailStyles.bodyColor};\n`;
        }

        if (emailStyles.backgroundColor) {
            css += `  background-color: ${emailStyles.backgroundColor};\n`;
        }

        if (emailStyles.radius > 0) {
            css += `  border-radius: ${emailStyles.radius}px;\n`;
        }

        if (emailStyles.borderWidth > 0) {
            css += `  border-width: ${emailStyles.borderWidth}px;\n`;
            css += `  border-style: solid;\n`;

            if (emailStyles.borderColor) {
                css += `  border-color: ${emailStyles.borderColor};\n`;
            }
        }

        css += `}`;
        return css;
    }, [className, emailStyles]);

    return (
        <main className="flex-1 overflow-y-auto bg-gray-100">
            <style>{dynamicCSS}</style>
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
                    className={`${className} bg-white [&_.ProseMirror]:outline-none [&_.ProseMirror]:focus:outline-none transition-all duration-200`}
                />
            </div>
        </main>
    );
}
