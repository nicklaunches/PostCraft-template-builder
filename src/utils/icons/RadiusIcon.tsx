/**
 * Radius icon component.
 *
 * Displays a small square with border to represent border radius visually.
 * The radius is set to 0px by default but could be adjusted.
 *
 * @returns {JSX.Element} Radius icon
 */
export default function RadiusIcon() {
    return (
        <div className="relative size-3 overflow-hidden">
            <div
                className="left-0 top-0 h-6 w-6 border transition-colors border-gray-600"
                style={{ borderRadius: "0px" }}
            ></div>
        </div>
    );
}
