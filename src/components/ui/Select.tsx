import Label from "./Label";
import Tooltip from "./Tooltip";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    tooltip?: string;
}

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
