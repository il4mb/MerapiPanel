import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import { useApp } from "./App";


export const EditorCanvas = () => {
    const { config, setContainer, editor, setEditor, needReload } = useApp();
    const ref = useRef(null);


    useEffect(() => {

        if (!ref.current || !needReload) return;

        if (editor) editor.destroy();
        
        const initialEditor = grapesjs.init(config as any);
        setEditor(initialEditor);

    }, [needReload]);

    useEffect(() => {
        if (!ref.current) return;
        setContainer(ref.current as any);
    }, [ref]);

    return (
        <div className="editor-canvas-wrapper">
            <div ref={ref} className="editor-canvas"></div>
        </div>
    );
};