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
exports.LoadingScreen = void 0;
const react_1 = __importStar(require("react"));
const RootEditor_1 = require("../RootEditor");
const LoadingScreen = () => {
    const { progress } = (0, RootEditor_1.useRoot)();
    (0, react_1.useEffect)(() => {
        var _a;
        console.log("PROGRESS", progress);
        if (progress === 100) {
            (_a = document.querySelector('.loading-screen')) === null || _a === void 0 ? void 0 : _a.classList.add('hide');
            setTimeout(() => {
                var _a;
                (_a = document.querySelector('.loading-screen')) === null || _a === void 0 ? void 0 : _a.remove();
            }, 400);
        }
    }, [progress]);
    return (<div className="loading-screen">
            <div className="loading-progress">
                <div className="progressbar" style={{ "--MP-loading-width": `${progress}%` }}></div>
            </div>
        </div>);
};
exports.LoadingScreen = LoadingScreen;