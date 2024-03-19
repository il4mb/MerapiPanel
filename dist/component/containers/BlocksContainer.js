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
const RootEditor_1 = require("../../RootEditor");
require("./BlocksContainer.scss");
/**
 * Blocks Container
 */
exports.default = (props) => {
    const { editor, config } = (0, RootEditor_1.useRoot)();
    config.blockManager = {
        appendTo: '.blocks-container',
    };
    (0, react_1.useEffect)(() => {
        if (editor === null)
            return;
        editor.Components.addType('header', {
            tagName: 'h1',
            isComponent: el => {
                return el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'H6';
            },
            model: {
                defaults: {
                    tagName: 'h1',
                    content: 'hello world'
                }
            },
            extend: 'text',
        });
        editor.BlockManager.add('header', {
            id: 'header',
            label: 'Header',
            category: 'Text',
            content: {
                type: 'header'
            }
        });
        editor.setComponents(editor.getHtml());
    }, [editor]);
    return (<div className="blocks-container hide" id={props.id}>
            {props.children}
        </div>);
};