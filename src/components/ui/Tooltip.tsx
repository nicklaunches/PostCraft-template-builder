import { ReactNode, useState, useRef, useEffect, cloneElement, isValidElement } from "react";
import { createPortal } from "react-dom";

/**
 * Props for the Tooltip component.
 *
 * @property {ReactNode} [content] - Tooltip content to display
 * @property {ReactNode} children - Element to attach tooltip to
 * @property {number} [delay] - Delay in ms before showing tooltip
 * @property {"top" | "bottom" | "left" | "right"} [position] - Tooltip position relative to trigger
 */
interface TooltipProps {
    content?: ReactNode;
    children: ReactNode;
    delay?: number;
    position?: "top" | "bottom" | "left" | "right";
}

/**
 * Tooltip component with configurable position and delay.
 *
 * Displays a tooltip on hover/focus with customizable positioning.
 * Rendered using React portals to avoid z-index issues. If no content
 * is provided, renders children without tooltip wrapper.
 *
 * @param {TooltipProps} props - Component props
 * @returns {JSX.Element} Tooltip wrapper component
 */
export default function Tooltip({
    content,
    children,
    delay = 300,
    position = "top",
}: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const triggerRef = useRef<HTMLElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout>();

    // If no content, just render children without tooltip
    if (!content) {
        return <>{children}</>;
    }

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const updatePosition = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const gap = 8;
        const offset = 4;

        let top = 0;
        let left = 0;

        switch (position) {
            case "top":
                top = rect.top - gap - offset;
                left = rect.left + rect.width / 2;
                break;
            case "bottom":
                top = rect.bottom + gap;
                left = rect.left + rect.width / 2;
                break;
            case "left":
                top = rect.top + rect.height / 2;
                left = rect.left - gap - offset;
                break;
            case "right":
                top = rect.top + rect.height / 2;
                left = rect.right + gap;
                break;
        }

        setCoords({ top, left });
    };

    const handleMouseEnter = () => {
        timeoutRef.current = setTimeout(() => {
            updatePosition();
            setIsVisible(true);
        }, delay);
    };

    const handleMouseLeave = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    const handleFocus = () => {
        updatePosition();
        setIsVisible(true);
    };

    const handleBlur = () => {
        setIsVisible(false);
    };

    const getTooltipClasses = () => {
        const baseClasses =
            "absolute z-50 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none whitespace-nowrap";

        const positionClasses = {
            top: "-translate-x-1/2 -translate-y-full",
            bottom: "-translate-x-1/2",
            left: "-translate-x-full -translate-y-1/2",
            right: "-translate-y-1/2",
        };

        return `${baseClasses} ${positionClasses[position]}`;
    };

    // Clone the child element and attach event handlers
    if (!isValidElement(children)) {
        return <>{children}</>;
    }

    const childElement = cloneElement(children as React.ReactElement<any>, {
        ref: triggerRef,
        onMouseEnter: (e: React.MouseEvent) => {
            handleMouseEnter();
            // Call original handler if it exists
            if (children.props.onMouseEnter) {
                children.props.onMouseEnter(e);
            }
        },
        onMouseLeave: (e: React.MouseEvent) => {
            handleMouseLeave();
            // Call original handler if it exists
            if (children.props.onMouseLeave) {
                children.props.onMouseLeave(e);
            }
        },
        onFocus: (e: React.FocusEvent) => {
            handleFocus();
            // Call original handler if it exists
            if (children.props.onFocus) {
                children.props.onFocus(e);
            }
        },
        onBlur: (e: React.FocusEvent) => {
            handleBlur();
            // Call original handler if it exists
            if (children.props.onBlur) {
                children.props.onBlur(e);
            }
        },
    });

    return (
        <>
            {childElement}
            {isVisible &&
                createPortal(
                    <div
                        className={getTooltipClasses()}
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                        }}
                        role="tooltip"
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
}
