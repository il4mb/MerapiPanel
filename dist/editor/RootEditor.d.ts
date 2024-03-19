import React from "react";
import { Editor, EditorConfig } from "grapesjs";
export declare function isObject(item: any): boolean;
export declare const DeepMerge: (target: any, ...sources: any) => any;
export declare const findCanvasTypeInChildren: (children: React.ReactNode, callback: Function) => void;
export interface IRoot {
    progress: number;
    setProgress: React.Dispatch<React.SetStateAction<number>>;
    canvasRef: React.RefObject<HTMLDivElement>;
    editor: Editor | null;
    setEditor: React.Dispatch<React.SetStateAction<Editor | null>>;
    config: EditorConfig;
}
export declare const useRoot: () => IRoot;
export interface RootProps {
    children?: React.ReactElement[];
    onReady?: (editor: Editor) => void;
    config?: EditorConfig;
}
export declare const RootEditor: (props: RootProps) => React.JSX.Element;
//# sourceMappingURL=RootEditor.d.ts.map