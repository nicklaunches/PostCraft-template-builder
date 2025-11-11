interface LabelProps {
    children: React.ReactNode;
}

export default function Label({ children }: LabelProps) {
    return (
        <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
            {children}
        </div>
    );
}
