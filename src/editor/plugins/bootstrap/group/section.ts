import { AddComponentTypeOptions } from "grapesjs";

export default {
    extend: "group",
    isComponent: (el) => el.tagName === 'SECTION',
    model: {
        defaults: {
            tagName: 'section',
            draggable: true,
            droppable: true,
            editable: true,
            attributes: { class: 'section' },
            components: [],
            traits: [
                "title", "id"
            ],
        }
    }
} as AddComponentTypeOptions