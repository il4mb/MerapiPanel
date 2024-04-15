import { Editor } from "grapesjs";

export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    Components.addType('bs-card', {
        extend: 'group',

        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: "div.card-body, div.card-header, div.card-footer, .card-img-top",
                editable: true,
                attributes: { class: 'card' },
                components: [
                    {
                        type: 'bs-card-header',
                        components: [
                            {
                                type: 'heading',
                                tagName: 'h4',
                                components: 'Card Header'
                            }
                        ]
                    },
                    {
                        type: 'bs-card-body',
                        components: [
                            {
                                type: 'text',
                                components: [
                                    "<h5 class=\"card-title\">Special title treatment</h5>",
                                    "<p class=\"card-text\">With supporting text below as a natural lead-in to additional content.</p>",
                                    "<a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>"
                                ]
                            }
                        ]
                    }
                ],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-card-header", {
        extend: "group",
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.card",
                droppable: true,
                editable: true,
                attributes: { class: 'card-header' },
                components: [],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    Components.addType("bs-card-body", {
        extend: "group",
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.card",
                droppable: true,
                editable: true,
                attributes: { class: 'card-body' },
                components: [],
                traits: [
                    "title", "id"
                ],
            }
        }
    });
    Components.addType("bs-card-image", {
        extend: "image",
        model: {
            defaults: {
                tagName: 'img',
                draggable: "div.card",
                droppable: true,
                editable: true,
                resizeable: true,
                attributes: { class: 'card-img-top' },
                components: [],
                traits: [
                    "title", "id"
                ],
            }
        }
    });

    BlockManager.add('bs-card', {
        label: 'Card',
        category: 'Cards',
        content: {
            type: 'bs-card'
        }
    });

    BlockManager.add('bs-card-header', {
        label: 'Card Header',
        category: 'Cards',
        content: {
            type: 'bs-card-header'
        }
    });

    BlockManager.add('bs-card-body', {
        label: 'Card Body',
        category: 'Cards',
        content: {
            type: 'bs-card-body'
        }
    });

    BlockManager.add('bs-card-image', {
        label: 'Card Image',
        category: 'Cards',
        content: {
            type: 'bs-card-image'
        }
    });
}