import React, { useEffect, useRef } from "react";
import { useApp } from "../App";


export interface TraitsManagerProps {
    className?: string
}


export const TraitsManager = ({ className }: TraitsManagerProps) => {
    const { classPrefix, setTraitManager } = useApp();
    const ref = useRef(null);

    useEffect(() => {
        if (!ref.current) return;
        setTraitManager({
            appendTo: ref.current
        })
    }, [ref.current])

    return (
        <div ref={ref} className={`${classPrefix}layout traits-manager ${className || ""}`}></div>
    )
}