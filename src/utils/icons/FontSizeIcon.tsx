/**
 * Font Size icon component (AA symbol).
 *
 * SVG icon representing font size for typography controls.
 *
 * @returns {JSX.Element} FontSize icon
 */
export function FontSizeIcon() {
    return (
        <div className="group relative flex items-center justify-center">
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-gray-500"
                style={{ transform: "scale(1.1) translateX(-5%)" }}
            >
                <path d="M14.4401 12.7578L15.4401 12.7578L13.4401 6.09111L12.4401 6.09111L10.4401 12.7578L11.4401 12.7578L11.9401 11.0911L13.9401 11.0911L14.4401 12.7578ZM12.2401 10.0911L12.9401 7.75777L13.6401 10.0911L12.2401 10.0911ZM8.4401 12.7578L9.77344 12.7578L6.4401 3.42444L5.10677 3.42444L1.77344 12.7578L3.10677 12.7578L4.0601 10.0911L7.48677 10.0911L8.4401 12.7578ZM4.53344 8.75777L5.77344 5.29111L7.01344 8.75777L4.53344 8.75777Z" />
            </svg>
        </div>
    );
}
