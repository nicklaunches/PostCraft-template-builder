/**
 * Line Height icon component.
 *
 * SVG icon representing line height for typography controls.
 *
 * @returns {JSX.Element} LineHeight icon
 */
export function LineHeightIcon() {
    return (
        <div className="group relative flex items-center justify-center">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 21"
                strokeWidth="1.5"
                width="16"
                height="16"
                className="stroke-gray-500"
                style={{ transform: "scale(1.2)" }}
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v9"
                />
            </svg>
        </div>
    );
}
