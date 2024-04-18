import $ from 'jquery';


// $(document).on("ajaxSend", function (e) {
//     $('#http-progress').remove();
//     $(document.body).append(proggressbars);
// }).on("ajaxComplete", function (e) {
//     $('#http-progress').remove();
// }).on("ajaxError", function (e) {
//     $('#http-progress').remove();
// });


const createProgressbar = (id: string) => {

    const proggressbars = $(`<div class="progress rounded-0 bg-opacity-75" role="progressbar" id='${id}'>`)
        .append(`<div class='http-progress-download progress-bar bg-primary progress-bar-striped rounded-0 bg-opacity-75 position-absolute h-100' style="width: 0%;z-index: 2;"></div>`)
        .append(`<div class='http-progress-upload progress-bar bg-secondary progress-bar-striped rounded-0 bg-opacity-75 position-absolute h-100' style="width: 0%; z-index: 1;"></div>`)

    proggressbars.css({ position: 'fixed', width: '100%', height: '5px', backgroundColor: '#00000000', boxShadow: '0 1px 2px #00000045', top: 0, zIndex: 999 })

    $(document.body).append(proggressbars);

    return proggressbars;
}


export const CreateXmlHttpRequest = () => {

    const id = Date.now().toString(16);
    createProgressbar("xhr-" + id);

    const xhr = new XMLHttpRequest();
    xhr.addEventListener("progress", function (evt) {

        if (evt.lengthComputable) {
            let complete = (evt.loaded / evt.total * 100 | 0);
            $(`#xhr-${id}`).find('.http-progress-download').css('width', `${complete}%`);

            if (complete == 100) {
                $(`#xhr-${id}`).remove();
            }
        }
        $(`#xhr-${id}`).find('.http-progress-upload').remove();
    });

    xhr.upload.addEventListener("progress", (evt) => {

        if (evt.lengthComputable) {
            let complete = Math.ceil((evt.loaded / evt.total) * 100);
            $(`#xhr-${id}`).find('.http-progress-upload').css('width', `${complete}%`);

            if (complete == 100) {
                $(`#xhr-${id}`).find('.http-progress-upload').remove();
            }
        }
    });

    return xhr;
}



export interface HttpInterface {
    get: (url: string, data: Object | FormData, headers: object) => JQuery.jqXHR<ResponseType | any>;
    post: (url: string, data: Object | FormData, headers: object) => JQuery.jqXHR<ResponseType | any>;
    put: (url: string, data: Object | FormData, headers: object) => JQuery.jqXHR<ResponseType | any>;
    patch: (url: string, data: Object | FormData, headers: object) => JQuery.jqXHR<ResponseType | any>;
    delete: (url: string, data: Object | FormData, headers: object) => JQuery.jqXHR<ResponseType | any>;
}


export interface ResponseType {
    code: number
    message: string
    data: Array<any> | Object
}


export const get = (url: string, data: Object | FormData, headers: object = {}): JQuery.jqXHR<ResponseType | any> => {

    const ObjectURL = new URL(/\:\/\/[^/]+/.test(url) ? url : `${window.location.protocol}//${window.location.hostname}/${url.replace(/^\//, '')}`);

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