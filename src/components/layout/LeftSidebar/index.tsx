import { Card, Select, Spacing, ColorPicker, InputNumber } from "@/components/ui";
import { useGlobalState } from "@/context/GlobalState";

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
                    />

                    <Spacing
                        label="Padding"
                        horizontal={emailStyles.padding.horizontal}
                        vertical={emailStyles.padding.vertical}
                        onChange={(value) => updateEmailStyle("padding", value)}
                    />

                    <ColorPicker
                        label="Body"
                        value={emailStyles.bodyColor}
                        onChange={(value) => updateEmailStyle("bodyColor", value)}
                    />

                    <Spacing
                        label="Margin"
                        horizontal={emailStyles.margin.horizontal}
                        vertical={emailStyles.margin.vertical}
                        onChange={(value) => updateEmailStyle("margin", value)}
                    />

                    <ColorPicker
                        label="Background"
                        value={emailStyles.backgroundColor}
                        onChange={(value) => updateEmailStyle("backgroundColor", value)}
                    />

                    <InputNumber
                        label="Radius"
                        icon="radius"
                        value={emailStyles.radius}
                        onChange={(value) => updateEmailStyle("radius", value)}
                    />

                    <InputNumber
                        label="Border width"
                        icon="border-width"
                        value={emailStyles.borderWidth}
                        onChange={(value) => updateEmailStyle("borderWidth", value)}
                    />

                    <ColorPicker
                        label="Border color"
                        value={emailStyles.borderColor}
                        onChange={(value) => updateEmailStyle("borderColor", value)}
                    />
                </Card>
            </div>
        </aside>
    );
}
