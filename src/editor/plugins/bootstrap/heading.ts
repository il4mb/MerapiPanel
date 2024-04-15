import { AddComponentTypeOptions, Editor } from "grapesjs";



export const Register = (editor: Editor) => {

    const { Components, BlockManager } = editor;

    Components.addType("heading", {
        extend: "text",
        isComponent: (el) => el.tagName === 'H1' || el.tagName === 'H2' || el.tagName === 'H3' || el.tagName === 'H4' || el.tagName === 'H5' || el.tagName === 'H6',
        model: {
            defaults: {
                tagName: 'h1',
                draggable: true,
                droppable: true,
                editable: true,
                components: "Heading...",
                traits: [
                    {
                        type: 'select',
                        label: 'Level',
                        name: 'level',
                        options: [
                            { value: '1', name: 'H1' } as any,
                            { value: '2', name: 'H2' },
                            { value: '3', name: 'H3' },
                            { value: '4', name: 'H4' },
                            { value: '5', name: 'H5' },
                            { value: '6', name: 'H6' },
                        ],
                        value: '1'
                    },
                    "title", "id"
                ]
            },
            init() {
                setTimeout(() => {
                    const initLevenl = this.get("tagName")?.replace('h', '') || 1;
                    this.set("attributes", { level: initLevenl });
                }, 300);
                this.on('change:attributes:level', () => {
                    const level = this.get('attributes')?.level || 1;
                    this.set("tagName", `h${level}`);
                });

            }
        }

    });

    BlockManager.add('heading', {
        label: 'Heading',
        category: 'Basic',
        content: {
            type: 'heading'
        }
    });
}