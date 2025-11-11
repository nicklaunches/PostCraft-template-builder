# Project Structure Analysis & Refactoring Suggestions

Based on the PostCraft Template Builder codebase, here are my recommendations to improve readability and maintainability:

## 1. **Separate Concerns in Hooks**

The `useEditor` hook is doing too much. Consider splitting it:

```typescript
// filepath: /src/hooks/useEditorState.ts
// Manages blocks state only
export function useEditorState(initialContent?: Block[]) {
    // blocks, addBlock, updateBlock, deleteBlock, moveBlock
}

// filepath: /src/hooks/useEditorHistory.ts
// Manages undo/redo separately
export function useEditorHistory(blocks: Block[]) {
    // undo, redo, canUndo, canRedo
}

// filepath: /src/hooks/useEditorSelection.ts
// Manages block selection
export function useEditorSelection() {
    // selectedBlockId, setSelectedBlockId
}
```

## 2. **Extract Constants & Default Values**

Move magic numbers and defaults to a constants file:

```typescript
// filepath: /src/utils/constants.ts
export const DEFAULT_EMAIL_STYLES = {
    /* ... */
};
export const DEFAULT_BLOCK_STYLES = {
    /* ... */
};
export const BLOCK_TYPES = ["text", "heading", "image", "button", "divider"] as const;
```

## 3. **Create a Utilities/Converters Module**

Export logic is buried in `useEditor`. Extract it:

```typescript
// filepath: /src/utils/converters.ts
export function blocksToHTML(blocks: Block[]): string {
    /* ... */
}
export function blocksToJSON(blocks: Block[]): string {
    /* ... */
}
```

## 4. **Type Safety Improvements**

Consider using const assertions for block types:

```typescript
// filepath: /src/types/blocks.ts
export const BLOCK_TYPES = ["text", "heading", "image", "button", "divider"] as const;
export type BlockType = (typeof BLOCK_TYPES)[number];

export interface Block {
    id: string;
    type: BlockType; // Instead of union string
    content: unknown;
    styles?: Record<string, unknown>;
}
```

## 5. **Organize Components by Feature**

Currently, the components are organized by type (builder, layout, ui), but this can be improved by organizing by feature for better maintainability and discoverability.

### Current Structure:

```
components/
├── builder/
│   ├── block-styles/    # Block styling controls
│   └── email-styles/    # Email styling controls
├── layout/
│   ├── ContentEditor/   # Main content editing area
│   ├── LeftSidebar/     # Left sidebar container
│   ├── MenuBar/         # Top menu bar
│   ├── Nav/             # Navigation component
│   ├── RightSidebar/    # Right sidebar container
│   └── TemplateBuilder/ # Main template builder wrapper
└── ui/
    ├── Alignment.tsx
    ├── Card.tsx
    ├── ColorPicker.tsx
    ├── InputNumber.tsx
    ├── Label.tsx
    ├── Select.tsx
    ├── Spacing.tsx
    ├── Tooltip.tsx
    └── extended-tiptap/
```

### Proposed Structure:

```
components/
├── layout/              # Keep as-is - main layout components
│   ├── TemplateBuilder/
│   │   ├── index.tsx
│   │   ├── TemplateBuilder.types.ts (optional)
│   │   └── TemplateBuilder.test.tsx (future)
│   ├── Nav/
│   │   └── index.tsx
│   ├── MenuBar/
│   │   └── index.tsx
│   ├── LeftSidebar/
│   │   └── index.tsx
│   ├── ContentEditor/
│   │   └── index.tsx
│   └── RightSidebar/
│       └── index.tsx
├── panels/              # NEW - Sidebar panel components
│   ├── BlockStylesPanel/
│   │   └── index.tsx    # Move from builder/block-styles
│   └── EmailStylesPanel/
│       └── index.tsx    # Move from builder/email-styles
├── blocks/              # NEW - Individual block renderers (future)
│   ├── TextBlock/
│   │   ├── index.tsx
│   │   ├── TextBlock.types.ts
│   │   └── TextBlock.test.tsx
│   ├── HeadingBlock/
│   ├── ImageBlock/
│   ├── ButtonBlock/
│   └── DividerBlock/
├── ui/                  # Keep as-is - reusable UI primitives
│   ├── Alignment.tsx
│   ├── Card.tsx
│   ├── ColorPicker.tsx
│   ├── InputNumber.tsx
│   ├── Label.tsx
│   ├── Select.tsx
│   ├── Spacing.tsx
│   ├── Tooltip.tsx
│   ├── extended-tiptap/
│   └── index.ts
└── shared/              # NEW - Shared utilities/components (future)
    ├── ErrorBoundary/
    └── LoadingSpinner/
```

### Changes to be Made:

1. **Rename and Reorganize Builder Components:**
    - Move `builder/block-styles/` → `panels/BlockStylesPanel/`
    - Move `builder/email-styles/` → `panels/EmailStylesPanel/`
    - Remove the `builder/` directory
    - Update all imports throughout the codebase

2. **Create Blocks Directory (Future Enhancement):**
    - Prepare structure for individual block components
    - Each block type will have its own folder with:
        - `index.tsx` - Block renderer component
        - `BlockName.types.ts` - Block-specific type definitions
        - `BlockName.test.tsx` - Unit tests
    - This enables better separation when rendering blocks in the editor

3. **Create Shared Directory (Future Enhancement):**
    - Add `ErrorBoundary/` for error handling
    - Add `LoadingSpinner/` or other common components
    - Place any cross-feature shared components here

4. **Update Imports:**
    - Update import paths in:
        - `src/components/layout/RightSidebar/index.tsx`
        - `src/index.ts` (if exporting these components)
        - Any other files importing from `builder/`

### Benefits:

- **Better discoverability**: Components grouped by their function/feature
- **Clearer responsibility**: "panels" vs "layout" vs "ui" vs "blocks"
- **Easier navigation**: Finding block-related code is intuitive
- **Future-proof**: Structure supports adding individual block components
- **Scalability**: Easy to add new panels or block types

## 6. **Create Block Factory Pattern**

Reduce duplication when creating blocks:

```typescript
// filepath: /src/utils/factories/blockFactory.ts
export function createBlock(type: BlockType, content: unknown): Block {
    return {
        id: generateId(),
        type,
        content,
        styles: { ...DEFAULT_BLOCK_STYLES },
    };
}
```

### ✅ IMPLEMENTATION COMPLETED

Created comprehensive block factory with the following features:

**Core Factory Functions:**

- `createBlock(type, content, options?)` - Generic block factory
- `createTextBlock(content, options?)` - Create text/paragraph blocks
- `createHeadingBlock(content, level?, options?)` - Create heading blocks (h1-h6)
- `createButtonBlock(content, options?)` - Create CTA button blocks
- `createImageBlock(content, options?)` - Create image blocks
- `createDividerBlock(content?, options?)` - Create horizontal divider blocks

**Utility Functions:**

- `cloneBlock(block, updates?)` - Duplicate blocks with optional modifications
- `createDefaultBlock(type, options?)` - Create empty placeholder blocks by type
- `createBlocksFromTypes(types)` - Batch create multiple blocks from type array

**Benefits:**

- ✅ Type-safe with full TypeScript support
- ✅ Automatic ID generation using `generateBlockId()`
- ✅ Default styles applied automatically
- ✅ Reduces code duplication
- ✅ Easy to test (pure functions)
- ✅ Consistent block structure
- ✅ Well-documented with JSDoc and examples
- ✅ Exported from main package for external use

**Files Created:**

- `/src/utils/factories/blockFactory.ts` - Main factory implementation
- `/src/utils/factories/README.md` - Comprehensive usage guide with examples

**Usage Example:**

```typescript
import {
    createTextBlock,
    createHeadingBlock,
    createButtonBlock,
} from "@postcraft/template-builder";

// Simple creation
const text = createTextBlock("Hello World");
const heading = createHeadingBlock("Title", 1);
const button = createButtonBlock({ text: "Click Me", url: "/action" });

// With custom styles
const styledText = createTextBlock("Centered", {
    styles: { alignment: "center", paddingTop: 20 },
});

// Clone existing blocks
const duplicate = cloneBlock(text, { content: { text: "Modified" } });
```

## 7. **Decouple GlobalState Context**

Split the massive context into focused providers:

```typescript
// filepath: /src/context/EmailStylesContext.tsx
// Only email-wide styles

// filepath: /src/context/BlockStylesContext.tsx
// Only per-block styles

// filepath: /src/context/EditorContext.tsx
// Only editor instance
```

Then compose them in GlobalStateProvider.

## 8. **Add Input Validation Layer**

Create validation utilities:

```typescript
// filepath: /src/utils/validators.ts
export function validateBlock(block: unknown): block is Block {
    /* ... */
}
export function validateEmailStyles(styles: unknown): styles is EmailStyles {
    /* ... */
}
```

## 9. **Extract CSS Generation**

The `useDynamicCss` logic is mixing concerns:

```typescript
// filepath: /src/utils/cssGenerator.ts
export function generateEmailCSS(styles: EmailStyles, className: string): string { /* ... */ }

// Then in the hook:
export function useDynamicCss(emailStyles: EmailStyles, ...) {
    const css = useMemo(() =>
        generateEmailCSS(emailStyles, className),
        [emailStyles, className]
    );
}
```

## 10. **Add Error Boundaries & Error Handling**

```typescript
// filepath: /src/components/shared/ErrorBoundary.tsx
// Wrap main sections to handle failures gracefully
```

## 11. **Implement ErrorBoundary & LoadingSpinner Components**

Create reusable error handling and loading state components to improve user experience and application resilience.

### ErrorBoundary Component

Error boundaries catch JavaScript errors anywhere in the component tree, log errors, and display a fallback UI instead of crashing the entire application.

```typescript
// filepath: /src/components/shared/ErrorBoundary/index.tsx
import { Component, ReactNode, ErrorInfo } from "react";

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
    onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
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
                    <div className="rounded-lg border border-red-200 bg-red-50 p-6 max-w-md">
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
```

### LoadingSpinner Component

A reusable loading indicator for async operations and loading states.

```typescript
// filepath: /src/components/shared/LoadingSpinner/index.tsx
import { CSSProperties } from "react";

interface LoadingSpinnerProps {
    size?: "sm" | "md" | "lg" | "xl";
    color?: string;
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

/**
 * Loading spinner component for indicating loading states.
 *
 * Displays an animated spinner with optional text. Can be used inline
 * or as a full-screen overlay for blocking operations.
 *
 * @param {LoadingSpinnerProps} props - Component props
 * @returns {JSX.Element} Loading spinner component
 *
 * @example
 * // Inline usage
 * <LoadingSpinner size="sm" text="Loading..." />
 *
 * // Full-screen overlay
 * <LoadingSpinner fullScreen text="Saving template..." />
 */
export function LoadingSpinner({
    size = "md",
    color = "#3B82F6",
    text,
    fullScreen = false,
    className = "",
}: LoadingSpinnerProps) {
    const sizeMap = {
        sm: "16px",
        md: "24px",
        lg: "40px",
        xl: "64px",
    };

    const spinnerSize = sizeMap[size];

    const spinnerStyle: CSSProperties = {
        width: spinnerSize,
        height: spinnerSize,
        border: `3px solid ${color}20`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
        animation: "spin 0.8s linear infinite",
    };

    const content = (
        <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
            <div style={spinnerStyle} />
            {text && <p className="text-sm text-gray-600">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
                <div className="rounded-lg bg-white p-8 shadow-xl">
                    {content}
                </div>
            </div>
        );
    }

    return content;
}

export default LoadingSpinner;
```

Add the spinner animation to your global CSS:

```css
// filepath: /src/styles/globals.css
@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
```

### Usage Examples

#### Wrap Layout Sections with ErrorBoundary:

```typescript
// filepath: /src/App.tsx
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function App() {
    return (
        <GlobalStateProvider>
            <ErrorBoundary>
                <TemplateBuilder onSave={handleSave} />
            </ErrorBoundary>
        </GlobalStateProvider>
    );
}
```

#### Individual Section Protection:

```typescript
// filepath: /src/components/layout/TemplateBuilder/index.tsx
<ErrorBoundary fallback={<div className="p-4">Editor failed to load</div>}>
    <ContentEditor />
</ErrorBoundary>

<ErrorBoundary fallback={<div className="p-4">Sidebar unavailable</div>}>
    <RightSidebar />
</ErrorBoundary>
```

#### LoadingSpinner for Async Operations:

```typescript
// In useTemplateBuilder hook
const [isSaving, setIsSaving] = useState(false);

// In component
{isSaving && (
    <LoadingSpinner
        fullScreen
        text="Saving template..."
        size="lg"
    />
)}
```

#### LoadingSpinner for Lazy Loading:

```typescript
import { Suspense, lazy } from "react";

const ContentEditor = lazy(() => import("@/components/layout/ContentEditor"));

<Suspense fallback={<LoadingSpinner text="Loading editor..." />}>
    <ContentEditor />
</Suspense>
```

### Benefits:

- **Resilience**: Errors in one section don't crash the entire app
- **User Experience**: Clear feedback during loading and error states
- **Debugging**: Error boundaries provide detailed error information
- **Reusability**: Both components can be used throughout the application
- **Graceful Degradation**: Users can continue working in unaffected sections

### Implementation Steps:

1. Create `src/components/shared/ErrorBoundary/index.tsx`
2. Create `src/components/shared/LoadingSpinner/index.tsx`
3. Add spinner animation to `src/styles/globals.css`
4. Wrap main sections in `App.tsx` with ErrorBoundary
5. Add ErrorBoundary to individual layout components
6. Use LoadingSpinner for async operations (save, export, etc.)
7. Consider adding LoadingSpinner to Suspense boundaries for code splitting

## Priority Order

1. **High**: Extract constants (#2) - Easy win, improves readability ✅ **COMPLETED**
2. **High**: Split GlobalState context (#7) - Prevents prop drilling issues
3. **Medium**: Reorganize components (#5) - Makes navigation easier ✅ **COMPLETED**
4. **Medium**: Create block factory (#6) - Reduces duplication ✅ **COMPLETED**
5. **Medium**: Implement ErrorBoundary & LoadingSpinner (#11) - Improves UX and resilience
6. **Low**: Add validation (#8) - Nice to have for robustness
