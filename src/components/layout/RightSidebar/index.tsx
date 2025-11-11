import BlockStyles from "@/components/panels/BlockStylesPanel";

/**
 * Right sidebar component for block-specific settings.
 *
 * Provides a control panel for configuring block styles including
 * alignment, border, padding, and background color. Also includes
 * actions for creating components, duplicating, and deleting blocks.
 *
 * @returns {JSX.Element} Right sidebar component
 */
export default function RightSidebar() {
    return (
        <aside className="w-72 border-l bg-gray-50">
            <div className="min-h-[44px] w-full px-2">
                <BlockStyles />
            </div>
        </aside>
    );
}
