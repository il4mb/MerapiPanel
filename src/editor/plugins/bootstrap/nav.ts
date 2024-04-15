import { Editor } from "grapesjs";

export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    Components.addType("bs-nav", {
        extend: "group",
        isComponent: (el) => el?.classList?.contains("nav"),
        model: {
            defaults: {
                tagName: "ul",
                draggable: true,
                droppable: true,
                editable: true,
                attributes: { class: "nav" },
                components: [
                    {
                        type: "bs-nav-item",
                    }
                ],
                traits: [
                    "title",
                    "id"
                ],
            },
        },
    });

    Components.addType("bs-nav-item", {
        extend: "group",
        isComponent: (el) => el?.classList?.contains("nav-item"),
        model: {
            defaults: {
                tagName: "li",
                draggable: ".nav, .navbar-nav",
                droppable: true,
                editable: true,
                attributes: { class: "nav-item" },
                components: {
                    type: "bs-nav-link"
                },
                traits: [
                    "title",
                    "id"
                ],
            },
        },
    });

    Components.addType("bs-nav-link", {
        extend: 'link',
        isComponent: (el) => el?.classList?.contains("nav-link"),
        model: {
            defaults: {
                tagName: "a",
                draggable: ".nav-item",
                droppable: true,
                editable: true,
                type: "link",
                attributes: {
                    href: "#",
                    class: "nav-link"
                },
                components: "Nav Link",
            },
        },
    });


    BlockManager.add("bs-nav", {
        label: "Nav",
        category: "Navs",
        content: {
            type: "bs-nav",
        },
    });
    BlockManager.add("bs-nav-item", {
        label: "Nav Item",
        category: "Navs",
        content: {
            type: "bs-nav-item",
        },
    });
    BlockManager.add("bs-nav-link", {
        label: "Nav Link",
        category: "Navs",
        content: {
            type: "bs-nav-link",
        },
    });

}