import { Editor } from "grapesjs";
import $ from "jquery";


export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    // this type is absract for thead, tbody, tfoot.
    Components.addType('bs-table-content', {

        extend: "group",
        model: {
            placeholder() {

                const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                    <h5>Drag and drop columns here</h5>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-row'>Add Row</button>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-row-and-column'>Add Row and Column</button>
                </div>`);
                placeholder.find('button#add-row').on('click', this.addRow.bind(this));
                placeholder.find('button#add-row-and-column').on('click', this.addRowAndColumn.bind(this));
                return placeholder[0];
            },

            addRow() {
                this.components().add({ type: "bs-table-row" });
            },
            addRowAndColumn() {
                this.components().add({ type: "bs-table-row", components: [{ type: "bs-table-cell" }] });
            }
        }
    })

    // this type is main of table
    Components.addType("bs-table", {

        extend: "group",
        isComponent: (el) => {
            return el.tagName === 'TABLE';
        },
        model: {
            defaults: {
                tagName: 'table',
                draggable: true,
                droppable: "tbody, thead, tfoot",
                editable: true,
                attributes: { class: 'table' },
                components: [

                ],
                traits: [
                    "title", "id"
                ],
            },

            placeholder() {

                const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                    <h5>Table Is Empty</h5>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-head'>Add Table Head</button>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-body'>Add Table Body</button>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-foot'>Add Table Foot</button>
                </div>`);

                placeholder.find('button#add-head').on('click', this.addHead.bind(this));
                placeholder.find('button#add-body').on('click', this.addBody.bind(this));
                placeholder.find('button#add-foot').on('click', this.addFoot.bind(this));

                return placeholder[0];
            },
            addHead() {
                this.components().add({ type: "bs-thead", components: [{ type: "bs-table-row" }] });
            },
            addBody() {
                this.components().add({ type: "bs-tbody", components: [{ type: "bs-table-row" }] });
            },
            addFoot() {
                this.components().add({ type: "bs-tfoot", components: [{ type: "bs-table-row" }] });
            }
        }
    });

    Components.addType("bs-thead", {
        extend: "bs-table-content",
        isComponent: (el) => {
            return el.tagName === 'THEAD';
        },
        model: {
            defaults: {
                tagName: 'thead',
                draggable: "table",
                droppable: "tr",
                editable: true,
                components: [
                ],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-tbody", {
        extend: "bs-table-content",
        isComponent: (el) => {
            return el.tagName === 'TBODY';
        },
        model: {
            defaults: {
                tagName: 'tbody',
                draggable: "table",
                droppable: "tr",
                editable: true,
                components: [
                ],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-tfoot", {
        extend: "bs-table-content",
        isComponent: (el) => {
            return el.tagName === 'TFOOT';
        },
        model: {
            defaults: {
                tagName: 'tfoot',
                draggable: "table",
                droppable: "tr",
                editable: true,
                components: [
                ],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-table-row", {
        extend: "group",
        isComponent: (el) => {
            return el.tagName === 'TR';
        },
        model: {
            defaults: {
                tagName: 'tr',
                draggable: "table, tbody, thead, tfoot",
                droppable: "td, th",
                editable: true,
                components: [
                ],
                traits: [
                    "title", "id"
                ],
            },
            placeholder() {

                const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                    <h5>Drag and drop columns here</h5>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-column'>Add Column</button>
                </div>`);
                placeholder.find('button#add-column').on('click', this.addColumn.bind(this));
                return placeholder[0];
            },
            addColumn() {
                this.components().add({ type: "bs-table-cell" });
            }
        }
    });

    Components.addType("bs-table-cell", {
        extend: "group",
        isComponent: (el) => {
            return el.tagName === 'TD' || el.tagName === 'TH';
        },
        model: {
            defaults: {
                tagName: 'td',
                draggable: "tr",
                droppable: true,
                editable: true,
                traits: [
                    {
                        name: 'colspan',
                        type: 'number',
                        value: 1,
                    },
                    {
                        name: 'rowspan',
                        type: 'number',
                        value: 1,
                    },
                    "title", "id"
                ],
            }
        }
    });




    BlockManager.add("bs-table", {
        label: "Table",
        category: "Tables",
        content: {
            type: "bs-table"
        }
    });
    BlockManager.add("table-head", {
        label: "Table Head",
        category: "Tables",
        content: {
            type: "bs-thead"
        }
    });
    BlockManager.add("table-body", {
        label: "Table Body",
        category: "Tables",
        content: {
            type: "bs-tbody"
        }
    });
    BlockManager.add("table-foot", {
        label: "Table Foot",
        category: "Tables",
        content: {
            type: "bs-tfoot"
        }
    });
    BlockManager.add("table-cell", {
        label: "Table Cell",
        category: "Tables",
        content: {
            type: "bs-table-cell"
        }
    });
    BlockManager.add("table-row", {
        label: "Table Row",
        category: "Tables",
        content: {
            type: "bs-table-row"
        }
    });

}