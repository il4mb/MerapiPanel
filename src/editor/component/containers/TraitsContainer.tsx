import React, { useEffect } from "react";
import { ContainerProps } from "../../Container";
import { useRoot } from "../../Root";



export default (props: ContainerProps) => {

    const { config } = useRoot();

    config.traitManager = {
        appendTo: '.container-traits',
    }

    return (
        <div className="merapi__editor-container container-traits" id={props.id}></div>
    )
}