import { Editor } from "grapesjs";

export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;


    Components.addType("bs-navbar", {
        extend: "group",
        isComponent: (el) => el?.classList?.contains('navbar'),
        model: {
            defaults: {
                tagName: "nav",
                draggable: true,
                droppable: true,
                editable: true,
                attributes: { class: "navbar navbar-expand-lg bg-body-tertiary" },
                components: {
                    type: "container",
                    attributes: { class: "container-fluid" },
                    components: [
                        {
                            type: "bs-navbar-brand"
                        },
                        {
                            type: "bs-navbar-toggler",
                        },
                        {
                            type: "bs-navbar-collapse",
                        }
                    ]
                },
                traits: [
                    {
                        name: "expand",
                        type: "select",
                        label: "Expand",
                        options: [
                            { value: '', name: 'None' } as any,
                            { value: 'sm', name: 'Small' } as any,
                            { value: 'md', name: 'Medium' } as any,
                            { value: 'lg', name: 'Large' } as any,
                            { value: 'xl', name: 'Extra Large' } as any
                        ],
                        value: "lg"
                    },
                    "title", "id"
                ],
            },
            init() {
                this.on('change:attributes', this.handleAttrChange);
            },
            handleAttrChange() {

                let className = "navbar-expand-";
                const attrs: any = this.get('attributes');
                if (!attrs.expand || attrs.expand == '') {
                    this.setClass(this.getClasses().filter((c: string) => !c.startsWith('navbar-expand-')));
                    return;
                }
                if (attrs.expand == 'sm') className += "sm";
                if (attrs.expand == 'md') className += "md";
                if (attrs.expand == 'lg') className += "lg";
                if (attrs.expand == 'xl') className += "xl";

                this.setClass(this.getClasses().filter((c: string) => !c.startsWith('navbar-expand-')).concat(className));
            }
        }
    });
    Components.addType("bs-navbar-brand", {
        extend: "group",
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: true,
                editable: true,
                attributes: { class: "navbar-brand" },
                components: {
                    type: "text",
                    components: "Navbar Brand"
                },
                traits: [
                    "title", "id"
                ],
            }
        }
    });
    Components.addType("bs-navbar-toggler", {
        extend: "bs-collapse-toggler",
        isComponent: (el) => el?.classList?.contains('navbar-toggler'),
        model: {
            defaults: {
                tagName: "button",
                draggable: true,
                droppable: true,
                editable: false,
                findType: "bs-navbar-collapse",
                attributes: {
                    class: "navbar-toggler",
                    "data-bs-toggle": "collapse",
                },
                components: {
                    type: "text",
                    tagName: "span",
                    attributes: { class: "navbar-toggler-icon" },
                },
            }
        }
    });
    Components.addType("bs-navbar-collapse", {
        extend: "bs-collapse",
        model: {
            defaults: {
                tagName: "div",
                draggable: true,
                droppable: true,
                editable: true,
                attributes: {
                    class: "collapse navbar-collapse",
                    id: Date.now().toString(16)
                },
                traits: [
                    "title", "id"
                ],
                components: [
                    {
                        type: "bs-navbar-nav",
                    }
                ]
            }
        }
    });
    Components.addType("bs-navbar-nav", {
        extend: "bs-nav",
        isComponent: (el) => el?.classList?.contains('navbar-nav'),
        model: {
            defaults: {
                tagName: "ul",
                draggable: true,
                droppable: "li",
                editable: true,
                attributes: { class: "navbar-nav me-auto mb-2 mb-lg-0" },
                components: [
                    {
                        type: "bs-nav-item",
                        components: {
                            type: "bs-nav-link",
                        }
                    }
                ],
                traits: [
                    "title", "id"
                ],
            }
        }
    });


    BlockManager.add("bs-navbar", {
        label: "Navbar",
        category: "Navbars",
        content: {
            type: "bs-navbar"
        }
    });

    BlockManager.add("bs-navbar-brand", {
        label: "Navbar Brand",
        category: "Navbars",
        content: {
            type: "bs-navbar-brand"
        }
    });

    BlockManager.add("bs-navbar-toggler", {
        label: "Navbar Toggler",
        category: "Navbars",
        content: {
            type: "bs-navbar-toggler"
        }
    });

    BlockManager.add("bs-navbar-collapse", {
        label: "Navbar Collapse",
        category: "Navbars",
        content: {
            type: "bs-navbar-collapse"
        }
    });

    BlockManager.add("bs-navbar-nav", {
        label: "Navbar Nav",
        category: "Navbars",
        content: {
            type: "bs-navbar-nav"
        }
    });

}