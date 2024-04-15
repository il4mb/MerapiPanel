import { Editor, Component } from "grapesjs";

export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    Components.addType('bs-collapse', {
        isComponent: (el) => el?.classList?.contains('collapse'),
        extend: 'group',
        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: true,
                editable: true,
                attributes: {
                    class: 'collapse show',
                    id: Date.now().toString(16)
                },
                components: [{
                    type: 'bs-card',
                }]
            }
        }
    });

    Components.addType('bs-collapse-toggler', {
        extend: 'bs-button',
        isComponent: (el) => el?.attributes?.getNamedItem('data-bs-toggle')?.value === 'collapse',
        model: {
            defaults: {
                tagName: 'button',
                draggable: true,
                droppable: true,
                editable: true,
                findType: 'bs-collapse',
                attributes: {
                    class: 'btn btn-primary',
                    type: 'button',
                    'data-bs-toggle': 'collapse',
                },
                components: 'Collapse',
                traits: [
                    {
                        type: 'select',
                        label: 'data-bs-target',
                        name: 'data-bs-target'
                    },
                    {
                        type: 'text',
                        label: 'aria-expanded',
                        name: 'aria-expanded'
                    },
                    {
                        type: 'text',
                        label: 'aria-controls',
                        name: 'aria-controls'
                    },
                    "title", "id"
                ]
            },
            init() {
                setTimeout(() => {

                    const collapseComponents = this.findCollapse(editor.DomComponents.getComponents())
                    const ids = collapseComponents.map((component: Component) => `#${component.getId()}`);
                    this.traits.at(0).set('options', ids);

                    editor.on('component:mount', () => {
                        const collapseComponents = this.findCollapse(editor.DomComponents.getComponents())
                        const ids = collapseComponents.map((component: Component) => `#${component.getId()}`);
                        this.traits.at(0).set('options', ids);
                    });
                    editor.on('component:remove', () => {
                        const collapseComponents = this.findCollapse(editor.DomComponents.getComponents())
                        const ids = collapseComponents.map((component: Component) => `#${component.getId()}`);
                        this.traits.at(0).set('options', ids);
                    });

                }, 400);
            },

            findCollapse(components: Component[]) {

                let collapseComponents: Component[] = [];

                components.forEach((component) => {
                    // Check if the current component's type is "bs-collapse"
                    if (component.get('type') === this.defaults.findType) {
                        collapseComponents.push(component);
                    }

                    // Recursively search through child components if present
                    const children = component.components() ?? [];

                    if (children.length > 0) {
                        const nestedComponents = this.findCollapse(children);
                        collapseComponents = collapseComponents.concat(nestedComponents);
                    }
                });

                return collapseComponents;
            },
        }
    });



    BlockManager.add('bs-collapse', {
        label: 'Collapse',
        category: 'Collapse',
        content: {
            type: 'bs-collapse',
        }
    });
    BlockManager.add("bs-collapse-toggler", {
        label: "Collapse Toggler",
        category: "Collapse",
        content: {
            type: "bs-collapse-toggler",
        }
    })
}