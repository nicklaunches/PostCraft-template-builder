import Label from "./Label";
import Tooltip from "./Tooltip";
import { RadiusIcon, BorderWidthIcon } from "@/utils/icons";

/**
 * Props for the InputNumber component.
 *
 * @property {string} label - Label text displayed for the input
 * @property {number} [value] - Controlled numeric value
 * @property {number} [defaultValue] - Default value if uncontrolled
 * @property {"radius" | "border-width"} [icon] - Optional icon to display
 * @property {(value: number) => void} [onChange] - Callback when value changes
 * @property {string} [tooltip] - Optional tooltip text
 */
interface InputNumberProps {
    label: string;
    value?: number;
    defaultValue?: number;
    icon?: "radius" | "border-width";
    onChange?: (value: number) => void;
    tooltip?: string;
}

/**
 * Number input component with optional icon and tooltip.
 *
 * Provides a styled number input with support for contextual icons
 * (radius or border-width) and consistent label alignment.
 *
 * @param {InputNumberProps} props - Component props
 * @returns {JSX.Element} InputNumber component
 */
export default function InputNumber({
    label,
    value,
    defaultValue = 0,
    icon,
    onChange,
    tooltip,
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

    const inputElement = (
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
    );

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                {tooltip ? (
                    <Tooltip content={tooltip} position="bottom">
                        {inputElement}
                    </Tooltip>
                ) : (
                    inputElement
                )}
            </div>
        </div>
    );
}
