import { Editor } from "grapesjs";

export const Register = (editor: Editor) => {
    const { Components, BlockManager } = editor;

    Components.addType('bs-list-group', {
        extend: 'group',
        isComponent: (el) => el?.classList?.contains('list-group'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: ".list-group-item",
                editable: true,
                attributes: { class: 'list-group' },
                components: [
                    {
                        type: 'bs-list-group-item',
                    }, {
                        type: 'bs-list-group-item',
                    }
                ],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-list-group-item", {
        extend: "text",
        isComponent: (el) => el?.classList?.contains('list-group-item'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: ".list-group",
                droppable: true,
                editable: true,
                attributes: { class: 'list-group-item' },
                components: {
                    type: 'text',
                    components: 'List Group Item'
                },
                traits: [
                    "title", "id"
                ],
            }
        }
    });




    BlockManager.add('bs-list-group', {
        label: 'List Group',
        category: 'List Groups',
        content: {
            type: 'bs-list-group',
        }
    });
    BlockManager.add('bs-list-group-item', {
        label: 'List Group Item',
        category: 'List Groups',
        content: {
            type: 'bs-list-group-item',
        }
    });
}