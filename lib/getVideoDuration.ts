interface EventObject extends GlobalEventHandlers {
    duration: number
}

export default async function getVideoDuration(file: any) {

    return new Promise((resolve, reject) => {


        var vid = document.createElement('video');

        var fileURL = URL.createObjectURL(file);
        vid.src = fileURL;

        // let duration;

        vid.ondurationchange = function () {
            const { duration } = this as EventObject;
            // duration = this?.duration;

            if (duration) {
                resolve(parseFloat(duration.toFixed(2)));
            }
        };

    });

}