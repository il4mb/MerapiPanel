import { Editor, Component } from "grapesjs";
import $ from "jquery";


export const Register = (editor: Editor) => {

    const CM = editor.DomComponents;
    const DM = editor.BlockManager;

    const script = function () {

        const $this = $(this);
        const carousel = new window.bootstrap.Carousel($this.get(0));

        carousel.to(0);

        const indicator = $this.find(".carousel-indicators");
        const controlPrev = $this.find(".carousel-control-prev");
        const controlNext = $this.find(".carousel-control-next");

        controlPrev.on("click", () => carousel.prev());
        controlNext.on("click", () => carousel.next());

        indicator.find("[data-bs-slide-to]").on("click", function () {
            carousel.to($(this).data("bs-slide-to"));
        });


    }

    CM.addType("bs-carousel", {

        extend: "group",
        isComponent: (el) => el?.classList?.contains('carousel'),

        model: {
            defaults: {
                script,
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

                const inner = this.components().filter((comp: Component) => comp.get('type') === 'bs-carousel-inner')[0];

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

            init() {

                setTimeout(() => {
                    const scriptFunc = this.model.get('script') as any;
                    if (scriptFunc) {
                        // Execute the script function in the context of the component's element
                        scriptFunc.call(this.el);
                    }
                }, 1000);
            },

            render() {
                const inner = this.model.get('components')?.filter((comp: Component) => comp.getClasses().includes('carousel-inner'))[0];
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
                    style: { height: '400px' },
                },
                components: {
                    type: 'image',
                    attributes: {
                        style: { height: '100%', objectFit: 'cover' },
                        class: "d-block w-100",
                    }
                }
            },

            init() {

                this.listenTo(this, 'remove', () => {
                    const parent = this.parent(); // Get the parent component
                    if (parent) {
                        const carouselItems = parent.components().filter((comp: Component) => comp.getClasses().includes('carousel-item')); // Find all carousel-item components
                        // Remove 'active' class from all carousel-items
                        carouselItems.forEach((item: Component) => {
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
                        style: { objectFit: 'cover', height: '100%' },
                        class: "d-block w-100",
                    }
                })
            },
        },
        view: {
            init() {

                setTimeout(() => {
                    $(this.el).parent().find(".carousel-item").removeClass("active");
                    this.$el.addClass("active");
                }, 200);
            }
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

                typeItem: "bs-carousel-item",
                typeInner: "bs-carousel-inner",
                typeButton: "bs-button",

                attributes: {
                    class: 'carousel-indicators',
                    style: 'height: 20px; width: 100%; display: flex; align-items: end; justify-content: center;',
                },
                components: []
            },

            placeholder() {
                return "";
            },

            syncButtonWithInnerItems(items: JQuery, parentId: string) {

                this.components().remove(this.components().filter(() => true));


                setTimeout(() => {
                    items.each((i, el) => {
                        
                        this.components().add({
                            tagName: 'button',
                            attributes: {
                                class: 'carousel-indicator-btn' + (el.classList.contains('active') ? ' active' : ''),
                                'data-bs-target': `#${parentId}`,
                                'data-bs-slide-to': i,
                                type: 'button',
                            },
                            removable: false,
                            droppable: false,
                            editable: false,
                            moveable: false,
                            copyable: false,
                        })
                    })
                    this.view?.render();
                }, 300)
            },
        },

        view: {
            init() {
                setTimeout(() => {
                    (this.model as any).syncButtonWithInnerItems(this.$el.parent().find(".carousel-inner .carousel-item"), this.$el.parent().attr('id') ?? '');
                }, 400);

                editor.on('component:mount', (component) => {

                    if (component.getClasses().includes('carousel-item')) {
                        (this.model as any).syncButtonWithInnerItems(this.$el.parent().find(".carousel-inner .carousel-item"), this.$el.parent().attr('id') ?? '');
                    }
                });
                editor.on('component:remove', (component) => {

                    if (component.getClasses().includes('carousel-item')) {
                        setTimeout(() => (this.model as any).syncButtonWithInnerItems(this.$el.parent().find(".carousel-inner .carousel-item"), this.$el.parent().attr('id') ?? ''), 300);
                    }
                });

            }
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