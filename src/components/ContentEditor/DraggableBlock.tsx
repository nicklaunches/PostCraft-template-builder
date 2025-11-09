"use client";

import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";

interface DraggableBlockProps {
    children: React.ReactNode;
    index: number;
    id: string;
}

export default function DraggableBlock({ children, index, id }: DraggableBlockProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`relative group ${snapshot.isDragging ? "opacity-50" : ""}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Drag Handle - shows on hover */}
                    <div
                        {...provided.dragHandleProps}
                        className={`absolute -left-8 top-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing transition-opacity ${
                            isHovered ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
                        </svg>
                    </div>
                    {children}
                </div>
            )}
        </Draggable>
    );
}
