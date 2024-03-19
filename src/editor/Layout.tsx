import React from "react";
import { ContainerProps } from "./Container";
import { PanelProps } from "./component/Panel";

export interface LayoutProps {
    children?: React.ReactElement<ContainerProps | PanelProps> | React.ReactElement<ContainerProps | PanelProps>[]
    className?: string
    id?: string
}


export const Layout = (props: LayoutProps) => {

    return (
        <div className={"merapi__editor--layout" + (props.className ? " " + props.className : "")} id={props.id}>
            {props.children}
        </div>
    )
}