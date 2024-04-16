import $ from "jquery";

export const ObjectToast = () => {
    return {
        create: function (text: string = "", textColor: string = "#0000ff45", seconds: number = 3) {
            let unlimit = false;
            if (seconds == null) {
                seconds = 3;
                unlimit = true;
            }

            if (!this.enable) return;
            this.enable = false;
            setTimeout(() => this.enable = true, 400)

            let max = 5;
            let posY = 100;
            let toast = $(`<toast style='background: white; width: 100%; transition: 0.25s; max-width: 350px; box-shadow: 0 0 4px #00000044; padding: 15px 35px 15px 15px;position: fixed;top: 100vh;right: -3000px;border-radius: 0.3rem;z-index: 900;'>`)
            if (/\-/g.test(textColor)) {
                toast.addClass(textColor);
            } else {
                toast.css("color", textColor);
            }
            let icon = $(`<icon style='display: inline-flex;border: 1px solid;border-radius: 5rem;width: 1.75rem;height: 1.75rem;justify-content: center;align-items: center;transform: rotate(-15deg);margin: 0 10px 0 0;'><i class="fa-solid fa-exclamation"></i></icon>`)
            let message = $(`<message>${text}</message>`)
            let close = $(`<btn type='button' style="position: absolute;top: 0;right: 0;color: #ff000078;padding: 0.5rem;"><i class="fa-solid fa-x"></i></btn>`)
            let progress = $(`<div class="progress" style='position: absolute;overflow:hidden;width: 100%;height: 4px;left: 0;bottom: -1px;'><div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style="width: 100%" aria-valuemax="100"></div></div>`)

            toast.append(icon, message, close, progress)

            let lastToasts = $("toast")
            if (lastToasts.length > max) {
                return;
            }



            for (let i = 0; i < lastToasts.length; i++) {
                let lastToast = lastToasts[i];
                posY += (lastToast.offsetHeight) + 10;
            }
            toast.css("top", posY + "px")


            $(document.body).append(toast)

            let progressbar = progress.find(".progress-bar");
            progressbar.css("transition", `${seconds}s`)
            setTimeout(() => {
                toast.css("right", 25 + "px")
                progressbar.css("width", "0%")
            }, 50)

            let delay = 1000 * seconds;
            if (!unlimit) {
                let timeOut = setTimeout(() => {
                    toast.remove()
                    this.control()
                }, delay)

                close.on("click", () => {
                    toast.remove();
                    clearTimeout(timeOut)
                })
            }

            close.on("click", () => {
                toast.remove();
            })
        },


        enable: true,


        control: function () {
            let lastToasts = $("toast")
            let posY = 100;
            for (let i = 0; i < lastToasts.length; i++) {
                let lastToast = $(lastToasts[i]);
                let Y = Number(lastToast.css("top").replace(/[^0-9]+/gi, ''))
                lastToast.css("top", posY + "px");
                posY = Y
            }
        }
    }
}

export const toast = (text: string, seconds: number = 3, textColor: string = "#0000ff45") => {
    return ObjectToast().create(text, textColor, seconds);
}