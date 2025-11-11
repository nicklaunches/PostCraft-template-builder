import { Card, Alignment, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";
import { PlusIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

/**
 * Block styles configuration component.
 *
 * Provides a control panel for configuring block-specific styles including
 * alignment, border radius, padding, and background color. Updates are applied
 * to the currently selected block in the TipTap editor in real-time via inline
 * styles. Listens to editor selection changes to ensure styles are applied to
 * the active block.
 *
 * Includes actions for creating components, duplicating, and deleting blocks.
 *
 * @returns {JSX.Element} Block styles component
 */
export default function BlockStyles() {
    const { blockStyles, updateBlockStyle, editor } = useGlobalState();
    const [, setSelectionUpdate] = useState(0);

    // Listen to selection changes in the editor
    useEffect(() => {
        if (!editor) return;

        const handleUpdate = () => {
            setSelectionUpdate((prev) => prev + 1);
        };

        editor.on("selectionUpdate", handleUpdate);
        editor.on("transaction", handleUpdate);

        return () => {
            editor.off("selectionUpdate", handleUpdate);
            editor.off("transaction", handleUpdate);
        };
    }, [editor]);

    // Apply block styles to the currently selected node in the editor
    useEffect(() => {
        if (!editor) return;

        const applyStylesToNode = () => {
            const { state } = editor;
            const { from } = state.selection;
            const node = state.doc.nodeAt(from);

            if (!node) return;

            // Build inline style string
            const styles: string[] = [];

            // Padding
            if (blockStyles.padding.horizontal > 0 || blockStyles.padding.vertical > 0) {
                styles.push(
                    `padding: ${blockStyles.padding.vertical}px ${blockStyles.padding.horizontal}px`
                );
            }

            // Radius
            if (blockStyles.borderWidth > 0) {
                styles.push(`border-radius: ${blockStyles.borderWidth}px`);
            }

            // Background
            if (blockStyles.backgroundColor) {
                styles.push(`background-color: ${blockStyles.backgroundColor}`);
            }

            // Alignment
            if (blockStyles.alignment) {
                styles.push(`text-align: ${blockStyles.alignment}`);
            }

            const styleString = styles.join("; ");

            // Apply styles to the current node
            const nodeType = node.type.name;
            if (nodeType === "paragraph" || nodeType === "heading") {
                editor.chain().focus().updateAttributes(nodeType, { style: styleString }).run();
            }
        };

        applyStylesToNode();
    }, [blockStyles, editor]);

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
                value={blockStyles.alignment}
                onChange={(value) => updateBlockStyle("alignment", value)}
            />

            <InputNumber
                label="Radius"
                icon="radius"
                value={blockStyles.borderWidth}
                onChange={(value) => updateBlockStyle("borderWidth", value)}
                tooltip="Border radius"
            />

            <Spacing
                label="X Padding"
                horizontal={blockStyles.padding.horizontal}
                vertical={0}
                onChange={(value) =>
                    updateBlockStyle("padding", {
                        ...blockStyles.padding,
                        horizontal: value.horizontal,
                    })
                }
                tooltip="Horizontal padding"
            />

            <Spacing
                label="Y Padding"
                horizontal={0}
                vertical={blockStyles.padding.vertical}
                onChange={(value) =>
                    updateBlockStyle("padding", {
                        ...blockStyles.padding,
                        vertical: value.vertical,
                    })
                }
                tooltip="Vertical padding"
            />

            <ColorPicker
                label="Background"
                value={blockStyles.backgroundColor}
                onChange={(value) => updateBlockStyle("backgroundColor", value)}
                tooltip="Background color"
                labelPosition="top"
                position="left"
            />
        </Card>
    );
}
