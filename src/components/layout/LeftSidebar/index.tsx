import EmailStyles from "@/components/panels/EmailStylesPanel";

/**
 * Left sidebar component with email styling controls.
 *
 * Provides a control panel for configuring global email styles including
 * fonts, colors, spacing, borders, and other visual properties. Updates
 * are applied to global state and reflected in the content editor.
 *
 * @returns {JSX.Element} Left sidebar component
 */
export default function LeftSidebar() {
    return (
        <aside className="w-64 border-r bg-gray-50">
            <div className="min-h-[44px] w-full px-2">
                <EmailStyles />
            </div>
        </aside>
    );
}
