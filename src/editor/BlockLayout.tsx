import React, { useEffect, useRef } from "react";
import { useContainer } from "./Container";


export const BlockLayout = (props: any) => {
    const { setBlockManager } = useContainer();
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
            <div ref={ref} className="block-layout">
                {props.children}
            </div>
        </>
    )
}