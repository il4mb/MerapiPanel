import React from "react";
import { ContainerProps } from "../Container";
import { ButtonProps } from "./Button";
export interface PanelProps {
    children?: React.ReactElement<ContainerProps | ButtonProps> | React.ReactElement<ContainerProps | ButtonProps>[];
    id: string;
    className?: string;
}
export declare const usePanel: () => PanelProps;
export declare const Panel: (props: PanelProps) => React.JSX.Element;
//# sourceMappingURL=Panel.d.ts.map