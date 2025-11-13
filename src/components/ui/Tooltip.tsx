import { ReactNode, useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

/**
 * Props for the Tooltip component.
 *
 * @property {ReactNode} [content] - Tooltip content to display
 * @property {ReactNode} children - Element to attach tooltip to
 * @property {number} [delay] - Delay in ms before showing tooltip
 * @property {"top" | "bottom" | "left" | "right"} [position] - Tooltip position relative to trigger
 */
export interface TooltipProps {
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
 * Uses a wrapper div approach instead of cloning children to avoid
 * event handler conflicts and ensure proper cleanup.
 *
 * @param {TooltipProps} props - Component props
 * @returns {JSX.Element} Tooltip wrapper component
 */
export function Tooltip({ content, children, delay = 300, position = "bottom" }: TooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ top: 0, left: 0 });
    const wrapperRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const showTimeoutRef = useRef<NodeJS.Timeout>();
    const hideTimeoutRef = useRef<NodeJS.Timeout>();
    const isMountedRef = useRef(true);

    // If no content, just render children without tooltip
    if (!content) {
        return <>{children}</>;
    }

    // Cleanup on unmount
    useEffect(() => {
        isMountedRef.current = true;

        return () => {
            isMountedRef.current = false;
            if (showTimeoutRef.current) {
                clearTimeout(showTimeoutRef.current);
                showTimeoutRef.current = undefined;
            }
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
                hideTimeoutRef.current = undefined;
            }
        };
    }, []);

    const updatePosition = useCallback(() => {
        if (!wrapperRef.current || !isMountedRef.current) return;

        const rect = wrapperRef.current.getBoundingClientRect();
        const gap = 8;
        const offset = 4;
        const padding = 8; // Padding from viewport edges

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

        // Constrain to viewport bounds
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Ensure tooltip stays within horizontal bounds
        if (left < padding) {
            left = padding;
        } else if (left > viewportWidth - padding) {
            left = viewportWidth - padding;
        }

        // Ensure tooltip stays within vertical bounds
        if (top < padding) {
            top = padding;
        } else if (top > viewportHeight - padding) {
            top = viewportHeight - padding;
        }

        setCoords({ top, left });
    }, [position]);

    const showTooltip = useCallback(() => {
        // Clear any pending hide
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = undefined;
        }

        // Set show timeout
        showTimeoutRef.current = setTimeout(() => {
            if (isMountedRef.current) {
                updatePosition();
                setIsVisible(true);
            }
            showTimeoutRef.current = undefined;
        }, delay);
    }, [delay, updatePosition]);

    const hideTooltip = useCallback(() => {
        // Clear any pending show
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = undefined;
        }

        // Immediate hide for better UX
        if (isMountedRef.current) {
            setIsVisible(false);
        }
    }, []);

    const handleMouseEnter = useCallback(() => {
        showTooltip();
    }, [showTooltip]);

    const handleMouseLeave = useCallback(() => {
        hideTooltip();
    }, [hideTooltip]);

    const handleFocus = useCallback(() => {
        // Clear any pending actions
        if (showTimeoutRef.current) {
            clearTimeout(showTimeoutRef.current);
            showTimeoutRef.current = undefined;
        }
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = undefined;
        }

        if (isMountedRef.current) {
            updatePosition();
            setIsVisible(true);
        }
    }, [updatePosition]);

    const handleBlur = useCallback(() => {
        hideTooltip();
    }, [hideTooltip]);

    const getTooltipClasses = () => {
        const baseClasses =
            "fixed z-[9999] px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg pointer-events-none whitespace-nowrap transition-opacity duration-150";

        const positionClasses = {
            top: "-translate-x-1/2 -translate-y-full",
            bottom: "-translate-x-1/2",
            left: "-translate-x-full -translate-y-1/2",
            right: "-translate-y-1/2",
        };

        return `${baseClasses} ${positionClasses[position]}`;
    };

    return (
        <>
            <div
                ref={wrapperRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="inline-flex w-full"
            >
                {children}
            </div>
            {isVisible &&
                createPortal(
                    <div
                        ref={tooltipRef}
                        className={getTooltipClasses()}
                        style={{
                            top: `${coords.top}px`,
                            left: `${coords.left}px`,
                        }}
                        role="tooltip"
                        aria-hidden="true"
                    >
                        {content}
                    </div>,
                    document.body
                )}
        </>
    );
}
