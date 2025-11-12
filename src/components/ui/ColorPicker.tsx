import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import Label from "./Label";
import Tooltip from "./Tooltip";
import { PlusIcon, ResetIcon } from "@/utils/icons";
import { sanitizeHexColor } from "@/utils/validators/sanitizers";
import { isValidHexColor } from "@/utils/validators/type-guards";

/**
 * Props for the ColorPicker component.
 *
 * @property {string} label - Label text displayed above picker
 * @property {string} [value] - Controlled color value (hex format)
 * @property {string} [defaultValue] - Default color if uncontrolled
 * @property {(value: string) => void} [onChange] - Callback when color changes
 * @property {string} [tooltip] - Optional tooltip text
 * @property {"inline" | "top"} [labelPosition] - Position of the label relative to the input (default: "inline")
 * @property {"left" | "right"} [position] - Position of the color picker popover (default: "right")
 * @property {boolean} [showValidation] - Whether to show validation feedback (default: false)
 */
interface ColorPickerProps {
    label: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    tooltip?: string;
    labelPosition?: "inline" | "top";
    position?: "left" | "right";
    showValidation?: boolean;
}

/**
 * Color picker component with validation, popover palette and hex input.
 *
 * Displays a color swatch that opens a popover with hex color picker.
 * Includes manual hex input with validation, and reset functionality.
 * Picker position can be manually controlled via the position prop to
 * accommodate different sidebar layouts.
 *
 * @param {ColorPickerProps} props - Component props
 * @returns {JSX.Element} Color picker component
 *
 * @example
 * <ColorPicker
 *   label="Background Color"
 *   value={bgColor}
 *   onChange={setBgColor}
 *   showValidation={true}
 * />
 */
export default function ColorPicker({
    label,
    value,
    defaultValue = "",
    onChange,
    tooltip,
    labelPosition = "inline",
    position = "right",
    showValidation = false,
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [isInvalid, setIsInvalid] = useState(false);
    const [localValue, setLocalValue] = useState<string>("");
    const containerRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    const color = value ?? defaultValue;

    // Handle click outside to close picker
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleColorChange = (newColor: string) => {
        const sanitized = sanitizeHexColor(newColor, color);
        setIsInvalid(false);
        onChange?.(sanitized);
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsInvalid(false);
        setLocalValue("");
        onChange?.("");
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value;
        setLocalValue(rawValue);

        // Allow empty for optional colors
        if (rawValue === "") {
            setIsInvalid(false);
            onChange?.("");
            return;
        }

        // Validate hex format
        if (isValidHexColor(rawValue)) {
            setIsInvalid(false);
            const sanitized = sanitizeHexColor(rawValue);
            onChange?.(sanitized);
        } else {
            setIsInvalid(showValidation);
        }
    };

    const handleInputBlur = () => {
        setIsFocused(false);
        setLocalValue("");

        // Sanitize on blur
        if (color) {
            const sanitized = sanitizeHexColor(color, defaultValue);
            if (sanitized !== color) {
                onChange?.(sanitized);
            }
            setIsInvalid(false);
        }
    };

    const displayValue = localValue !== "" ? localValue : color;

    const colorPickerContent = (
        <div
            ref={containerRef}
            className="relative w-full cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`relative flex w-full items-center rounded border pl-2 transition-colors ${
                    isInvalid
                        ? "border-red-300 bg-red-50"
                        : isOpen
                          ? "border-gray-300 bg-white"
                          : "border-transparent bg-gray-100 hover:border-gray-200"
                }`}
            >
                {/* Color swatch or plus icon */}
                <div className="cursor-pointer h-4 w-4 min-w-[1rem] overflow-hidden rounded outline-0 focus:outline-0">
                    {color ? (
                        <div
                            className="h-full w-full rounded border border-gray-300"
                            style={{ backgroundColor: color }}
                        />
                    ) : (
                        <PlusIcon />
                    )}
                </div>

                {/* Input or color display */}
                <div className="relative flex flex-1 items-center justify-between">
                    {displayValue ? (
                        <div className="flex items-center justify-between w-full">
                            <span
                                className={`pl-2 pr-1 py-1 text-xs uppercase font-medium ${
                                    isInvalid ? "text-red-700" : "text-gray-900"
                                }`}
                            >
                                {displayValue}
                            </span>
                            {(isHovered || isOpen) && (
                                <button
                                    onClick={handleReset}
                                    className="h-4 w-4 mr-2 hover:opacity-70 transition-opacity"
                                    aria-label="Reset color"
                                >
                                    <ResetIcon />
                                </button>
                            )}
                        </div>
                    ) : (
                        <div className="relative flex items-center justify-center flex-1">
                            {!isFocused && (
                                <div className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center pr-0.5 text-xs pointer-events-none">
                                    <span className="absolute whitespace-nowrap pt-0.5 text-xs text-gray-500">
                                        Color
                                    </span>
                                </div>
                            )}
                            <input
                                className={`w-full rounded bg-transparent py-1 pl-2 pr-1 text-left text-xs uppercase transition-colors focus:outline-none ${
                                    isInvalid ? "text-red-700" : "text-gray-900"
                                }`}
                                value={displayValue}
                                onChange={handleInputChange}
                                onClick={(e) => e.stopPropagation()}
                                onFocus={() => {
                                    setIsFocused(true);
                                    setIsOpen(true);
                                }}
                                onBlur={handleInputBlur}
                                placeholder=""
                                aria-invalid={isInvalid}
                                aria-describedby={isInvalid ? `${label}-error` : undefined}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <div className={labelPosition === "top" ? "px-2 space-y-1" : "flex px-2"}>
            {labelPosition === "top" ? (
                <div className="text-xs font-medium text-gray-600">{label}</div>
            ) : (
                <Label>{label}</Label>
            )}
            <div
                className={
                    labelPosition === "top"
                        ? "relative flex flex-col gap-1"
                        : "flex-1 relative flex flex-col gap-1"
                }
            >
                {tooltip ? (
                    <Tooltip content={tooltip} position="bottom">
                        {colorPickerContent}
                    </Tooltip>
                ) : (
                    colorPickerContent
                )}

                {isInvalid && showValidation && (
                    <div id={`${label}-error`} className="text-xs text-red-600" role="alert">
                        Invalid hex color format (e.g., #fff or #ffffff)
                    </div>
                )}

                {/* Color Picker Popover */}
                {isOpen && (
                    <div
                        ref={pickerRef}
                        className={`absolute top-0 z-50 ${
                            position === "right" ? "left-full ml-2" : "right-full mr-2"
                        }`}
                    >
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-3">
                            <HexColorPicker
                                color={color || "#ffffff"}
                                onChange={handleColorChange}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
