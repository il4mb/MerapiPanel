import React from "react";

export const Register = (editor: any, id: string, block: any) => {
    if (editor == null) return;
    editor.BlockManager.add(id, block);
}



export interface BlockProps {
    icon?: string,
    edit?: () => void,
    view?: () => void
}


export const Block = () => {

    return (<></>);
}