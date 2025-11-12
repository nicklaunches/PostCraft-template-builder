import { ReactNode } from "react";
import TemplateBuilderCore, { TemplateBuilderCoreProps } from "./layout/TemplateBuilderCore";
import ErrorBoundary from "./shared/ErrorBoundary";
import LoadingSpinner from "./shared/LoadingSpinner";
import { GlobalStateProvider } from "@/context/GlobalState";
import { useTemplateBuilder } from "@/hooks/useTemplateBuilder";
import { useEditor } from "@/hooks/useEditor";

/**
 * Props for the TemplateBuilder component.
 *
 * @property {boolean} [showNav] - Whether to display the navigation bar
 * @property {boolean} [showLeftSidebar] - Whether to display the left sidebar
 * @property {boolean} [showRightSidebar] - Whether to display the right sidebar
 * @property {() => void | Promise<void>} [onSave] - Callback when content is saved
 * @property {unknown} [initialContent] - Initial content to load in the builder
 * @property {boolean} [showLoadingOverlay] - Whether to show loading overlay during save
 * @property {ReactNode} [errorFallback] - Custom error fallback UI
 */
export interface TemplateBuilderProps extends Omit<TemplateBuilderCoreProps, "onSave"> {
    onSave?: () => void | Promise<void>;
    showLoadingOverlay?: boolean;
    errorFallback?: ReactNode;
}

/**
 * Internal wrapper component that uses hooks.
 * This component must be inside GlobalStateProvider to access hooks.
 */
function TemplateBuilderInternal({
    onSave,
    showLoadingOverlay = true,
    errorFallback,
    ...builderProps
}: TemplateBuilderProps) {
    const builder = useTemplateBuilder();
    const editor = useEditor();

    const handleSave = async () => {
        if (onSave) {
            await Promise.resolve(onSave());
        }
        // Also trigger internal save logic
        await builder.saveTemplate();
        const html = editor.exportToHTML();

        console.log("Template Builder State:", builder.template);
        console.log("Exported HTML:", html);
    };

    return (
        <>
            {showLoadingOverlay && builder.isSaving && (
                <LoadingSpinner fullScreen text="Saving template..." size="lg" />
            )}
            <ErrorBoundary fallback={errorFallback}>
                <TemplateBuilderCore {...builderProps} onSave={handleSave} />
            </ErrorBoundary>
        </>
    );
}

/**
 * Main template builder component with all providers and error handling.
 *
 * This is the recommended component for most use cases. It includes:
 * - Global state management (GlobalStateProvider)
 * - Error boundary for graceful error handling
 * - Loading overlay during save operations
 * - All necessary context providers
 *
 * For advanced usage with custom providers or error handling,
 * use the `TemplateBuilderCore` component directly.
 *
 * @param {TemplateBuilderProps} props - Component props
 * @returns {JSX.Element} Template builder with providers
 *
 * @example
 * // Basic usage
 * ```tsx
 * import { TemplateBuilder } from 'postcraft-template-builder';
 *
 * function App() {
 *   const handleSave = async () => {
 *     console.log('Template saved!');
 *   };
 *
 *   return <TemplateBuilder onSave={handleSave} />;
 * }
 * ```
 *
 * @example
 * // With custom options
 * ```tsx
 * <TemplateBuilder
 *   showNav={true}
 *   showLeftSidebar={true}
 *   showRightSidebar={true}
 *   showLoadingOverlay={true}
 *   onSave={handleSave}
 *   initialContent={myContent}
 * />
 * ```
 */
export default function TemplateBuilder(props: TemplateBuilderProps) {
    return (
        <GlobalStateProvider>
            <TemplateBuilderInternal {...props} />
        </GlobalStateProvider>
    );
}
