import grapesjs, { Editor, EditorConfig } from "grapesjs";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";


export function isObject(item: any) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}



export const deepMerge = (target: any, ...sources: any) => {

    let target_clone = { ...target };

    sources.forEach((source: { [x: string]: any; }) => {
        // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
        for (const key in source) {

            if (isObject(source[key])) {
                if (!(key in target_clone)) {
                    target_clone[key] = {};
                }
                target_clone[key] = deepMerge(target_clone[key], source[key]);
            }
            else if (Array.isArray(source[key])) {

                if (key in target_clone) {
                    for (const i in source[key]) {

                        if (typeof source[key][i] === "object") {

                            let isDuplicate = false;

                            for (const j in target_clone[key]) {

                                let sortedTarget = Object.keys(target_clone[key][j]).sort().reduce((acc: any, x) => {
                                    acc[x] = target_clone[key][j][x];
                                    return acc;
                                }, {});
                                let sortedSource = Object.keys(source[key][i]).sort().reduce((acc: any, x) => {
                                    acc[x] = source[key][i][x];
                                    return acc;
                                }, {});


                                let fromTarget = JSON.stringify(sortedTarget).toLowerCase();
                                let fromSource = JSON.stringify(sortedSource).toLowerCase();
                                if (fromSource === fromTarget) {
                                    isDuplicate = true;
                                    break;
                                }
                            }

                            if (!isDuplicate) {
                                (target_clone[key] as Array<any>).push(source[key][i]);
                            }
                        }
                        else if ((target_clone[key] as Array<any>).indexOf(source[key][i]) === -1) {
                            (target_clone[key] as Array<any>).push(source[key][i]);
                        }
                    }
                } else {
                    target_clone[key] = source[key];
                }
            }

            else {
                target_clone[key] = source[key];
            }
        }
    })

    return target_clone;
}


export interface RootConfig {
    progress: number,
    setProgress: React.Dispatch<React.SetStateAction<number>>,
    canvasRef: React.RefObject<HTMLDivElement>,
    editor: Editor | null,
    setEditor: React.Dispatch<React.SetStateAction<Editor | null>>,
    config: EditorConfig
}



const RootContex = createContext({} as RootConfig);
export const useRoot = () => useContext(RootContex);




export interface RootElementProps {
    children?: React.ReactElement[],
    onReady?: (config: RootConfig) => void,
    config?: EditorConfig
}



export const RootElement = function (props: RootElementProps) {

    const canvasRef = useRef<HTMLDivElement | null>(null);
    const [editor, setEditor] = useState<Editor | null>(null);
    const [count, setCount] = useState<number>(5);
    const [progress, setProgress] = useState<number>(0);


    const initial: RootConfig = {
        progress,
        setProgress,
        canvasRef: canvasRef,
        editor,
        setEditor,
        config: {
            fromElement: true,
            height: '100%',
            width: "100%",
            storageManager: false,
            layerManager: {
                stylePrefix: "merapi__editor-"
            },
            stylePrefix: "merapi__editor-",
            cssIcons: undefined,
            colorPicker: {
                containerClassName: 'color-picker',
            },
            // Avoid any default panel
            panels: { defaults: [] },
        }
    };


    useEffect(() => {
        if (props.config) {
            initial.config = deepMerge(initial.config, props.config);
        }
    }, [props.config]);



    useEffect(() => {

        if (count > 0) {
            setTimeout(() => { setCount(count - 1); setProgress(40 - (count * 100) / 20); }, 200);
            return;
        }

        if (canvasRef.current === null) {
            console.error("cant find canvas component");
            return;
        }

        initial.config.container = canvasRef.current as HTMLElement;

        const initialEditor = grapesjs.init(initial.config);
        setEditor(initialEditor as any);
        initialEditor.onReady(() => {
            if (props.onReady) {
                initial.editor = initialEditor;
                props.onReady(initial);
            }
        });

    }, [count, canvasRef]);


    return (
        <RootContex.Provider value={initial}>
            <div className="merapi__editor">
                {props.children}
            </div>
        </RootContex.Provider>
    )
}