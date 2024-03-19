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
const react_1 = __importStar(require("react"));
const underscore_1 = require("underscore");
const RootEditor_1 = require("../../RootEditor");
require("./SelectedContainer.scss");
exports.default = (props) => {
    const { editor } = (0, RootEditor_1.useRoot)();
    const [name, setName] = (0, react_1.useState)("");
    const [icon, setIcon] = (0, react_1.useState)("");
    (0, react_1.useEffect)(() => {
        if (editor == null)
            return;
        editor.on('component:selected', (e) => {
            setName(e.get('type').length > 0 ? e.get('type') == "wrapper" ? "body" : e.get("type") : e.get('tagName'));
            let _icon = e.get('icon');
            if ((0, underscore_1.isString)(_icon) && _icon.length <= 0) {
                _icon = e.get('fallback');
            }
            if (!_icon || ((0, underscore_1.isString)(_icon) && _icon.length <= 0)) {
                _icon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-circle" viewBox="0 0 16 16">
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                <path d="M11.354 4.646a.5.5 0 0 0-.708 0l-6 6a.5.5 0 0 0 .708.708l6-6a.5.5 0 0 0 0-.708"/>
              </svg>`;
            }
            _icon = _icon.replace(/width=["'].*?["']/gi, "width=\"35\"")
                .replace(/height=["'].*?["']/gi, "height=\"35\"")
                .replace(/(scale|fill|style)=["'].*?["']/gi, "")
                .replace(/<svg(.*)>/gi, "<svg $1 fill=\"currentColor\">");
            setIcon(_icon);
        });
    }, [editor]);
    return (react_1.default.createElement("div", { className: "container-selected", id: props.id },
        react_1.default.createElement("div", { className: "component-icon", dangerouslySetInnerHTML: { __html: icon } }),
        react_1.default.createElement("div", { className: "component-name" }, name)));
};
