import { Editor } from "grapesjs";

export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    Components.addType("bs-grid-row", {
        extend: "group",
        isComponent: (el) => el?.classList?.contains('row'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: "div.col",
                editable: true,
                attributes: { class: 'row' },
                components: [],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-grid-col", {
        extend: "group",
        isComponent: (el) => el?.classList?.contains('col'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.row",
                droppable: true,
                editable: true,
                attributes: { class: 'col' },
                components: [],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    BlockManager.add('bs-grid-row', {
        label: 'Grid Row',
        category: "Grids",
        content: {
            type: 'grid-row',
            content: {
                type: 'bs-grid-col'
            }
        }
    });

    BlockManager.add('bs-grid-col', {
        label: 'Grid Column',
        category: "Grids",
        content: {
            type: 'bs-grid-col'
        }
    });

}