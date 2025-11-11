import { useState, useRef, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import Label from "./Label";
import { PlusIcon, ResetIcon } from "@/utils/icons";

interface ColorPickerProps {
    label: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export default function ColorPicker({ label, defaultValue = "", onChange }: ColorPickerProps) {
    const [color, setColor] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [pickerPosition, setPickerPosition] = useState<"left" | "right">("right");
    const containerRef = useRef<HTMLDivElement>(null);
    const pickerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close picker
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node) &&
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
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

    // Calculate picker position based on available space
    useEffect(() => {
        if (isOpen && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const spaceOnRight = window.innerWidth - rect.right;
            const spaceOnLeft = rect.left;
            const pickerWidth = 240; // Approximate width of color picker

            setPickerPosition(
                spaceOnRight >= pickerWidth
                    ? "right"
                    : spaceOnLeft >= pickerWidth
                      ? "left"
                      : "right"
            );
        }
    }, [isOpen]);

    const handleColorChange = (newColor: string) => {
        setColor(newColor);
        onChange?.(newColor);
    };

    const handleReset = (e: React.MouseEvent) => {
        e.stopPropagation();
        setColor("");
        onChange?.("");
        setIsOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setColor(value);
        onChange?.(value);
    };

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1 relative">
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

                {/* Color Picker Popover */}
                {isOpen && (
                    <div
                        ref={pickerRef}
                        className={`absolute top-0 z-50 ${
                            pickerPosition === "right" ? "left-full ml-2" : "right-full mr-2"
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
