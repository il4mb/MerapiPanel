import React from 'react';
import { LayoutProps } from './Layout';
import { CanvasProps } from './Canvas';

interface LayoutRowProps {
    children?: React.ReactElement<LayoutProps | CanvasProps>[]
    clasaName?: string
}

const LayoutRow = (props: LayoutRowProps) => {

    return (
        <div className={"merapi__editor--layout-row" + (props.clasaName ? " " + props.clasaName : "")}>
            {props.children}
        </div>
    );
};

export default LayoutRow;