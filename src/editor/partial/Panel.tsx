import React, { useEffect, useRef, useState } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Btn } from ".";
import { PanelProperties, PanelProps, ResizerOptions } from "grapesjs";
import { useApp } from "../App";

export interface PanelInterface extends PanelProps {
    children?: React.ReactNode
    id: string,
    className?: string,
    resizable?: boolean| ResizerOptions
}




export const Panel = ({ id, children, className, resizable }: PanelInterface) => {

    const ref = React.useRef(null);
    const [registered, setRegistered] = useState(false);

    const { config, setDefaultsPanels, classPrefix } = useApp();



    const buildPanelProps = (buttons: React.ReactElement[]): PanelProps => {

        return {
            id,
            el: `#${id}`,
            buttons: buttons.map((btn, index) => {

                let label = "";
                if (typeof btn.props.children === "string") {
                    label = btn.props.children;
                } else if (typeof btn.props.children === "object") {
                    try {
                        label = renderToStaticMarkup(btn.props.children);
                    } catch (error) {
                        console.error(error);
                    }
                }
                return {
                    id: btn.props.id,
                    label: label,
                    command: btn.props.command || null,
                    active: btn.props.active || false,
                    togglable: btn.props.togglable || false,
                    context: btn.props.context || null
                }
            }),
            resizable: resizable || false
        }
    }


    useEffect(() => {
        if (!ref.current || registered || !children) return;
        const panelProps = Array.isArray(children) ? buildPanelProps(children) : buildPanelProps([children as any]);
        setDefaultsPanels(panelProps);
    }, [ref]);


    return (
        <div ref={ref} className={`${classPrefix}panel ${className||''}`} id={id}></div>
    )
}