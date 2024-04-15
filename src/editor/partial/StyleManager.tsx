import React, { useEffect, useRef } from "react";
import { useApp } from "../App";

export interface StyleManagerProps {
    className?: string
    children?: any
}

export const StyleManager = ({ children, className }: StyleManagerProps = {}) => {

    const { classPrefix, setStyleManager } = useApp();
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        setStyleManager({
            appendTo: ref.current,
        })
    }, [ref.current]);

    return (
        <div ref={ref} className={`${classPrefix}layout style-manager ${className || ""}`}>
            { children }
        </div>
    )
}