import { Card, Select, Spacing, ColorPicker, InputNumber } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";

/**
 * Left sidebar component with email styling controls.
 *
 * Provides a control panel for configuring global email styles including
 * fonts, colors, spacing, borders, and other visual properties. Updates
 * are applied to global state and reflected in the content editor.
 *
 * @returns {JSX.Element} Left sidebar component
 */
export default function LeftSidebar() {
    const { emailStyles, updateEmailStyle } = useGlobalState();

    return (
        <aside className="w-64 border-r bg-gray-50">
            <div className="min-h-[44px] w-full px-2">
                <Card title="Email styles">
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
            </div>
        </aside>
    );
}
