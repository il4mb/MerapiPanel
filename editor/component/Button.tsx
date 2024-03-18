import React from "react";
import { CommandObject } from "grapesjs";


type ButtonProps = {
    id: string,
    children: React.ReactElement | string
    className?: string,
    command: string | CommandObject,
    attributes?: {},
    active?: boolean,
    togglable?: boolean,
    context?: string,
}



const Button = (props: ButtonProps) => {

    return (<></>);
};


export default Button;
export type { ButtonProps };