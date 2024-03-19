"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const RootEditor_1 = require("../../RootEditor");
exports.default = (props) => {
    const { config } = (0, RootEditor_1.useRoot)();
    config.traitManager = {
        appendTo: '.container-traits',
    };
    return (react_1.default.createElement("div", { className: "container-traits", id: props.id }));
};
//# sourceMappingURL=TraitsContainer.js.map