import $ from 'jquery';

const proggressbars = $(`<div class='http-progress'><div class='download running-strip'></div><div class='upload running-strip'></div></div>`);
$(document).on("ajaxSend", function (e) {
    $('.http-progress').remove();
    $(document.body).append(proggressbars);
}).on("ajaxComplete", function () {
    $('.http-progress').remove();
});



export const CreateXmlHttpRequest = () => {

    proggressbars.css({ position: 'fixed', width: '100%', height: '5px', 'background-color': '#00000000', 'box-shadow': '0 1px 2px #00000045', top: 0, 'z-index': 999 })
    proggressbars.find('.download').css({ transision: '1s', position: 'absolute', top: 0, width: '0%', height: '100%', 'background-color': '#0091ff', 'z-index': 2 })
    proggressbars.find('.upload').css({ transision: '1s', position: 'absolute', top: 0, width: '5%', height: '100%', 'background-color': '#eaeaea', 'z-index': 1 })

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("progress", function (evt) {
        if (evt.lengthComputable) {
            let complete = (evt.loaded / evt.total * 100 | 0);
            $('.http-progress').find('.download').css('width', `${complete}%`);
        }
    });

    xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
            let complete = Math.ceil((evt.loaded / evt.total) * 100);
            $('.http-progress').find('.upload').css('width', `${complete}%`);
        }
    });
    return xhr;
}



export type ResponseType = {
    code: number
    message: string
    data: Array<any> | Object
}


export const get = (url: string, data: Object | FormData, headers: object = {}): JQuery.jqXHR<ResponseType | any> => {

    const ObjectURL = new URL(url);

    if (data instanceof FormData) {
        for (let _p of data.entries()) {
            const pair = _p as [string, string];
            ObjectURL.searchParams.append(pair[0], pair[1] || '');
        }
    } else if (data) {
        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                ObjectURL.searchParams.append(key, (data as any)[key]);
            }
        }
    }

    return $.ajax({
        xhr: CreateXmlHttpRequest,
        url: ObjectURL.toString(),
        method: 'GET',
        processData: false,
        contentType: false,
        cache: false,
        headers: headers
    } as any);
}



export const post = (url: string, data: Object | FormData, headers: object = {}): JQuery.jqXHR<ResponseType | any> => {
    let form = new FormData();
    if (data instanceof FormData) {
        form = data;
    } else {
        Object.keys(data).forEach(key => {
            form.append(key, (data as any)[key]);
        })
    }
    return $.ajax({
        xhr: CreateXmlHttpRequest,
        url: url,
        method: 'POST',
        data: form,
        processData: false,
        contentType: false,
        headers: headers
    } as any);
}



export const put = (url: string, data: Object | FormData, headers: object = {}): JQuery.jqXHR<ResponseType | any> => {

    let form = new FormData();
    if (data instanceof FormData) {
        form = data;
    } else if (data) {
        Object.keys(data).forEach(key => {
            form.append(key, (data as any)[key]);
        })
    }
    return $.ajax({
        xhr: CreateXmlHttpRequest,
        url: url,
        method: 'PUT',
        data: form,
        processData: false,
        contentType: false,
        headers: Object.assign(headers, { 'X-HTTP-Method-Override': 'PUT' }),
        cache: false
    })
}



export const patch = (url: string, data: Object | FormData, headers: object = {}): JQuery.jqXHR<ResponseType | any> => {
    let form = new FormData();
    if (data instanceof FormData) {
        form = data;
    } else if (data) {
        Object.keys(data).forEach(key => {
            form.append(key, (data as any)[key]);
        })
    }
    return $.ajax({
        xhr: CreateXmlHttpRequest,
        url: url,
        method: 'PATCH',
        data: form,
        processData: false,
        contentType: false,
        headers: Object.assign(headers, { 'X-HTTP-Method-Override': 'PATCH' }),
    })
}



export const del = (url: string, data: Object | FormData, headers: object = {}): JQuery.jqXHR<ResponseType | any> => {
    let form = new FormData();
    if (data instanceof FormData) {
        form = data;
    } else if (data) {
        Object.keys(data).forEach(key => {
            form.append(key, (data as any)[key]);
        })
    }
    return $.ajax({
        xhr: CreateXmlHttpRequest,
        url: url,
        method: 'DELETE',
        data: form,
        processData: false,
        contentType: false,
        headers: Object.assign(headers, { 'X-HTTP-Method-Override': 'DELETE' }),
    })
}