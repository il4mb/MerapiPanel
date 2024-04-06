import grapesjs, { BlockManagerConfig, ButtonProps, DeviceManagerConfig, Editor, EditorConfig, LayerManagerConfig, Option, PanelProps, PanelsConfig, Plugin, StyleManagerConfig } from "grapesjs";
import React, { createContext, useContext, useState } from "react";
import blockBasic from 'grapesjs-blocks-basic';

export interface EditorInterface {
    config: EditorConfig
    editor: Editor | null
    setEditor: (editor: Editor) => void
    blockManager: BlockManagerConfig
    setBlockManager: (blockManager: BlockManagerConfig) => void
    styleManager: StyleManagerConfig
    setStyleManager: (styleManager: StyleManagerConfig) => void
    layerManager: LayerManagerConfig
    setLayerManager: (layerManager: LayerManagerConfig) => void
    deviceManager: DeviceManagerConfig
    setDeviceManager: (deviceManager: DeviceManagerConfig) => void
    plugins: string[] | Plugin<any>[]
    setPlugins: (plugins: Plugin[]) => void
    pluginsOpts: Record<string, Option>
    setPluginsOpts: (pluginsOpts: Record<string, Option>) => void
    container: string | HTMLElement | undefined
    setContainer: (container: string | HTMLElement | undefined) => void
    defaultsPanels: PanelProps[]
    setDefaultsPanels: (defaultsPanels: PanelProps[]) => void
    panels: PanelsConfig
    setPanels: (panels: PanelsConfig) => void
    needReload: boolean
}

const ContainerContext = createContext({} as EditorInterface);
export const useContainer = () => useContext(ContainerContext);


export const EditorBody = (props: any) => {


    return (
        <div className="editor-body">
            {props.children}
        </div>
    )

}