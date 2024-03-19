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
exports.Panel = exports.usePanel = void 0;
const react_1 = __importStar(require("react"));
const RootEditor_1 = require("../RootEditor");
const server_1 = require("react-dom/server");
const PanelContext = (0, react_1.createContext)({});
const usePanel = () => (0, react_1.useContext)(PanelContext);
exports.usePanel = usePanel;
const findButtonTypeInChildren = (children, callback) => {
    react_1.default.Children.forEach(children, child => {
        if (react_1.default.isValidElement(child)) {
            // Check if the child is the target type
            if (child.type === "Button" || (child.type && child.type.name === "Button")) {
                callback(child);
            }
            // If the child has its own children, recurse
            if (child.props && child.props.children) {
                findButtonTypeInChildren(child.props.children, callback);
            }
        }
        else if (Array.isArray(child)) {
            // If the child is an array, recurse through its elements
            findButtonTypeInChildren(child, callback);
        }
    });
};
const registerPanel = (editor, id, btnProps) => {
    editor.Panels.addPanel({
        id,
        el: `#${id}`,
        buttons: btnProps.map((btn) => {
            return {
                id: btn.id,
                className: btn.className,
                label: typeof btn.children === 'string' ? btn.children : (0, server_1.renderToStaticMarkup)(btn.children),
                command: btn.command,
                attributes: btn.attributes,
                active: btn.active,
                togglable: btn.togglable,
                context: btn.context
            };
        }),
    });
};
const Panel = (props) => {
    const { editor } = (0, RootEditor_1.useRoot)();
    const [mookProps, setMookProps] = react_1.default.useState(props);
    (0, react_1.useEffect)(() => {
        if (editor == null)
            return;
        // find buttonType in children
        const buttonsProps = [];
        findButtonTypeInChildren(props.children, (btn) => {
            buttonsProps.push(btn.props); // push the button props
        });
        // register the panel with buttons props
        registerPanel(editor, props.id, buttonsProps);
        setTimeout(() => {
            setMookProps(props); // toggle change for delay
        }, 100);
    }, [editor]);
    return (react_1.default.createElement(PanelContext.Provider, { value: mookProps },
        react_1.default.createElement("div", { className: "merapi__editor--panel " + (props.className ? props.className : ""), id: props.id }, props.children)));
};
exports.Panel = Panel;
//# sourceMappingURL=Panel.js.map