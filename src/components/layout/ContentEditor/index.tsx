import { useState, useCallback } from "react";
import type { Editor } from "@tiptap/core";
import type { JSONContent } from "@tiptap/core";
import { useEmailStyles } from "@/context/EmailStylesContext";
import { useBlockStyles } from "@/context/BlockStylesContext";
import { useEditorContext } from "@/context/EditorContext";
import { useDynamicCss } from "@/hooks";
import { ExtendedTipTap } from "@/components/ui";
import { ErrorBoundary } from "@/components/shared/ErrorBoundary";
import { getDefaultStylesForLevel } from "@/utils/editor/extensions/heading-with-style";
import { DEFAULT_P_STYLES } from "@/utils/constants";

/**
 * Props for the ContentEditor component.
 *
 * @property {JSONContent} [initialContent] - Initial content to load in the editor
 * @property {(content: JSONContent) => void} [onSave] - Callback when content is saved
 */
export interface ContentEditorProps {
    initialContent?: JSONContent;
    onSave?: (content: JSONContent) => void;
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
export function ContentEditor({
    initialContent: _initialContent,
    onSave: _onSave,
}: ContentEditorProps) {
    const { emailStyles, updateEmailStyle } = useEmailStyles();
    const { updateBlockStyle, getBlockStyles, setDefaultBlockStyles } = useBlockStyles();
    const { setEditor } = useEditorContext();
    const [isEditable, setIsEditable] = useState(true);

    const defaultContent = `<h1>This is a very unique heading.</h1><p>This is a unique paragraph. It's so unique, it even has an ID attached to it.</p><p>And this one, too.</p>`;

    const toggleEditable = () => {
        setIsEditable((prev) => !prev);
    };

    // Generate dynamic CSS from emailStyles
    const { css: dynamicCSS, className } = useDynamicCss(emailStyles, updateEmailStyle);

    // Callback for when editor is ready - store the setDefaultBlockStyles function
    const handleEditorReady = useCallback(
        (editor: Editor) => {
            setEditor(editor);
            // Store setDefaultBlockStyles in editor's storage for access in slash commands
            // Using any cast since we're extending storage with custom properties
            if (editor && editor.storage) {
                (editor.storage as any).setDefaultBlockStyles = setDefaultBlockStyles;
            }
        },
        [setEditor, setDefaultBlockStyles]
    );

    // Callback for when a new heading block is created
    const handleHeadingBlockCreated = useCallback(
        (blockId: string, level: number) => {
            // Check if block already has styles
            const existingStyles = getBlockStyles(blockId);
            const hasCustomStyles = existingStyles && Object.keys(existingStyles).length > 0;

            // Only apply default styles if the block doesn't have any custom styles yet
            if (!hasCustomStyles) {
                const defaultStyles = getDefaultStylesForLevel(level);
                if (defaultStyles) {
                    // Apply each default style property
                    Object.entries(defaultStyles).forEach(([key, value]) => {
                        updateBlockStyle(blockId, key as keyof typeof defaultStyles, value);
                    });
                }
            }
        },
        [getBlockStyles, updateBlockStyle]
    );

    // Callback for when a new paragraph block is created
    const handleParagraphBlockCreated = useCallback(
        (blockId: string) => {
            // Check if block already has styles
            const existingStyles = getBlockStyles(blockId);
            const hasCustomStyles = existingStyles && Object.keys(existingStyles).length > 0;

            // Only apply default styles if the block doesn't have any custom styles yet
            if (!hasCustomStyles) {
                // Apply each default style property for paragraphs
                Object.entries(DEFAULT_P_STYLES).forEach(([key, value]) => {
                    updateBlockStyle(blockId, key as keyof typeof DEFAULT_P_STYLES, value);
                });
            }
        },
        [getBlockStyles, updateBlockStyle]
    );

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
                        onEditorReady={handleEditorReady}
                        onHeadingBlockCreated={handleHeadingBlockCreated}
                        onParagraphBlockCreated={handleParagraphBlockCreated}
                    />
                </ErrorBoundary>
            </div>
        </main>
    );
}
