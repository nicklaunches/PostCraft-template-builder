import { Label } from "./Label";
import { Tooltip } from "./Tooltip";
import { Bars3BottomLeftIcon, Bars3Icon, Bars3CenterLeftIcon } from "@heroicons/react/24/outline";

/**
 * Props for the Alignment component.
 *
 * @property {string} label - Label text displayed for the alignment control
 * @property {"left" | "center" | "right"} [value] - Controlled alignment value
 * @property {"left" | "center" | "right"} [defaultValue] - Default alignment if uncontrolled
 * @property {(value: "left" | "center" | "right") => void} [onChange] - Callback when alignment changes
 * @property {string} [tooltip] - Optional tooltip text
 */
export interface AlignmentProps {
    label: string;
    value?: "left" | "center" | "right";
    defaultValue?: "left" | "center" | "right";
    onChange?: (value: "left" | "center" | "right") => void;
    tooltip?: string;
}

/**
 * Alignment button group component.
 *
 * Provides a button group for selecting text/content alignment
 * (left, center, right) with visual icons.
 *
 * @param {AlignmentProps} props - Component props
 * @returns {JSX.Element} Alignment component
 */
export function Alignment({
    label,
    value = "left",
    defaultValue = "left",
    onChange,
    tooltip,
}: AlignmentProps) {
    const currentValue = value ?? defaultValue;

    const alignmentButtons = (
        <div className="flex w-full space-x-1">
            <Tooltip content="Align left">
                <button
                    type="button"
                    onClick={() => onChange?.("left")}
                    className={`flex h-6 flex-1 items-center justify-center rounded border transition ${
                        currentValue === "left"
                            ? "border-gray-300 bg-white"
                            : "border-transparent bg-gray-100 hover:border-gray-200"
                    }`}
                    title="Align left"
                >
                    <Bars3BottomLeftIcon className="h-4 w-4 text-gray-600" />
                </button>
            </Tooltip>
            <Tooltip content="Align center">
                <button
                    type="button"
                    onClick={() => onChange?.("center")}
                    className={`flex h-6 flex-1 items-center justify-center rounded border transition ${
                        currentValue === "center"
                            ? "border-gray-300 bg-white"
                            : "border-transparent bg-gray-100 hover:border-gray-200"
                    }`}
                    title="Align center"
                >
                    <Bars3CenterLeftIcon className="h-4 w-4 text-gray-600" />
                </button>
            </Tooltip>
            <Tooltip content="Align right">
                <button
                    type="button"
                    onClick={() => onChange?.("right")}
                    className={`flex h-6 flex-1 items-center justify-center rounded border transition ${
                        currentValue === "right"
                            ? "border-gray-300 bg-white"
                            : "border-transparent bg-gray-100 hover:border-gray-200"
                    }`}
                    title="Align right"
                >
                    <Bars3Icon className="h-4 w-4 text-gray-600" />
                </button>
            </Tooltip>
        </div>
    );

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                {tooltip ? (
                    <Tooltip content={tooltip} position="bottom">
                        {alignmentButtons}
                    </Tooltip>
                ) : (
                    alignmentButtons
                )}
            </div>
        </div>
    );
}
