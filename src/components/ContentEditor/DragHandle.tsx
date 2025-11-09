"use client";

import React from "react";

interface DragHandleProps {
    onDragStart?: () => void;
}

export default function DragHandle({ onDragStart }: DragHandleProps) {
    return (
        <div
            className="absolute left-0 top-0 flex items-center justify-center w-6 h-6 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing"
            style={{ marginLeft: "-2rem" }}
            onMouseDown={onDragStart}
            draggable
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-400 hover:text-gray-600"
            >
                <circle cx="4" cy="3" r="1" fill="currentColor" />
                <circle cx="4" cy="8" r="1" fill="currentColor" />
                <circle cx="4" cy="13" r="1" fill="currentColor" />
                <circle cx="9" cy="3" r="1" fill="currentColor" />
                <circle cx="9" cy="8" r="1" fill="currentColor" />
                <circle cx="9" cy="13" r="1" fill="currentColor" />
            </svg>
        </div>
    );
}
