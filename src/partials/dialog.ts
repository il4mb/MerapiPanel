import Modal, { ModalTypeInterface } from "./modal";

export const confirm = (title: string | JQuery, message: string | JQuery) => {
    const modal: ModalTypeInterface = Modal.create(title, message);
    modal.show();
    return new Promise(resolve => {
        modal.on("modal:hide", () => {
            resolve(false);
        });

        modal.action.positive = function () {
            resolve(true);
            modal.hide();
        }
    });
}

export const danger = (title: string | JQuery, message: string | JQuery) => {
    const modal = Modal.create(title, message);
    modal.find(".modal-title").addClass("text-danger");
    modal.show();
    return new Promise(resolve => {
        modal.on("modal:hide", () => {
            resolve(false);
        });

        modal.action.positive = function () {
            resolve(true);
            modal.hide();
        }
    });
}