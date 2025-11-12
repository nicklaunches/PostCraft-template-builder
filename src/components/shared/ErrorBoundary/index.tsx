import { Component, ReactNode, ErrorInfo } from "react";

/**
 * Props for the ErrorBoundary component.
 *
 * @property {ReactNode} children - Child components to wrap
 * @property {ReactNode} [fallback] - Custom fallback UI to display on error
 * @property {(error: Error, errorInfo: ErrorInfo) => void} [onError] - Optional error handler callback
 */
export interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State for the ErrorBoundary component.
 *
 * @property {boolean} hasError - Whether an error has been caught
 * @property {Error | null} error - The caught error object
 */
export interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * Error boundary component to catch and handle React errors.
 *
 * Catches errors in child components, logs error details, and displays
 * a fallback UI. Prevents the entire application from crashing due to
 * errors in specific sections.
 *
 * @example
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // Log error to console or error reporting service
        console.error("ErrorBoundary caught an error:", error, errorInfo);

        // Call optional error handler
        this.props.onError?.(error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Render custom fallback or default error UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex flex-col items-center justify-center p-8 text-center">
                    <div className="border border-red-200 bg-red-50 p-6 max-w-md">
                        <h2 className="text-lg font-semibold text-red-900 mb-2">
                            Something went wrong
                        </h2>
                        <p className="text-sm text-red-700 mb-4">
                            {this.state.error?.message || "An unexpected error occurred"}
                        </p>
                        <button
                            onClick={() => this.setState({ hasError: false, error: null })}
                            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        >
                            Try again
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
