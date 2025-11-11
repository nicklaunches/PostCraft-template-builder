import Label from "./Label";

interface SelectOption {
    value: string;
    label: string;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export default function Select({ label, options, defaultValue, onChange }: SelectProps) {
    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                <div className="flex w-full items-center justify-between gap-2">
                    <select
                        className="outline-none w-full rounded border border-transparent bg-gray-100 px-2 py-1 text-xs transition hover:border-gray-200 focus:outline-none focus:ring-0 text-gray-600"
                        defaultValue={defaultValue}
                        onChange={(e) => onChange?.(e.target.value)}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}
