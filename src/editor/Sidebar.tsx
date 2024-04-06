import React, { useEffect } from "react";
import { useApp } from "./App";

export interface SidebarProps {
    children?: React.ReactNode
}

export const Sidebar = ({ children }: SidebarProps) => {
    const { editor, appRef } = useApp();

    useEffect(() => {
        editor?.on("run:preview", () => {
            console.log("preview:run");
            appRef.current?.classList.add("preview-mode");
        });
        editor?.on("stop:preview", () => {
            console.log("preview:stop");
            appRef.current?.classList.remove("preview-mode");
        });
    }, [editor]);

    return (
        <div className="editor-sidebar">
            {children}
        </div>
    );
}