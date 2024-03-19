"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootEditor = exports.useRoot = exports.findCanvasTypeInChildren = exports.deepMerge = exports.isObject = void 0;
const react_1 = __importStar(require("react"));
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
exports.isObject = isObject;
const deepMerge = (target, ...sources) => {
    let target_clone = { ...target };
    sources.forEach((source) => {
        // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
        for (const key in source) {
            if (isObject(source[key])) {
                if (!(key in target_clone)) {
                    target_clone[key] = {};
                }
                target_clone[key] = (0, exports.deepMerge)(target_clone[key], source[key]);
            }
            else if (Array.isArray(source[key])) {
                if (key in target_clone) {
                    for (const i in source[key]) {
                        if (typeof source[key][i] === "object") {
                            let isDuplicate = false;
                            for (const j in target_clone[key]) {
                                let sortedTarget = Object.keys(target_clone[key][j]).sort().reduce((acc, x) => {
                                    acc[x] = target_clone[key][j][x];
                                    return acc;
                                }, {});
                                let sortedSource = Object.keys(source[key][i]).sort().reduce((acc, x) => {
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
                                target_clone[key].push(source[key][i]);
                            }
                        }
                        else if (target_clone[key].indexOf(source[key][i]) === -1) {
                            target_clone[key].push(source[key][i]);
                        }
                    }
                }
                else {
                    target_clone[key] = source[key];
                }
            }
            else {
                target_clone[key] = source[key];
            }
        }
    });
    return target_clone;
};
exports.deepMerge = deepMerge;
const findCanvasTypeInChildren = (children, callback) => {
    react_1.default.Children.forEach(children, child => {
        if (react_1.default.isValidElement(child)) {
            // Check if the child is the target type
            if (child.type === "Canvas" || (child.type && child.type.name === "Canvas")) {
                callback(child);
            }
            // If the child has its own children, recurse
            if (child.props && child.props.children) {
                (0, exports.findCanvasTypeInChildren)(child.props.children, callback);
            }
        }
        else if (Array.isArray(child)) {
            // If the child is an array, recurse through its elements
            (0, exports.findCanvasTypeInChildren)(child, callback);
        }
    });
};
exports.findCanvasTypeInChildren = findCanvasTypeInChildren;
const RootContext = (0, react_1.createContext)({});
const useRoot = () => (0, react_1.useContext)(RootContext);
exports.useRoot = useRoot;
const RootEditor = (props) => {
    // const canvasRef = useRef<HTMLDivElement | null>(null);
    // const [editor, setEditor] = useState<Editor | null>(null);
    // const [count, setCount] = useState<number>(5);
    // const [progress, setProgress] = useState<number>(0);
    // const initial: IRoot = {
    //     progress,
    //     setProgress,
    //     canvasRef: canvasRef,
    //     editor,
    //     setEditor,
    //     config: {
    //         fromElement: true,
    //         height: '100%',
    //         width: "100%",
    //         storageManager: false,
    //         layerManager: {
    //             stylePrefix: "merapi__editor-"
    //         },
    //         stylePrefix: "merapi__editor-",
    //         cssIcons: undefined,
    //         colorPicker: {
    //             containerClassName: 'color-picker',
    //         },
    //         // Avoid any default panel
    //         panels: { defaults: [] },
    //     }
    // };
    // useEffect(() => {
    //     if (props.config) {
    //         initial.config = deepMerge(initial.config, props.config);
    //     }
    // }, [props.config]);
    // useEffect(() => {
    //     if (count > 0) {
    //         setTimeout(() => { setCount(count - 1); setProgress(40 - (count * 100) / 20); }, 200);
    //         return;
    //     }
    //     if (canvasRef.current === null) {
    //         console.error("cant find canvas component");
    //         return;
    //     }
    //     initial.config.container = canvasRef.current as HTMLElement;
    //     const initialEditor = grapesjs.init(initial.config);
    //     setEditor(initialEditor as any);
    //     initialEditor.onReady(() => {
    //         if (props.onReady) {
    //             props.onReady(initialEditor);
    //         }
    //     });
    // }, [count, canvasRef]);
    // return (
    //     <RootContext.Provider value={initial}>
    //         <div className="merapi__editor">
    //             {props.children}
    //         </div>
    //     </RootContext.Provider>
    // )
    // return (
    //     <>
    //         <RootContext.Provider value={{} as any}>
    //             <div className="merapi__editor">
    //                 {props.children}
    //             </div>
    //         </RootContext.Provider>
    //     </>
    // )
};
exports.RootEditor = RootEditor;
//# sourceMappingURL=RootEditor.js.map