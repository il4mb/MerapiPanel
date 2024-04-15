import { AddComponentTypeOptions } from "grapesjs";

export default {
    extend: "group",
    isComponent: (el) => el.tagName === 'ARTICLE',
    model: {
        defaults: {
            tagName: 'article',
            draggable: true,
            droppable: true,
            editable: true,
            components: [
                {
                    type: 'text',
                    text: 'Write Article here...'
                }
            ],
            traits: [
                "title", "id"
            ],
        }
    }
} as AddComponentTypeOptions