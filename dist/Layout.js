"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const react_1 = __importDefault(require("react"));
const Layout = (props) => {
    return (<div className={"merapi__editor--layout" + (props.className ? " " + props.className : "")} id={props.id}>
            {props.children}
        </div>);
};
exports.Layout = Layout;
