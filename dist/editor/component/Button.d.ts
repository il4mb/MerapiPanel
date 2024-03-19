import React from "react";
import { CommandObject } from "grapesjs";
export type ButtonProps = {
    id: string;
    children: React.ReactElement | string;
    className?: string;
    command: string | CommandObject;
    attributes?: {};
    active?: boolean;
    togglable?: boolean;
    context?: string;
};
export declare const Button: (props: ButtonProps) => React.JSX.Element;
//# sourceMappingURL=Button.d.ts.map