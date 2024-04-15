import React, { useEffect, useRef } from "react";
import { useApp } from "../App";


export interface SelectorManagerProps {
    className?: string
    children?: any
}


export const SelectorManager = ({ children, className }: SelectorManagerProps) => {
    const { setSelectorManager, classPrefix } = useApp();
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        setSelectorManager({
            appendTo: ref.current,
        });
        return () => { };
    }, [ref.current]);


    return (
        <>
            <div ref={ref} className={`${classPrefix}layout selector-manager ${className || ""}`}>
                {children}
            </div>
        </>
    )
}