import React from "react";

export interface ContainerProps {
    children?: React.ReactNode
    id?: string,
    style?: React.CSSProperties
}

export const Container = (props: ContainerProps) => {
    return (
        <div id={props.id} >
            {props.children}
        </div>
    )
}