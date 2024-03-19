"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RootEditor_1 = require("../../RootEditor");
require("./LayersContainer.scss");
exports.default = (props) => {
    const { config } = (0, RootEditor_1.useRoot)();
    config.layerManager = {
        appendTo: '.container-layers',
    };
    return (react_1.default.createElement("div", { className: "container-layers hide", id: props.id }));
};
