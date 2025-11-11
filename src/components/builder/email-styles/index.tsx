import { Card, Select, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";
import ArrowPathIcon from "@heroicons/react/24/outline/ArrowPathIcon";
import { useState } from "react";

/**
 * Email styles configuration component.
 *
 * Provides a control panel for configuring global email styles including
 * fonts, colors, spacing, borders, and other visual properties. Updates
 * are applied to global state and reflected in the content editor.
 *
 * @returns {JSX.Element} Email styles component
 */
export default function EmailStyles() {
    const { emailStyles, updateEmailStyle, resetEmailStyles } = useGlobalState();
    const [isSpinning, setIsSpinning] = useState(false);

    const handleReset = () => {
        setIsSpinning(true);
        resetEmailStyles();
        setTimeout(() => setIsSpinning(false), 500);
    };

    return (
        <Card
            title="Email styles"
            action={
                <Tooltip content="Reset email styles to default">
                    <button
                        onClick={handleReset}
                        className="flex h-4 w-4 items-center justify-center transition-colors hover:text-gray-600"
                        title="Reset to defaults"
                    >
                        <ArrowPathIcon className={isSpinning ? "animate-spin" : ""} />
                    </button>
                </Tooltip>
            }
        >
            <Select
                label="Font"
                options={[
                    { value: "Inter", label: "Inter" },
                    { value: "Arial", label: "Arial" },
                    { value: "Helvetica", label: "Helvetica" },
                    { value: "Georgia", label: "Georgia" },
                ]}
                value={emailStyles.font}
                onChange={(value) => updateEmailStyle("font", value)}
                tooltip="Primary font family for email content"
            />

            <Select
                label="Fallback"
                options={[
                    { value: "sans-serif", label: "Sans" },
                    { value: "serif", label: "Serif" },
                    { value: "monospace", label: "Mono" },
                ]}
                value={emailStyles.fallback}
                onChange={(value) => updateEmailStyle("fallback", value)}
                tooltip="Font fallback for unsupported email clients"
            />

            <Spacing
                label="Padding"
                horizontal={emailStyles.padding.horizontal}
                vertical={emailStyles.padding.vertical}
                onChange={(value) => updateEmailStyle("padding", value)}
                tooltip="Inner spacing of the email container"
            />

            <ColorPicker
                label="Body"
                value={emailStyles.bodyColor}
                onChange={(value) => updateEmailStyle("bodyColor", value)}
                tooltip="Text color for email content"
            />

            <Spacing
                label="Margin"
                horizontal={emailStyles.margin.horizontal}
                vertical={emailStyles.margin.vertical}
                onChange={(value) => updateEmailStyle("margin", value)}
                tooltip="Outer spacing around the email container"
            />

            <ColorPicker
                label="Background"
                value={emailStyles.backgroundColor}
                onChange={(value) => updateEmailStyle("backgroundColor", value)}
                tooltip="Background color of the email container"
            />

            <InputNumber
                label="Radius"
                icon="radius"
                value={emailStyles.radius}
                onChange={(value) => updateEmailStyle("radius", value)}
                tooltip="Border radius for rounded corners"
            />

            <InputNumber
                label="Border width"
                icon="border-width"
                value={emailStyles.borderWidth}
                onChange={(value) => updateEmailStyle("borderWidth", value)}
                tooltip="Thickness of the container border"
            />

            <ColorPicker
                label="Border color"
                value={emailStyles.borderColor}
                onChange={(value) => updateEmailStyle("borderColor", value)}
                tooltip="Color of the container border"
            />
        </Card>
    );
}
