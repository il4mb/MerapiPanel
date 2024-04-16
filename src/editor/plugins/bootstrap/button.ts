import { AddComponentTypeOptions, Editor } from "grapesjs";

export const Register = (editor: Editor) => {
    const { Components, BlockManager } = editor;

    Components.addType("bs-button", {
        isComponent: (el) => el.tagName === 'BUTTON',
        extend: "text",
        model: {
            defaults: {
                tagName: 'button',
                draggable: true,
                droppable: true,
                editable: true,

                attributes: {
                    class: 'btn btn-primary',
                    type: 'button'
                },

                components: [
                    {
                        type: 'text',
                        components: 'Button'
                    }
                ],
                traits: [
                    {
                        type: 'select',
                        label: 'Type',
                        name: '_type',
                        options: [
                            { value: 'solid', name: 'Solid' } as any,
                            { value: 'outline', name: 'Outline' } as any
                        ],
                        value: 'solid'
                    },
                    {
                        type: 'select',
                        label: 'Size',
                        name: 'size',
                        options: [
                            { value: '', name: 'Base' } as any,
                            { value: 'sm', name: 'Small' } as any,
                            { value: 'lg', name: 'Large' } as any
                        ],
                        value: ''
                    },
                    {
                        type: 'select',
                        label: 'Theme',
                        name: 'theme',
                        options: [
                            { value: 'primary', name: 'Primary' } as any,
                            { value: 'secondary', name: 'Secondary' } as any,
                            { value: 'success', name: 'Success' } as any,
                            { value: 'danger', name: 'Danger' } as any,
                            { value: 'warning', name: 'Warning' } as any,
                            { value: 'info', name: 'Info' } as any,
                            { value: 'light', name: 'Light' } as any,
                            { value: 'dark', name: 'Dark' } as any
                        ],
                        value: 'primary'
                    },
                    "title", "id"
                ],

            },

            init() {

                // Listen to any attribute change
                this.on('change:attributes', this.handleAttrChange);

                setTimeout(() => {

                    let _type = 'solid';
                    if(this.getClasses().includes('btn-outline-')) _type = 'outline';

                    let theme = 'primary';
                    if(this.getClasses().includes('btn-primary')) theme = 'primary';
                    if(this.getClasses().includes('btn-secondary')) theme = 'secondary';
                    if(this.getClasses().includes('btn-success')) theme = 'success';
                    if(this.getClasses().includes('btn-danger')) theme = 'danger';
                    if(this.getClasses().includes('btn-warning')) theme = 'warning';
                    if(this.getClasses().includes('btn-info')) theme = 'info';
                    if(this.getClasses().includes('btn-light')) theme = 'light';
                    if(this.getClasses().includes('btn-dark')) theme = 'dark';

                    let size = '';
                    if(this.getClasses().includes('btn-sm')) size = 'sm';
                    if(this.getClasses().includes('btn-lg')) size = 'lg';

                    this.set({
                        _type,
                        theme,
                        size
                    });

                }, 300);

            },

            handleAttrChange() {

                let className = "btn";
                const attrs: any = this.get('attributes');

                if (attrs.size == 'sm') className += " btn-sm";
                if (attrs.size == 'lg') className += " btn-lg";

                if (attrs._type == 'outline') {
                    className += " btn-outline-" + attrs.theme;
                } else {
                    className += " btn-" + attrs.theme;
                }

                this.setClass(className);
            },

        }
    });

    BlockManager.add('bs-button', {
        label: 'Button',
        category: 'Basic',
        content: {
            type: 'bs-button'
        }
    });
}