"use client";

import React from "react";

export default function Nav() {
    return (
        <nav className="flex h-16 items-center justify-between border-b px-4">
            <div className="text-lg font-semibold">PostCraft Template Builder</div>
            <div className="flex gap-2">{/* Save, Preview, etc buttons will go here */}</div>
        </nav>
    );
}
