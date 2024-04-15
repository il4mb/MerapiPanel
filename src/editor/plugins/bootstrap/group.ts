import { Editor } from "grapesjs";
import $ from "jquery";


export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    Components.addType("group", {
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: true,
                editable: true,
                components: [],
            },
            updated(prop, val, prev) {
                if (prop === "components") {
                    this.view?.render();
                }
            }
        },

        view: {
            render() {

                this.el.classList.remove('editor-empty');

                const components = this.model.components();
                if (components.size() <= 0) {

                    if (typeof (this.model as any).placeholder === "function") {
                        const placeholder = (this.model as any).placeholder();
                        if (typeof placeholder === "string") {
                            this.el.innerHTML = `<div class="text-muted py-3 text-center opacity-50 w-100" style="font-size: 0.7em;">${placeholder}</div>`;
                        } else {
                            this.el.innerHTML = "";
                            this.el.appendChild($(`<div class="text-muted py-3 text-center opacity-50 w-100" style="font-size: 0.7em;"></div>`).append(placeholder)[0]);
                        }

                    } else {

                        this.el.innerHTML = `<div class="text-muted py-3 text-center opacity-50 w-100" style="font-size: 0.7em;">
                    <svg width="2em" height="2em" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                        <path fill="currentColor" d="M28.9,10.7c-3,0.7-4.6,2.3-4.6,4.7c0,4.1,2.4,5.7,7.1,4.9c1.6-0.3,4.4-0.6,6.2-0.6c3.1,0,3.5-0.1,4.7-1.3c2.3-2.4,1.7-6.3-1.3-7.8C39.7,9.8,32.1,10,28.9,10.7z" />
                        <path fill="currentColor" d="M56.7,10.5c-0.6,0.2-1.5,1.1-2,1.9c-1.3,2.1-1,4.3,0.9,6c1.4,1.3,1.4,1.3,8.2,1.3c5.7,0,6.9-0.1,7.7-0.8c2.5-2,2.7-5,0.5-7.3L70.5,10l-6.4,0C60.6,10.1,57.3,10.3,56.7,10.5z" />
                        <path fill="currentColor" d="M85.3,11.6c-2.3,2.3-2.1,5.3,0.5,7.3c0.8,0.7,2,0.8,7.7,0.8c6.8,0,6.8,0,8.2-1.3c2.6-2.3,1.9-6.7-1.2-7.9c-0.6-0.3-4-0.5-7.4-0.5h-6.2L85.3,11.6z" />
                        <path fill="currentColor" d="M116.2,10.6c-1.7,0.9-2.5,2.4-2.5,4.4c0,1.6,0.3,2.3,1.3,3.4l1.3,1.3h7h7l1.3-1.3c1.1-1.1,1.3-1.8,1.3-3.3c0-4.3-1.5-5.1-9.8-5.1C119.7,10,116.8,10.3,116.2,10.6z" />
                        <path fill="currentColor" d="M144.7,16.2c-1.6,0.7-2.9,2.8-2.9,4.6c0,0.6,0.5,1.8,1.2,2.7c2.5,3.4,3.3,4.8,3.9,6.4c0.7,2.3,2.4,3.7,4.6,4c1.7,0.2,2,0.1,3.5-1.4c1.3-1.3,1.6-2,1.6-3.4c0-4.1-5.8-12.8-9-13.3C146.8,15.6,145.5,15.8,144.7,16.2z" />
                        <path fill="currentColor" d="M13.2,25c-1.9,1.1-2.8,3.9-3,9.7c-0.3,5.8,0.1,7.2,2.3,8.5c1.9,1.2,4.2,0.9,5.9-0.7c1.1-1.1,1.2-1.7,1.6-6.4c0.6-8.6,0.6-8.9-0.7-10.3C17.7,24.4,14.9,24,13.2,25z" />
                        <path fill="currentColor" d="M149.1,45.5l-1.3,1.3v7v7l1.3,1.3c1.1,1.1,1.8,1.3,3.3,1.3c4.2,0,5.1-1.5,5.1-9.7c0-3.5-0.2-6.4-0.5-7c-0.9-1.8-2.3-2.6-4.5-2.6C150.9,44.1,150.2,44.4,149.1,45.5z" />
                        <path fill="currentColor" d="M12.1,55.1c-1.8,1.4-2,2.6-2,8.8c0,8.2,0.8,9.7,5.1,9.7c1.5,0,2.2-0.3,3.3-1.3l1.3-1.3v-7v-7l-1.3-1.3c-1.1-1.1-1.8-1.3-3.4-1.3C13.8,54.3,12.6,54.6,12.1,55.1z" />
                        <path fill="currentColor" d="M149.5,75c-0.9,0.7-1.8,0.9-4.2,0.9c-4.4,0-7.7,1.4-10.9,4.6c-1.4,1.4-2.9,3.4-3.2,4.3c-0.6,1.6-0.8,1.7-1.8,1.4c-2.1-0.6-7.6-0.3-9.5,0.6c-4.2,1.8-7.7,5.5-9,9.6c-0.5,1.8-0.6,1.8-3,1.8c-7.3,0-13.9,6-14.9,13.5l-0.3,2.7l-2.1,0.6c-4.6,1.3-8.9,5.6-10.2,10c-0.3,1.1-0.6,3.3-0.5,5c0,4.4,1.7,7.7,5.7,11.7l3.2,3.1v3.2v3.1l-1.6-1.6l-1.5-1.7h-4.5c-4.3,0-4.5,0-5.9,1.3c-1.5,1.5-1.8,3.8-0.7,6c0.9,1.8,2.5,2.3,6.5,2.3c3.9,0,5.8-0.7,6.8-2.6c0.6-1.2,0.6-0.6,0.8,6.1c0.2,6.1,0.4,7.8,1.2,9.9c1.3,3.3,3.8,7,6.4,9.4l2,2v20.9c0,17,0.1,21.5,0.7,23.9c2.1,8.8,9.5,16.2,18.3,18.2c4.4,1,105.1,1,109.5,0c4.3-1,8.2-3.3,11.6-6.7c3.4-3.4,5.7-7.3,6.7-11.6c1-4.4,1-105.1,0-109.5c-2.1-8.8-9.5-16.2-18.2-18.3c-2.4-0.6-7.3-0.7-27.8-0.7h-24.9l-8.4-8.4c-8.2-8.2-8.4-8.4-8.4-10.3c0-1.1-0.2-2.5-0.6-3.1C155.8,74.2,151.7,73.2,149.5,75z M148.5,86.9c3,2.2,18.3,18,20.5,21.2c6.2,8.8,8.9,19.5,7.7,29.8c-2.5,20.7-18,36.4-38.5,38.8c-5.4,0.6-24.8,0.6-28,0c-4.6-1-8.7-4.2-10.6-8.5c-0.8-1.9-1.1-3.3-1.2-8.1l-0.2-5.8l6.4,6.3c6.1,6,6.5,6.4,8.3,6.4c3.4,0,5.9-3.3,4.7-6.3c-0.3-0.7-6.7-7.6-14.3-15.2l-13.8-13.9v-2.1c0-3.6,2.9-6,6.6-5.5c1.1,0.2,3.1,1.9,8.2,6.8c6.4,6.3,6.9,6.6,8.6,6.6c3.4,0,5.9-3.3,4.7-6.3c-0.3-0.7-3.7-4.6-7.6-8.5c-7.8-7.9-8.4-8.8-6.9-11.9c1.1-2.3,3.5-3.5,5.9-3.1c1.4,0.3,2.7,1.2,6.7,5.1c2.7,2.6,5.4,4.9,6.1,5.1c1.7,0.4,4.3-0.8,5.2-2.5c1.5-2.9,1-4-3.7-8.8c-3.3-3.4-3.4-3.6-3.4-5.7c0-1.8,0.2-2.4,1.6-3.7c1.4-1.4,1.8-1.6,3.9-1.6c2.4,0,2.4,0,6.2,3.6c2.1,2,4.3,3.8,5,4c1.8,0.4,4.4-0.8,5.2-2.5c1.1-2,0.9-3.3-0.6-5.6c-0.7-1.1-1.5-2.6-1.7-3.2c-0.4-1.8,0.8-4.4,2.6-5.5C144.5,85.2,146.4,85.4,148.5,86.9z M224.9,108.8c4.7,1.2,7.7,3.8,10,8.5l1.2,2.5v52.3v52.3l-1.2,2.5c-1.7,3.7-3.7,5.8-7.2,7.5l-3.1,1.5h-52.3h-52.3l-2.5-1.2c-4.7-2.3-7.3-5.2-8.5-10c-0.6-2.1-0.7-6.2-0.7-20.4v-17.7l13.7,0.1c8.8,0.1,15.3,0,18.1-0.4c23.7-3,42.8-21.5,46.3-45c1.5-10.1,0.3-19.8-3.7-29.2c-0.9-2.1-1.6-3.9-1.6-4c0-0.1,9.3-0.1,20.6-0.1C218.4,108.2,222.7,108.3,224.9,108.8z" />
                        <path fill="currentColor" d="M12.4,84.7c-0.8,0.5-1.7,1.5-1.9,2.1c-0.3,0.6-0.5,4-0.5,7.4v6.2l1.6,1.6c2.3,2.3,5.3,2.1,7.3-0.5c0.7-0.8,0.8-2,0.8-7.7c0-6.8,0-6.8-1.2-8.2C16.8,83.7,14.5,83.4,12.4,84.7z" />
                        <path fill="currentColor" d="M11.6,115.3l-1.6,1.6l0.1,7c0.1,6.8,0.1,6.9,1.4,8.2c1,1,1.7,1.3,3.4,1.3c1.8,0,2.3-0.2,3.5-1.5l1.3-1.5v-6.4c0-7-0.4-8.4-2.4-9.5C15.2,113.2,13.4,113.5,11.6,115.3z" />
                        <path fill="currentColor" d="M19,142.2c-1.7,0.6-2.9,2.7-2.9,4.7c0,1.7,0.3,2.2,2.3,4.1c2.9,2.8,8.2,5.4,10.9,5.4c3.7,0,5.8-3.5,4.1-7.1c-0.3-0.8-1.7-1.7-4-2.8c-1.9-0.9-4-2.1-4.7-2.7C22.6,141.9,21,141.4,19,142.2z" />
                        <path fill="currentColor" d="M46.2,148.6c-2.5,2-2.7,5-0.4,7.3l1.6,1.6l7-0.1c6.8-0.1,6.9-0.1,8.2-1.4c1-1,1.3-1.7,1.3-3.4c0-1.8-0.2-2.3-1.5-3.5l-1.5-1.3h-6.8C48.2,147.8,47,147.9,46.2,148.6z" />
                    </svg>Drag components here</div>`;

                    }
                    this.el.classList.add('editor-empty');

                } else {
                    this.renderChildren();
                }
                return this;
            }
        }
    });

    Components.addType("section", {
        extend: "group",
        isComponent: (el) => el.tagName === "SECTION",
        model: {
            defaults: {
                tagName: "section",
                draggable: true,
                droppable: true,
                editable: true,
                components: []
            }
        }
    });
    Components.addType("header", {
        extend: "group",
        isComponent: (el) => el.tagName === "HEADER",
        model: {
            defaults: {
                tagName: "header",
                draggable: true,
                droppable: true,
                editable: true,
                components: [
                    {
                        type: 'heading',
                        tagName: 'h1',
                        components: 'Heading...'
                    }
                ]
            }
        }
    });
    Components.addType("article", {
        extend: "group",
        isComponent: (el) => el.tagName === "ARTICLE",
        model: {
            defaults: {
                tagName: "article",
                draggable: true,
                droppable: true,
                editable: true,
                components: [
                    {
                        type: 'header',
                        components: [
                            {
                                type: 'heading',
                                tagName: 'h2',
                                components: 'Headline'
                            },
                            {
                                tagName: 'p',
                                type: 'paragraph',
                                components: 'Write Article here...'
                            }
                        ]
                    }
                ]
            }
        }
    });

    Components.addType("container", {
        extend: "group",
        isComponent: (el) => {
            return ["container", "container-sm", "container-md", "container-lg", "container-xl", "container-fluid"].includes(el?.classList?.value);
        },

        model: {
            defaults: {
                tagName: 'div',
                rezizeable: true,
                droppable: true,
                editable: true,
                attributes: { class: 'container' },
                components: [],
                traits: [
                    {
                        type: 'select',
                        label: 'Size',
                        name: 'size',
                        options: [
                            { value: '', name: 'base' } as any,
                            { value: 'sm', name: 'Small' } as any,
                            { value: 'md', name: 'Medium' } as any,
                            { value: 'lg', name: 'Large' } as any,
                            { value: 'xl', name: 'Extra Large' } as any,
                            { value: 'fluid', name: 'Fluid' } as any,
                        ],
                        value: ''
                    },
                    "title", "id"
                ],

            },

            init() {
                // Listen to any attribute change
                this.on('change:attributes', this.handleAttrChange);
                setTimeout(() => {
                    const size = this.getClasses().filter((c: string) => c.startsWith('container')).join('').replace('container', '').replace('-', '');
                    this.setAttributes({ size: size, class: ['container', size || ''].filter((v) => v && v !== '').join('-') });
                }, 300)
            },

            handleAttrChange() {
                const attrs: any = this.get('attributes');
                let className = "container";
                if (attrs.size == 'fluid') className = "container-fluid";
                if (attrs.size == 'sm') className = "container-sm";
                if (attrs.size == 'md') className = "container-md";
                if (attrs.size == 'lg') className = "container-lg";
                if (attrs.size == 'xl') className = "container-xl";
                this.setClass(this.getClasses().filter((c: string) => !c.startsWith('container')).concat(className));
            }
        },

    });

    




    BlockManager.add("container", {
        label: "Container",
        category: 'Groups',
        media: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2m2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2 2 0 0 1 1.437-1.437V3.937A2 2 0 0 1 12.063 2.5H3.937A2 2 0 0 1 2.5 3.937M14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2M2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
        </svg>`,
        content: {
            type: "container"
        }
    });

    BlockManager.add('group', {
        label: 'Group',
        category: 'Groups',
        content: {
            type: 'group'
        }
    });

    BlockManager.add('section', {
        label: 'Section',
        category: "Groups",
        content: {
            type: 'section'
        }
    });

    BlockManager.add('header', {
        label: 'Header',
        category: "Groups",
        content: {
            type: 'header'
        }
    });

    BlockManager.add('article', {
        label: 'Article',
        category: "Groups",
        content: {
            type: 'article'
        }
    });

}