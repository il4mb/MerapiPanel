import { AddComponentTypeOptions, Editor } from "grapesjs";
import $ from "jquery";

export default {
    extend: "group",
    isComponent: (el) => el?.classList?.contains('row'),

    model: {
        defaults: {
            tagName: 'div',
            rezizeable: true,
            droppable: "div.col",
            editable: true,
            attributes: { class: 'row' },
            components: [],
            traits: [
                "title", "id"
            ],
        },

        placeholder() {

            const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                <h5>Drag and drop columns here</h5>
                <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-column11'>Add Column 1:1</button>
                <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-column12'>Add Column 1:2</button>
            </div>`);

            $(placeholder).find('button#add-column11').on('click', this.addColumn11.bind(this));
            $(placeholder).find('button#add-column12').on('click', this.addColumn12.bind(this));
            return placeholder[0];
        },

        addColumn11() {
            this.components().add([
                {
                    type: 'grid-col',
                    attributes: { class: 'col col-6' },
                },
                {
                    type: 'grid-col',
                    attributes: { class: 'col col-6' },
                }
            ]);
        },

        addColumn12() {
            this.components().add([
                {
                    type: 'grid-col',
                    attributes: { class: 'col col-8' },
                },
                {
                    type: 'grid-col',
                    attributes: { class: 'col col-4' },
                }
            ]);
        }
    }

} as AddComponentTypeOptions
