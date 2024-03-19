import React from "react";
import { CommandObject } from "grapesjs";


export type ButtonProps = {
    id: string,
    children: React.ReactElement | string
    className?: string,
    command: string | CommandObject,
    attributes?: {},
    active?: boolean,
    togglable?: boolean,
    context?: string,
}



export const Button = (props: ButtonProps) => {

    return (<></>);
};