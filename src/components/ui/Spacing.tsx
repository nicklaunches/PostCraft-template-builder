import { useState } from "react";
import Label from "./Label";
import Tooltip from "./Tooltip";
import { PaddingHorizontalIcon, PaddingVerticalIcon } from "@/utils/icons";
import { sanitizeNumber } from "@/utils/validators";

/**
 * Props for the Spacing component.
 *
 * @property {string} label - Label text displayed for the spacing control
 * @property {number} [horizontal] - Controlled horizontal spacing value
 * @property {number} [vertical] - Controlled vertical spacing value
 * @property {number} [defaultHorizontal] - Default horizontal value if uncontrolled
 * @property {number} [defaultVertical] - Default vertical value if uncontrolled
 * @property {(value: { horizontal: number; vertical: number }) => void} [onChange] - Callback with both values
 * @property {(value: number) => void} [onHorizontalChange] - Callback for horizontal changes
 * @property {(value: number) => void} [onVerticalChange] - Callback for vertical changes
 * @property {string} [tooltip] - Optional tooltip text
 * @property {number} [min] - Minimum allowed value (default: 0)
 * @property {number} [max] - Maximum allowed value (default: 1000)
 * @property {boolean} [showValidation] - Whether to show validation feedback (default: false)
 */
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
    min?: number;
    max?: number;
    showValidation?: boolean;
}

/**
 * Spacing input control with validation for horizontal and vertical values.
 *
 * Provides dual number inputs with icons for managing spacing properties
 * like padding or margin with separate horizontal and vertical values.
 * Includes optional validation with min/max bounds.
 *
 * @param {SpacingProps} props - Component props
 * @returns {JSX.Element} Spacing component
 *
 * @example
 * <Spacing
 *   label="Padding"
 *   horizontal={paddingH}
 *   vertical={paddingV}
 *   onChange={({ horizontal, vertical }) => {
 *     setPaddingH(horizontal);
 *     setPaddingV(vertical);
 *   }}
 *   min={0}
 *   max={100}
 *   showValidation={true}
 * />
 */
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
    min = 0,
    max = 1000,
    showValidation = false,
}: SpacingProps) {
    const [horizontalInvalid, setHorizontalInvalid] = useState(false);
    const [verticalInvalid, setVerticalInvalid] = useState(false);
    const [localHorizontal, setLocalHorizontal] = useState<string>("");
    const [localVertical, setLocalVertical] = useState<string>("");

    const currentHorizontal = horizontal ?? defaultHorizontal;
    const currentVertical = vertical ?? defaultVertical;

    const handleHorizontalChange = (rawValue: string) => {
        setLocalHorizontal(rawValue);

        // Allow empty input during typing
        if (rawValue === "" || rawValue === "-") {
            setHorizontalInvalid(false);
            return;
        }

        const sanitized = sanitizeNumber(rawValue, { min, max, default: defaultHorizontal });

        // Check if out of range
        const numValue = parseFloat(rawValue);
        if (!isNaN(numValue) && (numValue < min || numValue > max)) {
            setHorizontalInvalid(showValidation);
        } else {
            setHorizontalInvalid(false);
        }

        if (onChange) {
            onChange({ horizontal: sanitized, vertical: currentVertical });
        }
        onHorizontalChange?.(sanitized);
    };

    const handleVerticalChange = (rawValue: string) => {
        setLocalVertical(rawValue);

        // Allow empty input during typing
        if (rawValue === "" || rawValue === "-") {
            setVerticalInvalid(false);
            return;
        }

        const sanitized = sanitizeNumber(rawValue, { min, max, default: defaultVertical });

        // Check if out of range
        const numValue = parseFloat(rawValue);
        if (!isNaN(numValue) && (numValue < min || numValue > max)) {
            setVerticalInvalid(showValidation);
        } else {
            setVerticalInvalid(false);
        }

        if (onChange) {
            onChange({ horizontal: currentHorizontal, vertical: sanitized });
        }
        onVerticalChange?.(sanitized);
    };

    const handleHorizontalBlur = () => {
        setLocalHorizontal("");
        setHorizontalInvalid(false);

        const sanitized = sanitizeNumber(currentHorizontal, {
            min,
            max,
            default: defaultHorizontal,
        });

        if (onChange) {
            onChange({ horizontal: sanitized, vertical: currentVertical });
        }
        onHorizontalChange?.(sanitized);
    };

    const handleVerticalBlur = () => {
        setLocalVertical("");
        setVerticalInvalid(false);

        const sanitized = sanitizeNumber(currentVertical, {
            min,
            max,
            default: defaultVertical,
        });

        if (onChange) {
            onChange({ horizontal: currentHorizontal, vertical: sanitized });
        }
        onVerticalChange?.(sanitized);
    };

    const displayHorizontal = localHorizontal !== "" ? localHorizontal : currentHorizontal;
    const displayVertical = localVertical !== "" ? localVertical : currentVertical;
    const hasError = horizontalInvalid || verticalInvalid;

    const spacingInputs = (
        <div className="flex flex-col gap-1">
            <div className="flex space-x-2">
                {/* Horizontal */}
                <div className="flex-1">
                    <div
                        className={`outline-none w-full cursor-text flex items-center rounded border transition ${
                            horizontalInvalid
                                ? "border-red-300 bg-red-50 hover:border-red-400"
                                : "border-transparent bg-gray-100 hover:border-gray-200"
                        }`}
                    >
                        <div className="pl-2">
                            <PaddingHorizontalIcon />
                        </div>
                        <input
                            type="number"
                            className={`h-6 w-full min-w-[46px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none ${
                                horizontalInvalid ? "text-red-700" : "text-gray-900"
                            }`}
                            value={displayHorizontal}
                            onChange={(e) => handleHorizontalChange(e.target.value)}
                            onBlur={handleHorizontalBlur}
                            min={min}
                            max={max}
                            aria-invalid={horizontalInvalid}
                            aria-label={`${label} horizontal`}
                        />
                    </div>
                </div>
                {/* Vertical */}
                <div className="flex-1">
                    <div
                        className={`outline-none w-full cursor-text flex items-center rounded border transition ${
                            verticalInvalid
                                ? "border-red-300 bg-red-50 hover:border-red-400"
                                : "border-transparent bg-gray-100 hover:border-gray-200"
                        }`}
                    >
                        <div className="pl-2">
                            <PaddingVerticalIcon />
                        </div>
                        <input
                            type="number"
                            className={`h-6 w-full min-w-[46px] cursor-text rounded border-0 bg-transparent pl-2 pr-1 text-xs transition-colors focus:outline-none ${
                                verticalInvalid ? "text-red-700" : "text-gray-900"
                            }`}
                            value={displayVertical}
                            onChange={(e) => handleVerticalChange(e.target.value)}
                            onBlur={handleVerticalBlur}
                            min={min}
                            max={max}
                            aria-invalid={verticalInvalid}
                            aria-label={`${label} vertical`}
                        />
                    </div>
                </div>
            </div>
            {hasError && showValidation && (
                <div className="text-xs text-red-600" role="alert">
                    Values must be between {min} and {max}
                </div>
            )}
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
