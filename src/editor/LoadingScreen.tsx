import React, { useEffect } from "react";
import $ from "jquery";


export const LoadingScreen = ({ width, error }: { width: number, error?: boolean }) => {


    useEffect(() => {
        if (width === 100) {
            $(".editor-loading-screen").fadeOut({ done: () => $(".editor-loading-screen").remove() });
        }
    }, [width]);

    useEffect(() => {
        if (error) {
            const errorScreen = $(`<div style="width: 100%; max-width: 400px;" class="alert alert-danger text-center" role="alert">Something went wrong,<br/><button class="btn btn-sm btn-outline-secondary text-sm px-4 mt-3 rounded-5" id="reload">Reload</button></div>`);
            errorScreen.find('button#reload').on('click', () => {
                location.reload();
            })
            $(".editor-loading-screen").html("").append(errorScreen);
        }
    }, [error]);


    return (
        <div className="editor-loading-screen">
            <div className="progress">
                <div className="progress-bar bg-dark progress-bar-striped progress-bar-animated" style={{ width: `${width}%` }}></div>
            </div>
        </div>
    );
}