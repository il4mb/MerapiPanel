import React, { useEffect, useRef } from "react";
import { useApp } from "../App";

export interface LayerManagerProps {
    className?: string
}
export const LayerManager = ({ className }: LayerManagerProps) => {
    const { classPrefix, setLayerManager } = useApp();
    const ref = useRef(null);

    useEffect(() => {
        if (ref.current === null) return;
        setLayerManager({
            appendTo: ref.current
        })
    }, [ref.current])
    return (
        <div ref={ref} className={`${classPrefix}layout layer-manager ${className || ""}`}></div>
    );
}