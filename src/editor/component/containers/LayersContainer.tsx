import React, { useEffect } from "react";
import { ContainerProps } from "../../Container";
import { useRoot } from "../../RootEditor";
import "./LayersContainer.scss";

export default (props: ContainerProps) => {

    const { config } = useRoot();

    config.layerManager = {
        appendTo: '.container-layers',
    }

    return (
        <div className="container-layers hide" id={props.id} ></div>
    )
}