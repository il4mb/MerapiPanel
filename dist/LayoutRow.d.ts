import React from 'react';
import { LayoutProps } from './Layout';
import { CanvasProps } from './Canvas';
export interface LayoutRowProps {
    children?: React.ReactElement<LayoutProps | CanvasProps>[];
    clasaName?: string;
}
export declare const LayoutRow: (props: LayoutRowProps) => React.JSX.Element;
