import React, { useEffect, useRef } from "react";
import { Btn } from "./partial";
import { PanelProperties, PanelProps } from "grapesjs";
import { useContainer } from "./Container";

export interface PanelInterface {
    children: React.ReactNode
    id: string,
    className?: string
}




export const Panel = ({ id, children, className }: PanelInterface) => {

    const ref = React.useRef(null);
    const [registered, setRegistered] = React.useState(false);

    const { defaultsPanels, setDefaultsPanels } = useContainer();

    const buildPanelProps = (buttons: React.ReactElement[]): PanelProps => {

        return {
            id,
            el: `#${id}`,
            buttons: buttons.map((btn, index) => {

                return {
                    id: btn.props.id,
                    label: btn.props.children,
                    command: btn.props.command || null,
                    active: btn.props.active || false,
                    togglable: btn.props.togglable || false,
                    context: btn.props.context || null
                }
            })
        }
    }


    useEffect(() => {
        if (!ref.current || registered) return;
        const panelProps = Array.isArray(children) ? buildPanelProps(children) : buildPanelProps([children as any]);

        setDefaultsPanels([...defaultsPanels, panelProps]);
    }, [ref]);


    return (
        <div ref={ref} className={className} id={id}></div>
    )
}