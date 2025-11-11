import Label from "./Label";
import Tooltip from "./Tooltip";

/**
 * Option item for Select component.
 *
 * @property {string} value - Option value
 * @property {string} label - Display text for option
 */
interface SelectOption {
    value: string;
    label: string;
}

/**
 * Props for the Select component.
 *
 * @property {string} label - Label text displayed for the select
 * @property {SelectOption[]} options - Array of selectable options
 * @property {string} [value] - Controlled selected value
 * @property {string} [defaultValue] - Default selected value if uncontrolled
 * @property {(value: string) => void} [onChange] - Callback when selection changes
 * @property {string} [tooltip] - Optional tooltip text
 */
interface SelectProps {
    label: string;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    tooltip?: string;
}

/**
 * Select dropdown component with label and optional tooltip.
 *
 * Provides a styled select input with consistent label alignment
 * and optional tooltip support.
 *
 * @param {SelectProps} props - Component props
 * @returns {JSX.Element} Select component
 */
export default function Select({
    label,
    options,
    value,
    defaultValue,
    onChange,
    tooltip,
}: SelectProps) {
    const selectElement = (
        <select
            className="outline-none w-full rounded border border-transparent bg-gray-100 px-2 py-1 text-xs transition hover:border-gray-200 focus:outline-none focus:ring-0 text-gray-600"
            value={value}
            defaultValue={defaultValue}
            onChange={(e) => onChange?.(e.target.value)}
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );

    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                <div className="flex w-full items-center justify-between gap-2">
                    {tooltip ? (
                        <Tooltip content={tooltip} position="bottom">
                            {selectElement}
                        </Tooltip>
                    ) : (
                        selectElement
                    )}
                </div>
            </div>
        </div>
    );
}
