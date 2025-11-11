import Label from "./Label";
import { PlusIcon } from "@/utils/icons";

interface ColorPickerProps {
    label: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
}

export default function ColorPicker({ label, defaultValue = "", onChange }: ColorPickerProps) {
    return (
        <div className="flex px-2">
            <Label>{label}</Label>
            <div className="flex-1">
                <div className="relative w-full">
                    <div className="outline-none w-full cursor-text relative">
                        <div className="relative flex w-full items-center rounded border bg-gray-100 pl-2 hover:border-slate-200 border-transparent">
                            <div className="cursor-pointer h-4 w-4 min-w-[1rem] overflow-hidden rounded outline-0 focus:outline-0">
                                <PlusIcon />
                            </div>
                            <div className="relative flex items-center justify-center">
                                <div className="absolute left-1 top-1/2 flex -translate-y-1/2 items-center pr-0.5 text-xs">
                                    <span className="absolute whitespace-nowrap pt-0.5 text-xs text-gray-500">
                                        Color
                                    </span>
                                </div>
                                <input
                                    className="w-full rounded bg-transparent py-1 pl-2 pr-1 text-left text-xs uppercase transition-colors focus:outline-none text-gray-900"
                                    defaultValue={defaultValue}
                                    onChange={(e) => onChange?.(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
