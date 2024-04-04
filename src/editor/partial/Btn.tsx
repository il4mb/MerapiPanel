import { Command, CommandObject, CommandsConfig } from "grapesjs";
import React from "react";

export interface BtnProps {
    id: string,
    command?: CommandObject,
    active?: boolean,
    togglable?: boolean,
    children?: React.ReactNode|string
    context?: string

}
export const Btn = ({ id, command, active, togglable, children }: BtnProps) => {

    return (<></>);
}