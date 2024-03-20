import React, { useEffect } from "react";
import { ContainerProps } from "../../Container";
import { useRoot } from "../../Root";

export default (props: ContainerProps) => {

    const { config } = useRoot();

    config.layerManager = {
        appendTo: '.container-layers',
    }

    return (
        <div className="merapi__editor-container container-layers hide" id={props.id} ></div>
    )
}