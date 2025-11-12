import { useState } from "react";
import Label from "./Label";
import Tooltip from "./Tooltip";
import { RadiusIcon, BorderWidthIcon, FontSizeIcon, LineHeightIcon } from "@/utils/icons";
import { sanitizeNumber } from "@/utils/validators/sanitizers";

/**
 * Props for the InputNumber component.
 *
 * @property {string} label - Label text displayed for the input
 * @property {number} [value] - Controlled numeric value
 * @property {number} [defaultValue] - Default value if uncontrolled
 * @property {"radius" | "border-width" | "font-size" | "line-height"} [icon] - Optional icon to display
 * @property {(value: number) => void} [onChange] - Callback when value changes
 * @property {string} [tooltip] - Optional tooltip text
 * @property {number} [min] - Minimum allowed value
 * @property {number} [max] - Maximum allowed value
 * @property {number} [step] - Step increment for arrow buttons
 * @property {boolean} [showValidation] - Whether to show validation feedback (default: false)
 * @property {string} [suffix] - Optional suffix text to display after the input (e.g., "%", "px")
 */
interface InputNumberProps {
    label: string;
    value?: number;
    defaultValue?: number;
    icon?: "radius" | "border-width" | "font-size" | "line-height";
    onChange?: (value: number) => void;
    tooltip?: string;
    min?: number;
    max?: number;
    step?: number;
    showValidation?: boolean;
    suffix?: string;
}

/**
 * Number input component with validation, optional icon and tooltip.
 *
 * Provides a styled number input with support for contextual icons
 * (radius, border-width, font-size, line-height), consistent label
 * alignment, optional suffix text, and optional validation with min/max
 * bounds and visual feedback.
 *
 * @param {InputNumberProps} props - Component props
 * @returns {JSX.Element} InputNumber component
 *
 * @example
 * <InputNumber
 *   label="Border Radius"
 *   value={radius}
 *   onChange={setRadius}
 *   min={0}
 *   max={50}
 *   showValidation={true}
 *   icon="radius"
 * />
 */
export default function InputNumber({
    label,
    value,
    defaultValue = 0,
    icon,
    onChange,
    tooltip,
    min = 0,
    max = 1000,
    step = 1,
    showValidation = false,
    suffix,
}: InputNumberProps) {
    const [isInvalid, setIsInvalid] = useState(false);
    const [localValue, setLocalValue] = useState<string>("");

    const currentValue = value ?? defaultValue;

    const renderIcon = () => {
        if (icon === "radius") {
            return <RadiusIcon />;
        }

        if (icon === "border-width") {
            return <BorderWidthIcon />;
        }

        if (icon === "font-size") {
            return <FontSizeIcon />;
        }

        if (icon === "line-height") {
            return <LineHeightIcon />;
        }

        return null;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        setLocalValue(rawValue);

        // Allow empty input during typing
        if (rawValue === "" || rawValue === "-") {
            setIsInvalid(false);
            return;
        }

        // Sanitize and validate
        const sanitized = sanitizeNumber(rawValue, { min, max, default: defaultValue });

        // Check if out of range
        const numValue = parseFloat(rawValue);
        if (!isNaN(numValue) && (numValue < min || numValue > max)) {
            setIsInvalid(showValidation);
        } else {
            setIsInvalid(false);
        }

        // Emit validated value
        onChange?.(sanitized);
    };

    const handleBlur = () => {
        // On blur, ensure value is valid
        setLocalValue("");
        setIsInvalid(false);

        if (onChange) {
            const sanitized = sanitizeNumber(currentValue, {
                min,
                max,
                default: defaultValue,
            });
            onChange(sanitized);
        }
    };

    const displayValue = localValue !== "" ? localValue : currentValue;

    const inputElement = (
        <div
            className={`outline-none w-full cursor-text flex items-center rounded border transition ${
                isInvalid
                    ? "border-red-300 bg-red-50 hover:border-red-400"
                    : "border-transparent bg-gray-100 hover:border-gray-200"
            } ${renderIcon() ? "pl-2" : ""}`}
        >
            {renderIcon() && <div>{renderIcon()}</div>}
            <input
                type="number"
                className={`no-spin h-6 w-full ${renderIcon() ? "min-w-[36px]" : "min-w-[px]"} cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none ${
                    isInvalid ? "text-red-700" : "text-gray-900"
                }`}
                value={displayValue}
                onChange={handleChange}
                onBlur={handleBlur}
                min={min}
                max={max}
                step={step}
                aria-invalid={isInvalid}
                aria-describedby={isInvalid ? `${label}-error` : undefined}
            />
            {suffix && (
                <span className="-ml-1 pr-[6px] pt-0.5 text-xs text-gray-900">{suffix}</span>
            )}
        </div>
    );

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1 flex flex-col gap-1">
                {tooltip ? (
                    <Tooltip content={tooltip} position="bottom">
                        {inputElement}
                    </Tooltip>
                ) : (
                    inputElement
                )}
                {isInvalid && showValidation && (
                    <div id={`${label}-error`} className="text-xs text-red-600" role="alert">
                        Value must be between {min} and {max}
                    </div>
                )}
            </div>
        </div>
    );
}
