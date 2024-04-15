import { AddComponentTypeOptions, Editor } from "grapesjs";


export default (editor: Editor) => {

    return {
        extend: "group",
        isComponent: (el) => {
            if(!el) return false
            let is = false;
            for (const x in el.classList) {
                if (["container", "container-sm", "container-md", "container-lg", "container-xl"].includes(el.classList[x])) {
                    is = true;
                    break;
                }
            }
            return is;
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
                        label: 'Type',
                        name: 'type',
                        options: [
                            { value: '', name: 'base' } as any,
                            { value: 'fluid', name: 'Fluid' } as any,
                            { value: 'sm', name: 'Small' } as any,
                            { value: 'md', name: 'Medium' } as any,
                            { value: 'lg', name: 'Large' } as any,
                            { value: 'xl', name: 'Extra Large' } as any
                        ],
                        value: ''
                    },
                    "title", "id"
                ],

            },

            init() {
                // Listen to any attribute change
                this.on('change:attributes', this.handleAttrChange);
                this.on("group:empty", (el) => {
                    console.log("container is empty", el);
                })
            },

            handleAttrChange() {
                const attrs: any = this.get('attributes');
                let className = "container";
                if (attrs.type == 'fluid') className = "container-fluid";
                if (attrs.type == 'sm') className = "container-sm";
                if (attrs.type == 'md') className = "container-md";
                if (attrs.type == 'lg') className = "container-lg";
                if (attrs.type == 'xl') className = "container-xl";
                this.setClass(className);
            }
        },

    } as AddComponentTypeOptions
}