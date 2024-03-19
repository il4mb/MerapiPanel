import React from "react";
import { ContainerProps } from "./Container";
import { PanelProps } from "./component/Panel";
export interface LayoutProps {
    children?: React.ReactElement<ContainerProps | PanelProps> | React.ReactElement<ContainerProps | PanelProps>[];
    className?: string;
    id?: string;
}
export declare const Layout: (props: LayoutProps) => React.JSX.Element;
//# sourceMappingURL=Layout.d.ts.map