import { Label } from "./Label";
import { Tooltip } from "./Tooltip";
import { PaddingHorizontalIcon, PaddingVerticalIcon } from "@/utils/icons";
import { sanitizeNumber } from "@/utils/validators/sanitizers";
import { useValidatedInput } from "@/hooks/useValidatedInput";

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
export interface SpacingProps {
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
export function Spacing({
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
    const horizontalInput = useValidatedInput({
        value: horizontal,
        defaultValue: defaultHorizontal,
        onChange: (value) => {
            if (onChange) {
                onChange({ horizontal: value, vertical: verticalInput.currentValue });
            }
            onHorizontalChange?.(value);
        },
        validate: (val) => {
            const numValue = parseFloat(String(val));
            return !isNaN(numValue) && numValue >= min && numValue <= max;
        },
        sanitize: (val) => sanitizeNumber(val, { min, max, default: defaultHorizontal }),
        showValidation,
    });

    const verticalInput = useValidatedInput({
        value: vertical,
        defaultValue: defaultVertical,
        onChange: (value) => {
            if (onChange) {
                onChange({ horizontal: horizontalInput.currentValue, vertical: value });
            }
            onVerticalChange?.(value);
        },
        validate: (val) => {
            const numValue = parseFloat(String(val));
            return !isNaN(numValue) && numValue >= min && numValue <= max;
        },
        sanitize: (val) => sanitizeNumber(val, { min, max, default: defaultVertical }),
        showValidation,
    });

    const hasError = horizontalInput.isInvalid || verticalInput.isInvalid;

    const spacingInputs = (
        <div className="flex flex-col gap-1">
            <div className="flex space-x-2">
                {/* Horizontal */}
                <div className="flex-1">
                    <div
                        className={`outline-none w-full cursor-text flex items-center rounded border transition ${
                            horizontalInput.isInvalid
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
                                horizontalInput.isInvalid ? "text-red-700" : "text-gray-900"
                            }`}
                            value={horizontalInput.displayValue}
                            onChange={(e) => horizontalInput.handleChange(e.target.value)}
                            onBlur={horizontalInput.handleBlur}
                            min={min}
                            max={max}
                            aria-invalid={horizontalInput.isInvalid}
                            aria-label={`${label} horizontal`}
                        />
                    </div>
                </div>
                {/* Vertical */}
                <div className="flex-1">
                    <div
                        className={`outline-none w-full cursor-text flex items-center rounded border transition ${
                            verticalInput.isInvalid
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
                                verticalInput.isInvalid ? "text-red-700" : "text-gray-900"
                            }`}
                            value={verticalInput.displayValue}
                            onChange={(e) => verticalInput.handleChange(e.target.value)}
                            onBlur={verticalInput.handleBlur}
                            min={min}
                            max={max}
                            aria-invalid={verticalInput.isInvalid}
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
