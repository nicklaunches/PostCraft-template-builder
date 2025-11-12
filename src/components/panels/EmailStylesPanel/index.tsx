import { Card, Select, Spacing, ColorPicker, InputNumber, Tooltip } from "@/components/ui";
import { useEmailStyles } from "@/context/EmailStylesContext";
import { FONT_OPTIONS, FALLBACK_OPTIONS } from "@/utils/constants";
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
    const { emailStyles, updateEmailStyle, resetEmailStyles } = useEmailStyles();
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
                options={FONT_OPTIONS}
                value={emailStyles.font}
                onChange={(value) => updateEmailStyle("font", value)}
                tooltip="Primary font family for email content"
            />

            <Select
                label="Fallback"
                options={FALLBACK_OPTIONS}
                value={emailStyles.fallback}
                onChange={(value) => updateEmailStyle("fallback", value)}
                tooltip="Font fallback for unsupported email clients"
            />

            <Spacing
                label="X Padding"
                horizontal={emailStyles.paddingLeft}
                vertical={emailStyles.paddingRight}
                onHorizontalChange={(value) => updateEmailStyle("paddingLeft", value)}
                onVerticalChange={(value) => updateEmailStyle("paddingRight", value)}
                tooltip="Horizontal padding (left and right) of the email container"
            />

            <Spacing
                label="Y Padding"
                horizontal={emailStyles.paddingTop}
                vertical={emailStyles.paddingBottom}
                onHorizontalChange={(value) => updateEmailStyle("paddingTop", value)}
                onVerticalChange={(value) => updateEmailStyle("paddingBottom", value)}
                tooltip="Vertical padding (top and bottom) of the email container"
            />

            <Spacing
                label="X Margin"
                horizontal={emailStyles.marginLeft}
                vertical={emailStyles.marginRight}
                onHorizontalChange={(value) => updateEmailStyle("marginLeft", value)}
                onVerticalChange={(value) => updateEmailStyle("marginRight", value)}
                tooltip="Horizontal margin (left and right) around the email container"
            />

            <Spacing
                label="Y Margin"
                horizontal={emailStyles.marginTop}
                vertical={emailStyles.marginBottom}
                onHorizontalChange={(value) => updateEmailStyle("marginTop", value)}
                onVerticalChange={(value) => updateEmailStyle("marginBottom", value)}
                tooltip="Vertical margin (top and bottom) around the email container"
            />

            <ColorPicker
                label="Text color"
                value={emailStyles.bodyColor}
                onChange={(value) => updateEmailStyle("bodyColor", value)}
                tooltip="Text color for email content"
                labelPosition="top"
            />

            <ColorPicker
                label="Content background"
                value={emailStyles.contentBackgroundColor}
                onChange={(value) => updateEmailStyle("contentBackgroundColor", value)}
                tooltip="Background color of the email content container"
                labelPosition="top"
            />

            <ColorPicker
                label="Page background"
                value={emailStyles.backgroundColor}
                onChange={(value) => updateEmailStyle("backgroundColor", value)}
                tooltip="Background color of the page"
                labelPosition="top"
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
