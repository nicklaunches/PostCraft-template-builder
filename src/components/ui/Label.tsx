/**
 * Props for the Label component.
 *
 * @property {React.ReactNode} children - Label text content
 */
export interface LabelProps {
    children: React.ReactNode;
}

/**
 * Label component for form inputs with consistent styling.
 *
 * Provides standardized label styling for form controls with
 * proper spacing and alignment.
 *
 * @param {LabelProps} props - Component props
 * @returns {JSX.Element} Label component
 */
export function Label({ children }: LabelProps) {
    return (
        <div className="flex h-[26px] w-2/5 items-center gap-1 text-xs font-medium leading-[26px] text-gray-600">
            {children}
        </div>
    );
}
