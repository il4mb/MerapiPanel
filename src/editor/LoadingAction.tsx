import React, { useEffect } from "react";


export const LoadingAction = ({ autohide, show }: { autohide?: number, show: boolean | false|undefined|null}) => {

    const [isShow, setIsShow] = React.useState(show);

    useEffect(() => {
        if (autohide) {
            setTimeout(() => {
                setIsShow(false);
            }, autohide * 1000);
        }

        setIsShow(show);
    }, [show]);
    return (
        <>
            {isShow && <div className="editor-loading-action">
                <div className="text-center" style={{filter: "drop-shadow(0 0 2px #fff)", color: "#45aeff"}}>
                    <i className="fa-solid fa-slash fa-2x fa-spin"></i>
                    <div className="mt-3">Loading...</div>
                </div>
            </div>}
        </>
    );
}