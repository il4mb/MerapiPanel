import React from "react";
import { useRoot } from "./Root";

export interface CanvasProps {
    children?: React.ReactNode
}


export const Canvas = (props: any) => {

    const { canvasRef } = useRoot();

    return (
        <div ref={canvasRef} className="editor__canvas">
            {props.children}
        </div>
    )
}