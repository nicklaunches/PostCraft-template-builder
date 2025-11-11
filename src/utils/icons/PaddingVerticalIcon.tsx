/**
 * Padding vertical icon component.
 *
 * Visual representation of vertical padding with horizontal lines on top/bottom
 * and a centered rectangle to show the concept of top/bottom spacing.
 *
 * @returns {JSX.Element} PaddingVertical icon
 */
export default function PaddingVerticalIcon() {
    return (
        <svg
            width="15"
            height="15"
            viewBox="-3 -1 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <line x1="-2" y1="2" x2="11" y2="2" strokeWidth="1.2" className="stroke-gray-500" />
            <line
                x1="-2"
                y1="11.5"
                x2="11"
                y2="11.5"
                strokeWidth="1.2"
                className="stroke-gray-500"
            />
            <rect x="1.8" y="4" width="5.4" height="5.4" rx="1" ry="1" className="fill-gray-500" />
            <rect x="2.8" y="5" width="3.4" height="3.4" rx="1" ry="1" className="fill-white" />
        </svg>
    );
}
