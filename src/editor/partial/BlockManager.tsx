import React, { useEffect, useRef } from "react";
import { useApp } from "../App";


export interface BlockManagerProps {
    className?: string
}

export const BlockManager = ({ className }: BlockManagerProps) => {
    const { setBlockManager, classPrefix } = useApp();
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        setBlockManager({
            appendTo: ref.current,
        });
        return () => { };
    }, [ref.current]);

    return (
        <>
            <div ref={ref} className={`${classPrefix}layout block-manager ${className || ""}`}></div>
        </>
    )
}