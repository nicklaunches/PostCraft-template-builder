import { Card, Select, Spacing, ColorPicker, InputNumber } from "@/components/ui";

export default function LeftSidebar() {
    return (
        <aside className="w-64 border-r bg-gray-50">
            <div className="min-h-[44px] w-full px-2">
                <Card title="Email styles">
                    <Select
                        label="Font"
                        options={[{ value: "Inter", label: "Inter" }]}
                        defaultValue="Inter"
                    />

                    <Select
                        label="Fallback"
                        options={[
                            { value: "sans-serif", label: "Sans" },
                            { value: "serif", label: "Serif" },
                            { value: "monospace", label: "Mono" },
                        ]}
                        defaultValue="sans-serif"
                    />

                    <Spacing label="Padding" />

                    <ColorPicker label="Body" />

                    <Spacing label="Margin" />

                    <ColorPicker label="Background" />

                    <InputNumber label="Radius" icon="radius" />

                    <InputNumber label="Border width" icon="border-width" />

                    <ColorPicker label="Border color" />
                </Card>
            </div>
        </aside>
    );
}
