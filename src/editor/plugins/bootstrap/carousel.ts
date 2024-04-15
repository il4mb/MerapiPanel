import { Editor, Component } from "grapesjs";
import $ from "jquery";


export const Register = (editor: Editor) => {

    const CM = editor.Components;
    const DM = editor.BlockManager;

    CM.addType("bs-carousel", {

        extend: "group",
        isComponent: (el) => el?.classList?.contains('carousel'),

        model: {
            defaults: {
                tagName: 'div',
                draggable: true,
                droppable: "div.carousel-inner, div.carousel-indicators, div.carousel-caption, .carousel-control-prev, .carousel-control-next",
                editable: false,
                attributes: {
                    class: 'carousel slide',
                    "id": Date.now().toString(16)
                },
                components: [
                    {
                        type: 'bs-carousel-inner',
                        components: [{
                            type: 'bs-carousel-item'
                        }]
                    },
                    {
                        type: 'bs-carousel-indicators'
                    },
                    {
                        type: 'bs-carousel-control-prev'
                    },
                    {
                        type: 'bs-carousel-control-next'
                    }
                ],
                traits: [
                    {
                        type: 'checkbox',
                        label: 'Touch Swiping',
                        name: 'data-bs-touch',
                        value: true,

                    },
                    {
                        type: 'checkbox',
                        label: 'Autoplay',
                        name: 'data-bs-ride',
                        value: false,

                    },
                    "title", "id"
                ],
            },

            placeholder() {

                const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                    <h5>Carousel</h5>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-item'>Add Item</button>
                </div>`);
                $(placeholder).find('button#add-item').on('click', this.addItem.bind(this));
                return placeholder[0];
            },

            addItem() {

                const inner = this.components().filter(comp => comp.get('type') === 'bs-carousel-inner')[0];

                if (inner) {
                    inner.components().add({
                        type: 'bs-carousel-item'

                    });
                } else {
                    this.components().add({
                        type: 'bs-carousel-inner',
                        components: [{
                            type: 'bs-carousel-item',
                        }]
                    });
                }
            },
        },

        view: {


            render() {
                const inner = this.model.get('components')?.filter((comp: any) => comp.get('type') === 'bs-carousel-inner')[0];
                if (!inner) {
                    this.el.innerHTML = '';
                    this.el.appendChild((this.model as any).placeholder());
                } else {
                    this.renderChildren();
                }
                return this;
            }
        }

    });

    CM.addType('bs-carousel-inner', {
        extend: 'group',
        isComponent: (el) => el?.classList?.contains('carousel-inner'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: false,
                droppable: "div.carousel-item",
                editable: false,
                attributes: {
                    class: 'carousel-inner',
                    style: "height: 300px;"
                },
                components: [],
            },

            placeholder() {

                const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                    <h5>Carousel Inner</h5>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-item'>Add Item</button>
                </div>`);
                $(placeholder).find('button#add-item').on('click', this.addItem.bind(this));
                return placeholder[0];
            },

            addItem() {
                this.components().add({
                    type: 'bs-carousel-item',
                })
            }
        }
    });

    CM.addType('bs-carousel-item', {
        extend: 'group',
        isComponent: (el) => el?.classList?.contains('carousel-item'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.carousel-inner",
                droppable: "div.carousel-caption",
                editable: false,
                movable: false,
                copyable: false,
                attributes: {
                    class: 'carousel-item',
                    style: "height: 100%"
                },
                components: {
                    type: 'image',
                    attributes: {
                        style: "object-fit: cover;",
                        class: "d-block w-100; height: 100%",
                    }
                }
            },

            init() {

                setTimeout(() => {
                    const parent = this.parent(); // Get the parent component
                    if (parent) {
                        const carouselItems = parent.components().filter(comp => comp.get('type') === 'bs-carousel-item'); // Find all carousel-item components

                        // Remove 'active' class from all carousel-items
                        carouselItems.forEach(item => {
                            const classes: any = item.getClasses();
                            const filteredClasses = classes.filter((className: any) => className !== 'active');
                            item.setClass(filteredClasses);
                        });

                        this.setClass(this.getClasses().concat('active'));
                    }
                }, 200);

                this.listenTo(this, 'remove', () => {
                    const parent = this.parent(); // Get the parent component
                    if (parent) {
                        const carouselItems = parent.components().filter(comp => comp.get('type') === 'bs-carousel-item'); // Find all carousel-item components
                        // Remove 'active' class from all carousel-items
                        carouselItems.forEach(item => {
                            const classes: any = item.getClasses();
                            const filteredClasses = classes.filter((className: any) => className !== 'active');
                            item.setClass(filteredClasses);
                        });
                        const lastItem = carouselItems[carouselItems.length - 1];
                        if (lastItem) {
                            lastItem.setClass(lastItem.getClasses().concat('active'));
                        }
                    }
                });
            },

            placeholder() {

                const placeholder = $(`<div class='text-muted py-4 px-3 text-center'>
                    <h5>Carousel Item</h5>
                    <button class='btn btn-sm btn-outline-secondary text-sm rounded-0' id='add-image'>Add Image</button>
                </div>`);
                $(placeholder).find('button#add-image').on('click', this.addImage.bind(this));
                return placeholder[0];
            },

            addImage() {
                this.components().add({
                    type: 'image',
                    attributes: {
                        style: "object-fit: cover; height: 100%;",
                        class: "d-block w-100",
                    }
                })
            },

        }
    });

    CM.addType('bs-carousel-control-prev', {
        extend: 'button',
        isComponent: (el) => el?.classList?.contains('carousel-control-prev'),
        model: {
            defaults: {
                tagName: 'button',
                draggable: "div.carousel",
                droppable: false,
                editable: false,
                moveable: false,
                copyable: false,
                attributes: {
                    class: 'carousel-control-prev',
                    "data-bs-slide": 'prev',
                    "data-bs-target": '',
                    type: 'button',
                },
                components: `<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="visually-hidden">Previous</span>`,
                traits: [{
                    name: 'data-bs-target',
                    type: 'text',
                    value: ''
                }]
            },
            init() {
                setTimeout(() => {
                    const parent = this.parent(); // Get the parent component
                    if (parent) {
                        const id = parent.getId();
                        if (id) {
                            this.traits.where({ name: 'data-bs-target' })[0].setValue(`#${id}`);
                        }
                    }
                }, 400);

            }
        }
    });

    CM.addType('bs-carousel-control-next', {
        extend: 'button',
        isComponent: (el) => el?.classList?.contains('carousel-control-next'),
        model: {
            defaults: {
                tagName: 'button',
                draggable: "div.carousel",
                droppable: false,
                editable: false,
                moveable: false,
                copyable: false,
                attributes: {
                    class: 'carousel-control-next',
                    "data-bs-slide": 'next',
                    "data-bs-target": '',
                    type: 'button',
                },
                components: `<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="visually-hidden">Next</span>`,
                traits: [{
                    name: 'data-bs-target',
                    type: 'text',
                    value: ''
                }]
            },

            init() {
                setTimeout(() => {
                    const parent = this.parent(); // Get the parent component
                    if (parent) {
                        const id = parent.getId();
                        if (id) {
                            this.traits.where({ name: 'data-bs-target' })[0].setValue(`#${id}`);
                        }
                    }
                }, 400);
            }
        },

    });

    CM.addType('bs-carousel-indicators', {

        extend: 'group',

        isComponent: (el) => el?.classList?.contains('carousel-indicators'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.carousel",
                droppable: ".carousel-indicator-btn",
                editable: false,
                moveable: false,
                copyable: false,
                attributes: {
                    class: 'carousel-indicators',
                    style: 'height: 20px; width: 100%; display: flex; align-items: end; justify-content: center;',
                },
                components: []
            },

            init() {

                setTimeout(() => {
                    const parent = this.parent(); // Get the parent component
                    if (parent) {
                        const inner = parent.get('components')?.filter((comp: any) => comp.get('type') === 'bs-carousel-inner')[0];
                        if (inner) {
                            const items = inner.get('components')?.filter((comp: any) => comp.get('type') === 'carousel-item') ?? [];
                            this.syncButtonWithInnerItems(items, parent.getId());
                        }

                        editor.on('component:mount', (component) => {

                            if (component.get('type') === "bs-carousel-item") {
                                const inner = parent.get('components')?.filter((comp: any) => comp.get('type') === 'bs-carousel-inner')[0];
                                if (inner) {
                                    this.syncButtonWithInnerItems(inner.get('components')?.filter((comp: any) => comp.get('type') === 'bs-carousel-item') ?? [], parent.getId());
                                }
                            }
                        });
                        editor.on('component:remove', (component) => {
                            if (component.get('type') === parent.get('type')) {
                                const inner = parent.get('components')?.filter((comp: any) => comp.get('type') === 'bs-carousel-inner')[0];
                                if (inner) {
                                    this.syncButtonWithInnerItems(inner.get('components')?.filter((comp: any) => comp.get('type') === 'bs-carousel-item') ?? [], parent.getId());
                                }
                            }
                        })
                    }
                }, 200);
            },

            placeholder() {
                return "";
            },


            syncButtonWithInnerItems(items: Component[], id: string) {

                this.components().remove(this.components().filter((comp: any) => comp.get('type') === 'bs-button'));

                items.forEach((item, index) => {
                    const isActive = item.getClasses().includes('active');
                    const buttonClass = isActive ? 'active' : '';
                    const ariaLabel = `Slide ${index + 1}`;
                    const dataBsSlideTo = index;

                    this.components().add({
                        tagName: 'button',
                        type: 'bs-button',
                        attributes: {
                            class: buttonClass,
                            'data-bs-target': `#${id}`,
                            'data-bs-slide-to': dataBsSlideTo,
                            'aria-label': ariaLabel
                        }
                    });
                });

                this.view?.render();
            },
        }
    });

    CM.addType('bs-carousel-caption', {
        extend: 'group',
        isComponent: (el) => el?.classList?.contains('carousel-caption'),
        model: {
            defaults: {
                tagName: 'div',
                draggable: "div.carousel-item",
                droppable: true,
                editable: false,
                moveable: false,
                copyable: false,
                attributes: {
                    class: 'carousel-caption',
                    style: 'height: 20px; width: 100%; display: flex; align-items: end; justify-content: center;',
                },
                components: [
                    `<h5>Second slide label</h5>`,
                    `<p>Some representative placeholder content for the second slide.</p>`
                ]
            }
        }
    });




    DM.add("bs-carousel", {
        label: "Carousel",
        category: "Carousel",
        content: {
            type: "bs-carousel",
        }
    });

    DM.add("bs-carousel-indicators", {
        label: "Carousel indicators",
        category: "Carousel",
        content: {
            type: "bs-carousel-indicators",
        }
    });

    DM.add("bs-carousel-control-prev", {
        label: "Carousel Control Prev",
        category: "Carousel",
        content: {
            type: "bs-carousel-control-prev",
        }
    });

    DM.add("bs-carousel-control-next", {
        label: "Carousel Control Next",
        category: "Carousel",
        content: {
            type: "bs-carousel-control-next",
        }
    });

    DM.add("bs-carousel-item", {
        label: "Carousel Item",
        category: "Carousel",
        content: {
            type: "bs-carousel-item",
        }
    });

    DM.add("bs-carousel-caption", {
        label: "Carousel Caption",
        category: "Carousel",
        content: {
            type: "bs-carousel-caption",
        }
    });
}