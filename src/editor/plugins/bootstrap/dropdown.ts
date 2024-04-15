import { Editor } from "grapesjs";

export const Register = (editor: Editor) => {
    const { Components, BlockManager } = editor;
    Components.addType('bs-dropdown', {
        extend: 'group',
        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: "div.dropdown-menu",
                editable: true,
                attributes: { class: 'dropdown show' },
                components: [{
                    type: 'bs-dropdown-toggle',
                    components: 'Dropdown'
                },
                {
                    type: 'bs-dropdown-menu',
                    components: [
                        {
                            type: 'bs-dropdown-item',
                            attributes: { class: 'dropdown-item' },
                            components: 'Dropdown Item'
                        }
                    ]
                }
                ]
            }
        }
    });
    Components.addType('bs-dropdown-toggle', {
        extend: 'button',
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.dropdown",
                droppable: "div.dropdown-menu",
                editable: false,
                removable: false,

                attributes: {
                    class: 'btn btn-secondary dropdown-toggle',
                    type: "button",
                    "data-bs-toggle": "dropdown"
                },
                components: {
                    type: "text",
                    components: "Dropdown"
                }
            }
        }
    })
    Components.addType('bs-dropdown-menu', {
        extend: 'group',
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.dropdown",
                droppable: "div.dropdown-item",
                editable: false,
                removable: false,
                attributes: { class: 'dropdown-menu' },
                components: [
                    {
                        type: 'dropdown-item',
                        components: 'Dropdown Item'
                    }
                ]
            }
        }
    })
    Components.addType('bs-dropdown-item', {
        extend: 'text',
        model: {
            defaults: {
                tagName: 'div',
                draggable: 'div.dropdown-menu',
                droppable: true,
                editable: true,
                attributes: { class: 'dropdown-item' },
                components: [
                    {
                        type: 'text',
                        components: 'Dropdown Item'
                    }
                ]
            }
        }
    });

    BlockManager.add('bs-dropdown', {
        label: 'Dropdown',
        category: "Dropdowns",
        content: {
            type: 'bs-dropdown'
        }
    });
    
    BlockManager.add('bs-dropdown-item', {
        label: 'Dropdown Item',
        category: "Dropdowns",
        content: {
            type: 'bs-dropdown-item'
        }
    });
}