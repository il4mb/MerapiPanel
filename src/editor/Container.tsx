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


export const Container = (props: any) => {

    const [editor, setEditor] = useState<Editor | null>(null);
    const [blockManager, setBlockManager] = useState<BlockManagerConfig>({});
    const [styleManager, setStyleManager] = useState<StyleManagerConfig>({});
    const [layerManager, setLayerManager] = useState<LayerManagerConfig>({});
    const [deviceManager, setDeviceManager] = useState<DeviceManagerConfig>({
        devices: [
            {
                name: "Desktop",
                width: "",
            },
            {
                name: "Mobile",
                width: "320px",
                widthMedia: "480px",
            },
        ]
    });
    const [plugins, setPlugins] = useState<string[] | Plugin<any>[]>([
        blockBasic
    ]);
    const [pluginsOpts, setPluginsOpts] = useState<Record<string, Option>>({});
    const [container, setContainer] = useState<string | HTMLElement | undefined>("#editor");
    const [defaultsPanels, setDefaultsPanels] = useState<PanelProps[]>([]);
    const [panels, setPanels] = useState<PanelsConfig>({
        defaults: defaultsPanels
    });
    const [needReload, setNeedReload] = useState(false);

    const initial: EditorInterface = {
        config: {
            container: container,
            storageManager: false,
            blockManager: blockManager,
            styleManager: styleManager,
            layerManager: layerManager,
            panels: panels,
            deviceManager: deviceManager,
            plugins: plugins,
            pluginsOpts: pluginsOpts
        },
        needReload,
        editor,
        setEditor,
        blockManager,
        setBlockManager: (blockManager: BlockManagerConfig) => {
            setBlockManager(blockManager);
            setNeedReload(true);
        },
        styleManager,
        setStyleManager: (styleManager: StyleManagerConfig) => {
            setStyleManager(styleManager);
            setNeedReload(true);
        },
        layerManager,
        setLayerManager: (layerManager: LayerManagerConfig) => {
            setLayerManager(layerManager);
            setNeedReload(true);
        },
        deviceManager,
        setDeviceManager: (deviceManager: DeviceManagerConfig) => {
            setDeviceManager(deviceManager);
            setNeedReload(true);
        },
        plugins,
        setPlugins: (plugins: Plugin[]) => {
            setPlugins(plugins);
            setNeedReload(true);
        },
        pluginsOpts,
        setPluginsOpts: (pluginsOpts: Record<string, Option>) => {
            setPluginsOpts(pluginsOpts);
            setNeedReload(true);
        },
        container,
        setContainer: (container: string | HTMLElement | undefined) => {
            setContainer(container);
            setNeedReload(true);
        },
        defaultsPanels,
        setDefaultsPanels: (defaultsPanels: PanelProps[]) => {
            setDefaultsPanels(defaultsPanels);
            setNeedReload(true);
        },
        panels,
        setPanels: (panels: PanelsConfig) => {
            setPanels(panels);
        }
    };

    return (
        <ContainerContext.Provider value={{ ...initial }}>
            {props.children}
        </ContainerContext.Provider>
    )

}