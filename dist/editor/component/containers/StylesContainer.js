"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RootEditor_1 = require("../../RootEditor");
// import "./StyleContainer.scss";
exports.default = (props) => {
    const { config } = (0, RootEditor_1.useRoot)();
    config.styleManager = {
        appendTo: '.container-styles',
    };
    config.selectorManager = {
        appendTo: '.container-styles'
    };
    config.colorPicker = {
        appendTo: 'parent',
        containerClassName: 'color-picker',
        togglePaletteOnly: false,
        offset: { top: 26, left: -180, },
    };
    return (react_1.default.createElement("div", { className: 'container-styles', id: props.id }));
};
//# sourceMappingURL=StylesContainer.js.map