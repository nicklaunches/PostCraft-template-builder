interface CardProps {
    title: string;
    children: React.ReactNode;
}

export default function Card({ title, children }: CardProps) {
    return (
        <div className="space-y-4 py-4">
            {/* Header */}
            <div className="relative flex justify-between px-2">
                <div className="ease flex min-h-[22px] items-center">
                    <h3 className="text-[13px] font-semibold text-gray-900">{title}</h3>
                </div>
                <div className="flex items-center space-x-1"></div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between space-x-2">
                <div className="flex w-full flex-col gap-2">{children}</div>
            </div>
        </div>
    );
}
