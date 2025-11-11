/**
 * Plus icon component.
 *
 * Simple plus/add icon used for adding new items or colors.
 * Rendered as an SVG with centered cross design.
 *
 * @returns {JSX.Element} Plus icon
 */
export default function PlusIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-full w-full stroke-[0.1] text-gray-400"
        >
            <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"></path>
        </svg>
    );
}
