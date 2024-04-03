import React, { useEffect } from "react";
import { ContainerProps } from "../../Container";
import { useRoot } from "../../Root";
// import './BlocksContainer.scss';
import { AddComponentTypeOptions} from "grapesjs";


/**
 * Blocks Container
 */
export default (props: ContainerProps) => {



    const { editor, config } = useRoot();

    config.blockManager = {
        appendTo: '.container-blocks',

        blocks: [
            {
                id: 'header',
                label: 'Header',
                
                category: 'Text',
                content: {
                    type: 'header'
                }
            }
        ]
        
    }


    useEffect(() => {

        if (editor === null) return;

        editor.setComponents(editor.getHtml());

    }, [editor]);

    return (
        <div className="merapi__editor-container container-blocks hide" id={props.id}>
            {props.children}
        </div>
    )
}