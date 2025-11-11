import { Card, Alignment, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";
import { PlusIcon, DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";

/**
 * Block styles configuration component.
 *
 * Provides a control panel for configuring block-specific styles including
 * alignment, border, padding, and background color. Updates are applied to
 * global state and reflected in the content editor.
 *
 * @returns {JSX.Element} Block styles component
 */
export default function BlockStyles() {
    const { blockStyles, updateBlockStyle } = useGlobalState();

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
                    <Tooltip content="Copy (duplicate current block)">
                        <button
                            onClick={handleDuplicateBlock}
                            className="flex h-4 w-4 items-center justify-center transition-colors hover:text-gray-600"
                            title="Copy"
                        >
                            <DocumentDuplicateIcon />
                        </button>
                    </Tooltip>
                    <Tooltip content="Delete (will delete current block)">
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
                label="Border"
                icon="border-width"
                value={blockStyles.borderWidth}
                onChange={(value) => updateBlockStyle("borderWidth", value)}
                tooltip="Border width of the block"
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
                tooltip="Horizontal padding (left and right)"
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
                tooltip="Vertical padding (top and bottom)"
            />

            <ColorPicker
                label="Background"
                value={blockStyles.backgroundColor}
                onChange={(value) => updateBlockStyle("backgroundColor", value)}
                tooltip="Background color of the block"
                labelPosition="top"
            />
        </Card>
    );
}
