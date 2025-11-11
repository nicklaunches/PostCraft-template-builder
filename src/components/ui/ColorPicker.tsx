import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import Label from "./Label";
import Tooltip from "./Tooltip";
import { PlusIcon, ResetIcon } from "@/utils/icons";

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
 */
interface ColorPickerProps {
    label: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    tooltip?: string;
    labelPosition?: "inline" | "top";
    position?: "left" | "right";
}

/**
 * Color picker component with popover palette and hex input.
 *
 * Displays a color swatch that opens a popover with hex color picker.
 * Includes manual hex input and reset functionality. Picker position
 * can be manually controlled via the position prop to accommodate
 * different sidebar layouts.
 *
 * @param {ColorPickerProps} props - Component props
 * @returns {JSX.Element} Color picker component
 */
export default function ColorPicker({
    label,
    value,
    defaultValue = "",
    onChange,
    tooltip,
    labelPosition = "inline",
    position = "right",
}: ColorPickerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
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
        onChange?.(newColor);
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.("");
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

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
                    isOpen
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
                    {color ? (
                        <div className="flex items-center justify-between w-full">
                            <span className="pl-2 pr-1 py-1 text-xs text-gray-900 uppercase font-medium">
                                {color}
                            </span>
                            {(isHovered || isOpen) && (
                                <button
                                    onClick={handleReset}
                                    className="h-4 w-4 mr-2 hover:opacity-70 transition-opacity"
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
                                className="w-full rounded bg-transparent py-1 pl-2 pr-1 text-left text-xs uppercase transition-colors focus:outline-none text-gray-900"
                                value={color}
                                onChange={handleInputChange}
                                onClick={(e) => e.stopPropagation()}
                                onFocus={() => {
                                    setIsFocused(true);
                                    setIsOpen(true);
                                }}
                                onBlur={() => setIsFocused(false)}
                                placeholder=""
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
            <div className={labelPosition === "top" ? "relative" : "flex-1 relative"}>
                {tooltip ? (
                    <Tooltip content={tooltip} position="bottom">
                        {colorPickerContent}
                    </Tooltip>
                ) : (
                    colorPickerContent
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
