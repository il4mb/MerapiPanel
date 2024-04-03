import React, { useEffect, useState } from 'react';
import { useProperty } from '.';
import { fetchWithProgress } from '../../tools';
import { useRoot } from '../Root';
import { AddComponentTypeOptions, BlockProperties } from 'grapesjs';
import { renderToStaticMarkup } from 'react-dom/server';

interface BlockPropsAttribute {
    name: string
    label: string
    type: string
    default?: any
}
interface BlockPropsOption {
    children: string[]
    dropable: boolean,
    extend: string,
    [key: string]: any
}

interface BlockProps extends BlockProperties {
    name: string
    title: string
    attributes?: BlockPropsAttribute[]
    options?: BlockPropsOption,
    isComponent?: any;
    edit: any
    view: any
}


interface ContainerAttr {
    el: React.ReactNode
    ref: React.RefObject<any>
}


function parseHTMLString(htmlString: string) {
    // Create a temporary container DIV
    const tempDiv = document.createElement('div');
    // Set its innerHTML to the HTML string
    tempDiv.innerHTML = htmlString;
    // The children of this DIV now represent your HTML string as DOM nodes
    return tempDiv.children.length === 1 ? tempDiv.children[0] : tempDiv.children;
}

const BlockProvider = () => {

    const { editor } = useRoot();
    const { hook } = useProperty();
    const [blocks, setBlocks] = useState<Map<string, BlockProps>>(new Map());


    var timming: any = null;

    hook("_watch", (map: Map<string, BlockProps>) => {
        setBlocks(map);
    });

    useEffect(() => {

        if (editor === null) return;
        if (blocks.size <= 0) return;

        if (timming) clearTimeout(timming);
        timming = setTimeout(() => {

            blocks.forEach((block, name) => {

                if (typeof name == 'string') {

                    const props: any = {};

                    block.attributes?.forEach((attr) => {
                        props[attr.name] = attr.default
                    });

                    editor.Components.addType(name, {
                        model: {
                            defaults: {

                                ...block.options,

                                traits: block.attributes?.map((attr) => ({
                                    name: attr.name,
                                    label: attr.label,
                                    type: attr.type,
                                    default: attr.default
                                })) || [],

                                // content: renderToStaticMarkup(<block.edit {...props} />),

                            },

                            init() {

                                props['children'] = (this.get("components")?.map((c: any) => c.toHTML()).join('') as string);
                            },
                            updated(property, value, prevValue) {

                                Object.keys(value).forEach((key) => {

                                    if (key in props) {
                                        if (block.attributes && block.attributes.find((attr) => attr.name == key)?.type == 'number') {
                                            props[key] = Number.parseInt(value[key], 10);
                                        } else {
                                            props[key] = value[key];
                                        }
                                    }
                                });

                                props['children'] = (this.get("components")?.map((c: any) => c.toHTML()).join('') as string);
                                this.view?.render();
                            },

                            reRender() {
                                this?.view?.render();
                            },

                            toHTML() {
                                return renderToStaticMarkup(<block.edit {...props} />);
                            }

                        },
                        view: {
                            onRender() {
                                this.el.innerHTML = renderToStaticMarkup(<block.edit {...props} />);
                            }
                        },

                        extend: block?.options?.extend,

                        isComponent: block.isComponent,

                    } as AddComponentTypeOptions);

                    editor.BlockManager.add(name, {
                        id: name,
                        label: block.title,
                        category: block.category || "General",
                        content: {
                            type: name
                        }
                    });
                }
            });

            console.log("Set components...");
            editor.setComponents(editor.getHtml());

        }, 400);

        editor.on('trait:value', ({ trait, component, value }) => {
            component.get("onAttributesChange")?.call(value);
        });

        editor.on('block:drag:stop', (component, block) => {


            console.log(component, block);
        });

    }, [editor, blocks]);

    return (
        <></>
    )
};

export default BlockProvider;
