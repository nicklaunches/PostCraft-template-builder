import { Card, Alignment, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";
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
        setSelectedBlockId,
        editor,
        resetAllBlockStyles,
    } = useGlobalState();
    const [, setSelectionUpdate] = useState(0);
    const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);
    const [isSpinning, setIsSpinning] = useState(false);

    // Get the current block's styles or defaults
    const currentBlockStyles = currentBlockId ? getBlockStyles(currentBlockId) : getBlockStyles("");

    // Listen to selection changes in the editor to update the current block ID
    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            // Find the parent block node (paragraph, heading, etc.)
            let depth = $from.depth;
            let blockId: string | null = null;

            while (depth > 0) {
                const node = $from.node(depth);
                if (node.type.name === "paragraph" || node.type.name === "heading") {
                    blockId = node.attrs.id || null;
                    break;
                }
                depth--;
            }

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

        const applyStylesToNode = () => {
            const { state } = editor;
            const { selection } = state;
            const { $from } = selection;

            // Get the parent block node (paragraph, heading, etc.)
            let depth = $from.depth;
            let parentNode = null;
            let nodeType = null;

            while (depth > 0) {
                const node = $from.node(depth);
                if (node.type.name === "paragraph" || node.type.name === "heading") {
                    if (node.attrs.id === currentBlockId) {
                        parentNode = node;
                        nodeType = node.type.name;
                        break;
                    }
                }
                depth--;
            }

            if (!parentNode || !nodeType) {
                return;
            }

            const styles = getBlockStyles(currentBlockId);

            // Build inline style string
            const styleArray: string[] = [];

            // Padding
            if (
                styles.paddingLeft > 0 ||
                styles.paddingRight > 0 ||
                styles.paddingTop > 0 ||
                styles.paddingBottom > 0
            ) {
                styleArray.push(
                    `padding: ${styles.paddingTop}px ${styles.paddingRight}px ${styles.paddingBottom}px ${styles.paddingLeft}px`
                );
            }

            // Margin
            if (
                styles.marginLeft > 0 ||
                styles.marginRight > 0 ||
                styles.marginTop > 0 ||
                styles.marginBottom > 0
            ) {
                styleArray.push(
                    `margin: ${styles.marginTop}px ${styles.marginRight}px ${styles.marginBottom}px ${styles.marginLeft}px`
                );
            }

            // Radius (border-radius)
            if (styles.borderWidth > 0) {
                styleArray.push(`border-radius: ${styles.borderWidth}px`);
            }

            // Background
            if (styles.backgroundColor) {
                styleArray.push(`background-color: ${styles.backgroundColor}`);
            }

            // Alignment
            if (styles.alignment) {
                styleArray.push(`text-align: ${styles.alignment}`);
            }

            const styleString = styleArray.join("; ");

            // Apply styles to the current node
            editor.chain().focus().updateAttributes(nodeType, { style: styleString }).run();
        };

        applyStylesToNode();
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
        // TODO: Implement duplicate block functionality
        console.log("Duplicate current block");
    };

    const handleDeleteBlock = () => {
        // TODO: Implement delete block functionality
        console.log("Delete current block");
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
                value={currentBlockStyles.alignment}
                onChange={(value) => updateBlockStyle(currentBlockId, "alignment", value)}
            />

            <InputNumber
                label="Radius"
                icon="radius"
                value={currentBlockStyles.borderWidth}
                onChange={(value) => updateBlockStyle(currentBlockId, "borderWidth", value)}
                tooltip="Border radius"
            />

            <Spacing
                label="X Padding"
                horizontal={currentBlockStyles.paddingLeft}
                vertical={currentBlockStyles.paddingRight}
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
                horizontal={currentBlockStyles.paddingTop}
                vertical={currentBlockStyles.paddingBottom}
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
                horizontal={currentBlockStyles.marginLeft}
                vertical={currentBlockStyles.marginRight}
                onHorizontalChange={(value) =>
                    updateBlockStyle(currentBlockId, "marginLeft", value)
                }
                onVerticalChange={(value) => updateBlockStyle(currentBlockId, "marginRight", value)}
                tooltip="Horizontal margin (left and right)"
            />

            <Spacing
                label="Y Margin"
                horizontal={currentBlockStyles.marginTop}
                vertical={currentBlockStyles.marginBottom}
                onHorizontalChange={(value) => updateBlockStyle(currentBlockId, "marginTop", value)}
                onVerticalChange={(value) =>
                    updateBlockStyle(currentBlockId, "marginBottom", value)
                }
                tooltip="Vertical margin (top and bottom)"
            />

            <ColorPicker
                label="Background"
                value={currentBlockStyles.backgroundColor}
                onChange={(value) => updateBlockStyle(currentBlockId, "backgroundColor", value)}
                tooltip="Background color"
                labelPosition="top"
                position="left"
            />
        </Card>
    );
}
