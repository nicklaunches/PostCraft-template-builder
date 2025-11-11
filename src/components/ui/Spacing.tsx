import Label from "./Label";
import Tooltip from "./Tooltip";
import { PaddingHorizontalIcon, PaddingVerticalIcon } from "@/utils/icons";

interface SpacingProps {
    label: string;
    horizontal?: number;
    vertical?: number;
    defaultHorizontal?: number;
    defaultVertical?: number;
    onChange?: (value: { horizontal: number; vertical: number }) => void;
    onHorizontalChange?: (value: number) => void;
    onVerticalChange?: (value: number) => void;
    tooltip?: string;
}

export default function Spacing({
    label,
    horizontal,
    vertical,
    defaultHorizontal = 0,
    defaultVertical = 0,
    onChange,
    onHorizontalChange,
    onVerticalChange,
    tooltip,
}: SpacingProps) {
    const handleHorizontalChange = (newValue: number) => {
        if (onChange) {
            onChange({ horizontal: newValue, vertical: vertical ?? defaultVertical });
        }
        onHorizontalChange?.(newValue);
    };

    const handleVerticalChange = (newValue: number) => {
        if (onChange) {
            onChange({ horizontal: horizontal ?? defaultHorizontal, vertical: newValue });
        }
        onVerticalChange?.(newValue);
    };

    const spacingInputs = (
        <div className="flex space-x-2">
            {/* Horizontal */}
            <div className="flex-1">
                <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                    <PaddingHorizontalIcon />
                    <input
                        type="number"
                        className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                        value={horizontal}
                        defaultValue={defaultHorizontal}
                        onChange={(e) => handleHorizontalChange(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
            {/* Vertical */}
            <div className="flex-1">
                <div className="outline-none w-full cursor-text mt-0.5 flex items-center rounded border border-transparent bg-gray-100 pl-2 transition hover:border-gray-200">
                    <PaddingVerticalIcon />
                    <input
                        type="number"
                        className="h-6 w-full min-w-[36px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none text-gray-900"
                        value={vertical}
                        defaultValue={defaultVertical}
                        onChange={(e) => handleVerticalChange(parseInt(e.target.value) || 0)}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                {tooltip ? (
                    <Tooltip content={tooltip} position="bottom">
                        {spacingInputs}
                    </Tooltip>
                ) : (
                    spacingInputs
                )}
            </div>
        </div>
    );
}
