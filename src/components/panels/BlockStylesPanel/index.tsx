import { Card, Alignment, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useBlockStyles } from "@/context/BlockStylesContext";
import { useEditorContext } from "@/context/EditorContext";
import { applyBlockStylesToNode } from "@/utils/styleApplicator";
import {
    getBlockIdFromSelection,
    getBlockNodeInfoFromSelection,
    duplicateBlock,
    deleteBlock,
} from "@/utils/helpers";
import { PlusIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { useEffect, useState } from "react";

/**
 * Block styles configuration component.
 *
 * Provides a control panel for configuring block-specific styles including
 * alignment, border radius, padding, and background color. Each block in the
 * editor has its own set of styles stored in GlobalState by block ID. Updates
 * are applied to the currently selected block in the TipTap editor in real-time
 * via inline styles. Listens to editor selection changes to ensure the correct
 * block's styles are displayed and edited.
 *
 * Includes actions for creating components, duplicating, and deleting blocks.
 *
 * @returns {JSX.Element} Block styles component
 */
export default function BlockStyles() {
    const {
        blockStylesMap,
        getBlockStyles,
        updateBlockStyle,
        deleteBlockStyles,
        setSelectedBlockId,
        resetAllBlockStyles,
    } = useBlockStyles();
    const { editor } = useEditorContext();
    const [, setSelectionUpdate] = useState(0);
    const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    // Get the current block's styles (may be undefined for new blocks)
    const currentBlockStyles = currentBlockId ? getBlockStyles(currentBlockId) : undefined;

    // Listen to selection changes in the editor to update the current block ID
    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            const blockId = getBlockIdFromSelection(editor);
            setCurrentBlockId(blockId);
            setSelectedBlockId(blockId);
            setSelectionUpdate((prev) => prev + 1);
        };

        editor.on("selectionUpdate", handleUpdate);
        editor.on("transaction", handleUpdate);

        // Initialize on mount
        handleUpdate();

        return () => {
            editor.off("selectionUpdate", handleUpdate);
            editor.off("transaction", handleUpdate);
        };
    }, [editor, setSelectedBlockId]);

    // Apply block styles to the currently selected node in the editor
    useEffect(() => {
        if (!editor || !currentBlockId) {
            return;
        }

        const { nodeType } = getBlockNodeInfoFromSelection(editor);

        if (!nodeType) {
            return;
        }

        const styles = getBlockStyles(currentBlockId);
        applyBlockStylesToNode(editor, nodeType, styles);
    }, [currentBlockId, blockStylesMap, editor, getBlockStyles]);

    const handleReset = () => {
        setIsSpinning(true);
        resetAllBlockStyles();
        setTimeout(() => setIsSpinning(false), 500);
    };

    const handleCreateComponent = () => {
        // TODO: Implement create component functionality
        console.log("Create component");
    };

    const handleDuplicateBlock = () => {
        if (!editor || !currentBlockId) return;

        const newId = duplicateBlock(editor, currentBlockId, (oldId, newId) => {
            const currentStyles = getBlockStyles(oldId);
            if (currentStyles) {
                Object.entries(currentStyles).forEach(([key, value]) => {
                    updateBlockStyle(newId, key as keyof typeof currentStyles, value);
                });
            }
        });

        if (newId) {
            setSelectedBlockId(newId);
            console.log("Block duplicated:", currentBlockId, "->", newId);
        }
    };

    const handleDeleteBlock = () => {
        if (!editor || !currentBlockId) return;

        if (deleteBlock(editor, currentBlockId)) {
            deleteBlockStyles(currentBlockId);
            setSelectedBlockId(null);
            console.log("Block deleted:", currentBlockId);
        }
    };

    // If no block is selected, show a message
    if (!currentBlockId) {
        return (
            <Card title="Block styles">
                <div className="text-sm text-gray-500 py-4">Select a block to edit its styles</div>
            </Card>
        );
    }

    return (
        <Card
            title="Block styles"
            action={
                <div className="flex space-x-2">
                    <Tooltip content="Reset block styles to default">
                        <button
                            onClick={handleReset}
                            className="flex h-4 w-4 items-center justify-center transition-colors hover:text-gray-600"
                            title="Reset to defaults"
                        >
                            <ArrowPathIcon className={isSpinning ? "animate-spin" : ""} />
                        </button>
                    </Tooltip>
                    <Tooltip content="Create component">
                        <button
                            onClick={handleCreateComponent}
                            className="flex h-4 w-4 items-center justify-center transition-colors hover:text-gray-600"
                            title="Create component"
                        >
                            <PlusIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Duplicate">
                        <button
                            onClick={handleDuplicateBlock}
                            className="flex h-4 w-4 items-center justify-center transition-colors hover:text-gray-600"
                            title="Duplicate"
                        >
                            <DocumentDuplicateIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Delete">
                        <button
                            onClick={handleDeleteBlock}
                            className="flex h-4 w-4 items-center justify-center transition-colors hover:text-gray-600"
                            title="Delete"
                        >
                            <TrashIcon />
                        </button>
                    </Tooltip>
                </div>
            }
        >
            <Alignment
                label="Alignment"
                value={currentBlockStyles?.alignment || "left"}
                onChange={(value) => updateBlockStyle(currentBlockId, "alignment", value)}
            />

            <InputNumber
                label="Radius"
                icon="radius"
                value={currentBlockStyles?.borderRadius || 0}
                onChange={(value) => updateBlockStyle(currentBlockId, "borderRadius", value)}
                tooltip="Border radius"
            />

            <Spacing
                label="X Padding"
                horizontal={currentBlockStyles?.paddingLeft || 0}
                vertical={currentBlockStyles?.paddingRight || 0}
                onHorizontalChange={(value) =>
                    updateBlockStyle(currentBlockId, "paddingLeft", value)
                }
                onVerticalChange={(value) =>
                    updateBlockStyle(currentBlockId, "paddingRight", value)
                }
                tooltip="Horizontal padding (left and right)"
            />

            <Spacing
                label="Y Padding"
                horizontal={currentBlockStyles?.paddingTop || 0}
                vertical={currentBlockStyles?.paddingBottom || 0}
                onHorizontalChange={(value) =>
                    updateBlockStyle(currentBlockId, "paddingTop", value)
                }
                onVerticalChange={(value) =>
                    updateBlockStyle(currentBlockId, "paddingBottom", value)
                }
                tooltip="Vertical padding (top and bottom)"
            />

            <Spacing
                label="X Margin"
                horizontal={currentBlockStyles?.marginLeft || 0}
                vertical={currentBlockStyles?.marginRight || 0}
                onHorizontalChange={(value) =>
                    updateBlockStyle(currentBlockId, "marginLeft", value)
                }
                onVerticalChange={(value) => updateBlockStyle(currentBlockId, "marginRight", value)}
                tooltip="Horizontal margin (left and right)"
            />

            <Spacing
                label="Y Margin"
                horizontal={currentBlockStyles?.marginTop || 0}
                vertical={currentBlockStyles?.marginBottom || 0}
                onHorizontalChange={(value) => updateBlockStyle(currentBlockId, "marginTop", value)}
                onVerticalChange={(value) =>
                    updateBlockStyle(currentBlockId, "marginBottom", value)
                }
                tooltip="Vertical margin (top and bottom)"
            />

            <ColorPicker
                label="Background"
                value={currentBlockStyles?.backgroundColor || ""}
                onChange={(value) => updateBlockStyle(currentBlockId, "backgroundColor", value)}
                tooltip="Background color"
                labelPosition="top"
                position="left"
            />

            <InputNumber
                label="Size"
                icon="font-size"
                value={currentBlockStyles?.fontSize || 15}
                onChange={(value) => updateBlockStyle(currentBlockId, "fontSize", value)}
                tooltip="Font size"
            />

            <InputNumber
                label="Line height"
                icon="line-height"
                value={currentBlockStyles?.lineHeight || 150}
                onChange={(value) => updateBlockStyle(currentBlockId, "lineHeight", value)}
                tooltip="Line height"
                suffix="%"
            />

            <ColorPicker
                label="Color"
                value={currentBlockStyles?.color || "#000000"}
                onChange={(value) => updateBlockStyle(currentBlockId, "color", value)}
                tooltip="Text color"
                labelPosition="top"
                position="left"
            />
        </Card>
    );
}
