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
exports.Breadcrumb = exports.generateBreadcrumbs = void 0;
const react_1 = __importStar(require("react"));
const RootEditor_1 = require("../RootEditor");
// Function to generate breadcrumbs
function generateBreadcrumbs(component) {
    const breadcrumbs = [];
    let currentComponent = component;
    // Traverse up the component hierarchy until reaching the body
    while (currentComponent) {
        let name = currentComponent.get('type');
        if (currentComponent.get("tagName") == "body") {
            name = "body";
        }
        else if (!name || name?.length == 0) {
            name = currentComponent.get("tagName");
        }
        name = `<span class='component-name'>${name}</span>`;
        if (currentComponent.get("classes")?.length > 0) {
            name += `<span class='component-class'>`;
            currentComponent.get("classes").models.forEach((model) => {
                name += "." + model.get("name");
            });
            name += "</span>";
        }
        breadcrumbs.unshift(name);
        currentComponent = currentComponent.parent();
    }
    return breadcrumbs;
}
exports.generateBreadcrumbs = generateBreadcrumbs;
// Function to update the breadcrumb UI
function updateBreadcrumbUI(component, ref) {
    const breadcrumbContainer = ref.current;
    if (!breadcrumbContainer)
        return;
    breadcrumbContainer.innerHTML = '';
    const breadcrumbs = generateBreadcrumbs(component);
    breadcrumbs.forEach((crumb, index) => {
        const crumbElement = document.createElement('span');
        crumbElement.innerHTML = crumb;
        if (index !== breadcrumbs.length - 1) {
            crumbElement.innerHTML += ' <i class="fas fa-angle-right"></i> ';
        }
        breadcrumbContainer.appendChild(crumbElement);
    });
}
const Breadcrumb = () => {
    const { editor } = (0, RootEditor_1.useRoot)();
    const ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (editor === null)
            return;
        editor.on('component:selected', (component) => {
            updateBreadcrumbUI(component, ref);
        });
    }, [editor]);
    return (react_1.default.createElement("div", { ref: ref, id: "breadcrumb", className: "merapi__editor--breadcrumb" }));
};
exports.Breadcrumb = Breadcrumb;
//# sourceMappingURL=Breadcrumb.js.map