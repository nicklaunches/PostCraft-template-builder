/**
 * Top navigation bar component.
 *
 * Displays the application title and provides space for action buttons
 * like save and preview (currently placeholder).
 *
 * @returns {JSX.Element} Navigation component
 */
export function Nav() {
    return (
        <nav className="flex h-16 items-center justify-between border-b px-4">
            <div className="text-lg font-semibold">PostCraft Template Builder</div>
            <div className="flex gap-2">{/* Save, Preview, etc buttons will go here */}</div>
        </nav>
    );
}
