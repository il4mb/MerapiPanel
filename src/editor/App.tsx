import grapesjs, { BlockManagerConfig, ButtonProps, DeviceManagerConfig, Editor, EditorConfig, LayerManagerConfig, Option, PanelProps, PanelsConfig, Plugin, StyleManagerConfig } from "grapesjs";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import blockBasicPlugin from 'grapesjs-blocks-basic';
import ckeditorPlugin from "grapesjs-plugin-ckeditor";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CodeEditor } from "./plugins/CodeEditor";
import parserPostCSS from 'grapesjs-parser-postcss';


export interface AppConfig {
    setEditor: (editor: Editor) => void
    setContainer: (container: string | HTMLElement | undefined) => void
    setBlockManager: (blockManager: BlockManagerConfig) => void
    setStyleManager: (styleManager: StyleManagerConfig) => void
    setLayerManager: (layerManager: LayerManagerConfig) => void
    setDeviceManager: (deviceManager: DeviceManagerConfig) => void
    setPlugins: (plugins: Plugin[]) => void
    setPluginsOpts: (pluginsOpts: Record<string, Option>) => void
    setDefaultsPanels: (defaultsPanels: PanelProps) => void
    setPanels: (panels: PanelsConfig) => void
    setTraitManager: (traitManager: any) => void
}

export interface AppProps extends EditorConfig {
    children?: React.ReactNode
}

export interface AppInterface extends AppConfig {
    appRef: React.RefObject<HTMLDivElement>
    config: EditorConfig
    editor: Editor | null
    needReload: boolean
    classPrefix: string
}


const AppContex = createContext({} as AppInterface);
export const useApp = () => useContext(AppContex);

export const App = ({ children, ...config }: AppProps) => {

    const appRef = useRef(null);
    const [classPrefix, setClassPrefix] = useState("editor-");
    const [editor, _setEditor] = useState<Editor | null>(null);
    const [assetManager, setAssetManager] = useState(config.assetManager || {});
    const [storageManager, setStorageManager] = useState(config.storageManager || {});
    const [blockManager, _setBlockManager] = useState<BlockManagerConfig>(config.blockManager || {});
    const [styleManager, _setStyleManager] = useState<StyleManagerConfig>(config.styleManager || {});
    const [traitManager, _setTraitManager] = useState(config.traitManager || {});
    const [layerManager, _setLayerManager] = useState<LayerManagerConfig>(config.layerManager || {});
    const [deviceManager, _setDeviceManager] = useState<DeviceManagerConfig>(config.deviceManager || {
        devices: [
            {
                name: "Desktop",
                width: "",
            },
            {
                name: "Tablet",
                width: "768px",
                widthMedia: "1024px",
            },
            {
                name: "Mobile",
                width: "320px",
                widthMedia: "480px",
            },
        ]
    });
    const [plugins, _setPlugins] = useState<string[] | Plugin<any>[]>(config.plugins as any || [
        blockBasicPlugin,
        ckeditorPlugin,
        CodeEditor,
        parserPostCSS
    ]);
    const [pluginsOpts, _setPluginsOpts] = useState<Record<string, Option>>({ ...config.pluginsOpts } || { CodeEditor: { allowInline: true } });
const [container, _setContainer] = useState<any>("#editor");
const [defaultsPanels, _setDefaultsPanels] = useState<PanelProps[]>(config.panels?.defaults || []);
const [panels, _setPanels] = useState<PanelsConfig>(config.panels || {
    defaults: defaultsPanels
});
const [needReload, setNeedReload] = useState(false);

const initial: AppInterface = {
    config: {
        container: container,
        assetManager: assetManager,
        storageManager: storageManager,
        traitManager: traitManager,
        blockManager: blockManager,
        styleManager: styleManager,
        layerManager: layerManager,
        panels: panels,
        deviceManager: deviceManager,
        plugins: plugins,
        pluginsOpts: pluginsOpts,
        cssIcons: "",
        protectedCss: '',
        ...config
    },
    appRef,
    needReload,
    classPrefix,
    editor,
    setEditor: (editor: Editor) => _setEditor(editor),
    setBlockManager: (blockManager: BlockManagerConfig) => {
        _setBlockManager(blockManager);
        setNeedReload(true);
    },
    setTraitManager: (traitManager: any) => {
        _setTraitManager(traitManager);
    },
    setStyleManager: (styleManager: StyleManagerConfig) => {
        _setStyleManager(styleManager);
        setNeedReload(true);
    },
    setLayerManager: (layerManager: LayerManagerConfig) => {
        _setLayerManager(layerManager);
        setNeedReload(true);
    },
    setDeviceManager: (deviceManager: DeviceManagerConfig) => {
        _setDeviceManager(deviceManager);
        setNeedReload(true);
    },
    setPlugins: (plugins: Plugin[]) => {
        _setPlugins(plugins);
        setNeedReload(true);
    },
    setPluginsOpts: (pluginsOpts: Record<string, Option>) => {
        _setPluginsOpts(pluginsOpts);
        setNeedReload(true);
    },
    setContainer: (container: string | HTMLElement | undefined) => {
        if (container && typeof container === "string") {
            const el = document.querySelector(container);
            el?.classList.add("editor-container");
            if (el && el instanceof HTMLElement) {
                _setContainer(el);
                setNeedReload(true);
            }
        } else if (container && container instanceof HTMLElement) {
            container.classList.add("editor-container");
            _setContainer(container);
            setNeedReload(true);
        }
    },
    setDefaultsPanels: (_defaultsPanels: PanelProps) => {
        if (defaultsPanels.some((p) => p.id === _defaultsPanels.id)) {
            defaultsPanels.splice(defaultsPanels.findIndex((p) => p.id === _defaultsPanels.id), 1);
        }
        defaultsPanels.push(_defaultsPanels);
        _setDefaultsPanels(defaultsPanels);;
        setNeedReload(true);
    },
    setPanels: (panels: PanelsConfig) => {
        _setPanels(panels);
    }

};

return (
    <div ref={appRef} className="editor-app">
        <AppContex.Provider value={initial}>
            {children}
        </AppContex.Provider>
    </div>
);
}