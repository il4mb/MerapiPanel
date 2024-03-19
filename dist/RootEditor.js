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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RootEditor = exports.useRoot = exports.findCanvasTypeInChildren = exports.DeepMerge = exports.isObject = void 0;
const react_1 = __importStar(require("react"));
const grapesjs_1 = __importDefault(require("grapesjs"));
function isObject(item) {
    return (item && typeof item === 'object' && !Array.isArray(item));
}
exports.isObject = isObject;
const DeepMerge = (target, ...sources) => {
    let target_clone = Object.assign({}, target);
    sources.forEach((source) => {
        // Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
        for (const key in source) {
            if (isObject(source[key])) {
                if (!(key in target_clone)) {
                    target_clone[key] = {};
                }
                target_clone[key] = (0, exports.DeepMerge)(target_clone[key], source[key]);
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
exports.DeepMerge = DeepMerge;
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
    const canvasRef = (0, react_1.useRef)(null);
    const [editor, setEditor] = (0, react_1.useState)(null);
    const [count, setCount] = (0, react_1.useState)(5);
    const [progress, setProgress] = (0, react_1.useState)(0);
    const initial = {
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
    (0, react_1.useEffect)(() => {
        if (props.config) {
            initial.config = (0, exports.DeepMerge)(initial.config, props.config);
        }
    }, [props.config]);
    (0, react_1.useEffect)(() => {
        if (count > 0) {
            setTimeout(() => { setCount(count - 1); setProgress(40 - (count * 100) / 20); }, 200);
            return;
        }
        if (canvasRef.current === null) {
            console.error("cant find canvas component");
            return;
        }
        initial.config.container = canvasRef.current;
        const initialEditor = grapesjs_1.default.init(initial.config);
        setEditor(initialEditor);
        initialEditor.onReady(() => {
            if (props.onReady) {
                props.onReady(initialEditor);
            }
        });
    }, [count, canvasRef]);
    return (<RootContext.Provider value={initial}>
            <div className="merapi__editor">
                {props.children}
            </div>
        </RootContext.Provider>);
};
exports.RootEditor = RootEditor;
