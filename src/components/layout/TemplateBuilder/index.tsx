import Nav from "../Nav";
import LeftSidebar from "../LeftSidebar";
import ContentEditor from "../ContentEditor";
import RightSidebar from "../RightSidebar";
import ErrorBoundary from "@/components/shared/ErrorBoundary";

/**
 * Props for the TemplateBuilder component.
 *
 * @property {boolean} [showNav] - Whether to display the navigation bar
 * @property {boolean} [showLeftSidebar] - Whether to display the left sidebar
 * @property {boolean} [showRightSidebar] - Whether to display the right sidebar
 * @property {(content: unknown) => void} [onSave] - Callback when content is saved
 * @property {unknown} [initialContent] - Initial content to load in the builder
 */
export interface TemplateBuilderProps {
    showNav?: boolean;
    showLeftSidebar?: boolean;
    showRightSidebar?: boolean;
    onSave?: (content: unknown) => void;
    initialContent?: unknown;
}

/**
 * Main template builder layout component.
 *
 * Orchestrates the full template builder interface with optional navigation,
 * sidebars, and content editor. Provides a flexible layout that can be
 * customized by showing/hiding different sections.
 *
 * @param {TemplateBuilderProps} props - Component props
 * @returns {JSX.Element} Template builder layout
 */
export default function TemplateBuilder({
    showNav = true,
    showLeftSidebar = true,
    showRightSidebar = true,
    onSave,
    initialContent,
}: TemplateBuilderProps) {
    return (
        <div className="flex h-screen flex-col">
            {showNav && <Nav />}
            <div className="flex flex-1 overflow-hidden">
                {showLeftSidebar && (
                    <ErrorBoundary
                        fallback={
                            <div className="w-72 border-r bg-gray-50 p-4 text-red-600">
                                Email styles panel unavailable
                            </div>
                        }
                    >
                        <LeftSidebar />
                    </ErrorBoundary>
                )}
                <ErrorBoundary
                    fallback={
                        <div className="flex-1 p-8 text-center text-red-600">
                            Editor failed to load
                        </div>
                    }
                >
                    <ContentEditor initialContent={initialContent} onSave={onSave} />
                </ErrorBoundary>
                {showRightSidebar && (
                    <ErrorBoundary
                        fallback={
                            <div className="w-72 border-l bg-gray-50 p-4 text-red-600">
                                Block styles panel unavailable
                            </div>
                        }
                    >
                        <RightSidebar />
                    </ErrorBoundary>
                )}
            </div>
        </div>
    );
}
