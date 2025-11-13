import { useState, useCallback, useEffect, useRef } from "react";
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
import type { BlockStylesMap } from "@/types";
import { generateBlockInlineStyles } from "@/utils";

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
    const { getBlockStyles, setBulkBlockStyles, blockStylesMap } = useBlockStyles();
    const { setEditor } = useEditorContext();
    const [isEditable, setIsEditable] = useState(true);
    const [isInitializing, setIsInitializing] = useState(true);
    const editorRef = useRef<Editor | null>(null);

    const defaultContent = `<h1>This is a very unique heading.</h1><h2>This is H2.</h2><h1>This is H1.</h1><h3>This is H3.</h3><p>This is a unique paragraph. It's so unique, it even has an ID attached to it.</p><p>And this one, too.</p><br><h2>Features List</h2><ul><li>First bullet point item</li><li>Second bullet point item</li><li>Third bullet point item</li></ul><br><h2>Steps to Follow</h2><ol><li>First numbered step</li><li>Second numbered step</li><li>Third numbered step</li></ol>`;

    // Effect to apply styles after blockStylesMap updates
    useEffect(() => {
        if (!isInitializing && editorRef.current) {
            const editor = editorRef.current;
            const { state } = editor;
            const { tr } = state;
            let modified = false;

            // Helper to convert camelCase to kebab-case
            const camelToKebab = (str: string) =>
                str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

            // Apply styles to all blocks in a single transaction
            editor.state.doc.descendants((node, pos) => {
                const blockId = node.attrs.id;
                if (blockId && (node.type.name === "heading" || node.type.name === "paragraph")) {
                    const styles = blockStylesMap[blockId];
                    if (styles) {
                        // Generate inline styles
                        const inlineStyles = generateBlockInlineStyles(styles);
                        const styleString = Object.entries(inlineStyles)
                            .map(([key, value]) => `${camelToKebab(key)}: ${value}`)
                            .join("; ");

                        // Update node attributes with style
                        tr.setNodeMarkup(pos, null, { ...node.attrs, style: styleString });
                        modified = true;
                    }
                }
            });

            // Dispatch the transaction if we made changes
            if (modified) {
                editor.view.dispatch(tr);
            }
        }
    }, [blockStylesMap, isInitializing]);
    const toggleEditable = () => {
        setIsEditable((prev) => !prev);
    };

    // Generate dynamic CSS from emailStyles
    const { css: dynamicCSS, className } = useDynamicCss(emailStyles, updateEmailStyle);

    // Callback for when editor is ready
    const handleEditorReady = useCallback(
        (editor: Editor) => {
            setEditor(editor);
            editorRef.current = editor;

            // Wait for editor to be fully mounted and stable
            // Use requestAnimationFrame twice to ensure all DOM updates are complete
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Collect all styles first, then apply in a single update
                    const bulkStyles: BlockStylesMap = {};

                    // Apply default styles to all existing blocks in the initial content
                    editor.state.doc.descendants((node) => {
                        const blockId = node.attrs.id;
                        if (!blockId) return;

                        // Check if block already has styles
                        const existingStyles = getBlockStyles(blockId);
                        const hasCustomStyles =
                            existingStyles && Object.keys(existingStyles).length > 0;

                        // Only apply default styles if the block doesn't have any custom styles yet
                        if (!hasCustomStyles) {
                            // Handle headings
                            if (node.type.name === "heading" && node.attrs.level) {
                                const defaultStyles = getDefaultStylesForLevel(node.attrs.level);
                                if (defaultStyles) {
                                    bulkStyles[blockId] = defaultStyles;
                                }
                            }
                            // Handle paragraphs
                            else if (node.type.name === "paragraph") {
                                bulkStyles[blockId] = DEFAULT_P_STYLES;
                            }
                        }
                    });

                    // Apply all styles in ONE single state update
                    setBulkBlockStyles(bulkStyles);

                    // Mark initialization as complete - this will trigger the useEffect
                    setIsInitializing(false);
                });
            });
        },
        [setEditor, getBlockStyles, setBulkBlockStyles, setIsInitializing]
    );

    // Callback for when a new heading block is created
    const handleHeadingBlockCreated = useCallback(
        (blockId: string, level: number) => {
            // Skip if we're still initializing (onCreate fires during initial render)
            if (isInitializing) {
                return;
            }

            // Check if block already has styles
            const existingStyles = getBlockStyles(blockId);
            const hasCustomStyles = existingStyles && Object.keys(existingStyles).length > 0;

            // Only apply default styles if the block doesn't have any custom styles yet
            if (!hasCustomStyles) {
                const defaultStyles = getDefaultStylesForLevel(level);
                if (defaultStyles) {
                    // Apply all styles in a single bulk update
                    setBulkBlockStyles({ [blockId]: defaultStyles });
                }
            }
        },
        [getBlockStyles, setBulkBlockStyles, isInitializing]
    );

    // Callback for when a new paragraph block is created
    const handleParagraphBlockCreated = useCallback(
        (blockId: string) => {
            // Skip if we're still initializing (onCreate fires during initial render)
            if (isInitializing) {
                return;
            }

            // Check if block already has styles
            const existingStyles = getBlockStyles(blockId);
            const hasCustomStyles = existingStyles && Object.keys(existingStyles).length > 0;

            // Only apply default styles if the block doesn't have any custom styles yet
            if (!hasCustomStyles) {
                // Apply all styles in a single bulk update
                setBulkBlockStyles({ [blockId]: DEFAULT_P_STYLES });
            }
        },
        [getBlockStyles, setBulkBlockStyles, isInitializing]
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
