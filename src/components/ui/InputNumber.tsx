import Label from "./Label";
import { RadiusIcon, BorderWidthIcon } from "@/utils/icons";

interface InputNumberProps {
    label: string;
    value?: number;
    defaultValue?: number;
    icon?: "radius" | "border-width";
    onChange?: (value: number) => void;
}

export default function InputNumber({
    label,
    value,
    defaultValue = 0,
    icon,
    onChange,
}: InputNumberProps) {
    const renderIcon = () => {
        if (icon === "radius") {
            return <RadiusIcon />;
        }

        if (icon === "border-width") {
            return <BorderWidthIcon />;
        }

        return null;
    };

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                    {renderIcon()}
                    <input
                        type="number"
                        className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                        value={value}
                        defaultValue={defaultValue}
                        onChange={(e) => onChange?.(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
        </div>
    );
}
