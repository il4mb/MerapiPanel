import { Modal, ModalTypeInterface } from "./modal";




export interface DialogInterface {
    confirm: (title: string | JQuery, message: string | JQuery) => Promise<boolean>;
    danger: (title: string | JQuery, message: string | JQuery) => Promise<boolean>;
}


export const confirm = (title: string | JQuery, message: string | JQuery) => {
    const modal: ModalTypeInterface = Modal.create(title, message);
    modal.show();
    return new Promise((resolve, reject) => {
        modal.on("modal:hide", () => {
            reject();
        });

        modal.action.positive = function () {
            resolve(true);
            modal.hide();
        }
    });
}

export const danger = (title: string | JQuery, message: string | JQuery) => {
    const modal = Modal.create(title, message);
    
    modal.show();
    modal.find(".modal-title").addClass("text-danger");


    
    return new Promise((resolve, reject) => {
        modal.on("modal:hide", () => {
            reject();
        });

        modal.action.positive = {
            class: "btn-danger",
            callback: function () {
                resolve(true);
                modal.hide();
            }
        }
    });
}


export const warning = (title: string | JQuery, message: string | JQuery) => {
    const modal = Modal.create(title, message);
    
    modal.show();
    modal.find(".modal-title").addClass("text-warning");


    
    return new Promise((resolve, reject) => {
        modal.on("modal:hide", () => {
            reject();
        });

        modal.action.positive = {
            class: "btn-warning",
            callback: function () {
                resolve(true);
                modal.hide();
            }
        }
    });
}