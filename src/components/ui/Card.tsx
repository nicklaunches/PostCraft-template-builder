/**
 * Props for the Card component.
 *
 * @property {string} title - Card title displayed in header
 * @property {React.ReactNode} children - Content to render inside the card
 * @property {React.ReactNode} [action] - Optional action element to display in the header
 */
interface CardProps {
    title: string;
    children: React.ReactNode;
    action?: React.ReactNode;
}

/**
 * Card container component with title header.
 *
 * Provides a consistent card layout with a title header and content area
 * for grouping related UI elements.
 *
 * @param {CardProps} props - Component props
 * @returns {JSX.Element} Card component
 */
export default function Card({ title, children, action }: CardProps) {
    return (
        <div className="space-y-4 py-4">
            {/* Header */}
            <div className="relative flex justify-between px-2">
                <div className="ease flex min-h-[22px] items-center">
                    <h3 className="text-[13px] font-semibold text-gray-900">{title}</h3>
                </div>
                <div className="flex items-center space-x-1">{action}</div>
            </div>

            {/* Content */}
            <div className="flex items-center justify-between space-x-2">
                <div className="flex w-full flex-col gap-2">{children}</div>
            </div>
        </div>
    );
}
