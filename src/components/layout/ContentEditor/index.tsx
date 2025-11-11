import { useState } from "react";
import { useGlobalState } from "@/context/GlobalState";
import { useDynamicCss } from "@/hooks";
import { ExtendedTipTap } from "@/components/ui";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

/**
 * Props for the ContentEditor component.
 *
 * @property {unknown} [initialContent] - Initial content to load in the editor
 * @property {(content: unknown) => void} [onSave] - Callback when content is saved
 */
export interface ContentEditorProps {
    initialContent?: unknown;
    onSave?: (content: unknown) => void;
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
    const { emailStyles, updateEmailStyle, setEditor } = useGlobalState();
    const [isEditable, setIsEditable] = useState(true);

    const defaultContent = `<h1>This is a very unique heading.</h1><p>This is a unique paragraph. It's so unique, it even has an ID attached to it.</p><p>And this one, too.</p>`;

    const toggleEditable = () => {
        setIsEditable((prev) => !prev);
    };

    // Generate dynamic CSS from emailStyles
    const { css: dynamicCSS, className } = useDynamicCss(emailStyles, updateEmailStyle);

    return (
        <main
            className="flex-1 overflow-y-auto"
            style={{ backgroundColor: emailStyles.backgroundColor }}
        >
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
                <ErrorBoundary
                    fallback={
                        <div className="p-8 text-center text-red-600 border border-red-300 rounded">
                            Rich text editor failed to initialize
                        </div>
                    }
                >
                    <ExtendedTipTap
                        initialContent={defaultContent}
                        className={className}
                        editable={isEditable}
                        onEditorReady={setEditor}
                    />
                </ErrorBoundary>
            </div>
        </main>
    );
}
