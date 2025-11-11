import { Card, Alignment, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";
import { PlusIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
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
    const { blockStylesMap, getBlockStyles, updateBlockStyle, setSelectedBlockId, editor } =
        useGlobalState();
    const [, setSelectionUpdate] = useState(0);
    const [currentBlockId, setCurrentBlockId] = useState<string | null>(null);

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
            if (styles.padding.horizontal > 0 || styles.padding.vertical > 0) {
                styleArray.push(
                    `padding: ${styles.padding.vertical}px ${styles.padding.horizontal}px`
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
                <>
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
                </>
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
                horizontal={currentBlockStyles.padding.horizontal}
                vertical={0}
                onChange={(value) =>
                    updateBlockStyle(currentBlockId, "padding", {
                        ...currentBlockStyles.padding,
                        horizontal: value.horizontal,
                    })
                }
                tooltip="Horizontal padding"
            />

            <Spacing
                label="Y Padding"
                horizontal={0}
                vertical={currentBlockStyles.padding.vertical}
                onChange={(value) =>
                    updateBlockStyle(currentBlockId, "padding", {
                        ...currentBlockStyles.padding,
                        vertical: value.vertical,
                    })
                }
                tooltip="Vertical padding"
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
