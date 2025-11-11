/**
 * Border width icon component.
 *
 * Displays three horizontal lines of increasing thickness to represent
 * border width options visually.
 *
 * @returns {JSX.Element} BorderWidth icon
 */
export default function BorderWidthIcon() {
    return (
        <div className="relative size-5 overflow-visible">
            <svg
                width="16"
                height="16"
                viewBox="0 0 13 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors stroke-gray-500"
            >
                <line x1="1" y1="1" x2="12" y2="1" strokeWidth="0.9" />
                <line x1="1" y1="3.6" x2="12" y2="3.6" strokeWidth="1.4" />
                <line x1="1" y1="7" x2="12" y2="7" strokeWidth="2" />
            </svg>
        </div>
    );
}
