import React, { useEffect } from "react";
import { ContainerProps } from "../../Container";
import { useRoot } from "../../RootEditor";



export default (props: ContainerProps) => {

    const { config } = useRoot();

    config.traitManager = {
        appendTo: '.container-traits',
    }

    return (
        <div className="container-traits" id={props.id}></div>
    )
}