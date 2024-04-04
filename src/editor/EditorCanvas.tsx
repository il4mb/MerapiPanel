import React, { useEffect, useRef } from "react";
import { useContainer } from "./Container";
import grapesjs from "grapesjs";


export const EditorCanvas = () => {
    const { config, setContainer, editor, setEditor, needReload } = useContainer();
    const ref = useRef(null);


    useEffect(() => {

        if (!ref.current || !needReload) return;

        if(editor) editor.destroy();
        const initialEditor = grapesjs.init(config);
        setEditor(initialEditor);

    }, [needReload]);

    useEffect(() => {
        if (!ref.current) return;
        setContainer(ref.current as any);
    }, [ref]);

    return <div ref={ref} className="editor-canvas"></div>;
};