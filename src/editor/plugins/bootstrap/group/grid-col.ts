import { AddComponentTypeOptions, Editor } from "grapesjs";

export default {

    extend: "group",
    isComponent: (el) =>  el?.classList?.contains('col'),

    model: {
        defaults: {
            tagName: 'div',
            draggable: 'div.row',
            rezizeable: true,
            droppable: true,
            editable: true,
            attributes: { class: 'col col-12' },
            components: [],
            traits: [
                "title", "id"
            ],

        }
    }

} as AddComponentTypeOptions