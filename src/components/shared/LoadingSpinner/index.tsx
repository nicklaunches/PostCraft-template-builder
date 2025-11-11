import { CSSProperties } from "react";

/**
 * Props for the LoadingSpinner component.
 *
 * @property {"sm" | "md" | "lg" | "xl"} [size] - Size of the spinner
 * @property {string} [color] - Color of the spinner
 * @property {string} [text] - Optional loading text to display
 * @property {boolean} [fullScreen] - Whether to render as full-screen overlay
 * @property {string} [className] - Additional CSS classes
 */
interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: string;
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

/**
 * Loading spinner component for indicating loading states.
 *
 * Displays an animated spinner with optional text. Can be used inline
 * or as a full-screen overlay for blocking operations.
 *
 * @param {LoadingSpinnerProps} props - Component props
 * @returns {JSX.Element} Loading spinner component
 *
 * @example
 * // Inline usage
 * <LoadingSpinner size="sm" text="Loading..." />
 *
 * // Full-screen overlay
 * <LoadingSpinner fullScreen text="Saving template..." />
 */
export function LoadingSpinner({
    size = "md",
    color = "#3B82F6",
    text,
    fullScreen = false,
    className = "",
}: LoadingSpinnerProps) {
    const sizeMap = {
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "64px",
    };

    const spinnerSize = sizeMap[size];

    const spinnerStyle: CSSProperties = {
        width: spinnerSize,
        height: spinnerSize,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    };

    const content = (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div style={spinnerStyle} />
            {text && <p className="text-sm text-gray-600">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="rounded-lg bg-white p-8 shadow-xl">{content}</div>
            </div>
        );
    }

    return content;
}

export default LoadingSpinner;
