"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Canvas = void 0;
const react_1 = __importDefault(require("react"));
const RootEditor_1 = require("./RootEditor");
const Canvas = (props) => {
    const { canvasRef } = (0, RootEditor_1.useRoot)();
    return (<div ref={canvasRef} className="editor__canvas">
            {props.children}
        </div>);
};
exports.Canvas = Canvas;
