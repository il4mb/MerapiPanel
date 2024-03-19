import { Editor, EditorConfig } from "grapesjs";
import React, { createContext, useContext, useRef, useState } from "react";


export interface RootConfig {
    progress: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    canvasRef: React.RefObject<HTMLDivElement>,
    editor: Editor | null,
    setEditor: React.Dispatch<React.SetStateAction<Editor | null>>,
    config: EditorConfig
}



const RootContex = createContext({} as any);
export const useRoot = () => useContext(RootContex);




export interface RootProps {
    children?: React.ReactElement[],
    onReady?: (editor: Editor) => void,
    config?: EditorConfig
}



export const RootElement = function (props: RootProps) {



    const canvasRef = useRef<any>();
    const [editor, setEditor] = useState<Editor | null>(null);
    const [count, setCount] = useState<number>(5);
    const [progress, setProgress] = useState<number>(0);



    return (
        <RootContex.Provider value={props}>
            {props.children}
        </RootContex.Provider>
    )
}