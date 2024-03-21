import { Dispatch } from "@reduxjs/toolkit";
import { updateProgress } from "./redux-toolkit/slices/uploadProgress";

export default function checkImageAvailability(imageURL: string, dispatch: Dispatch) {
    const img: HTMLImageElement = new Image();

    img.src = imageURL;
    img.onload = function () {
        console.log('Image is available at the URL:', imageURL);

        dispatch(updateProgress({
            uploadProgress: 0,
            name: '',
            size: 0,
            key: '',
            stage: 'none'
        }))
    };
    img.onerror = function () {
        console.log('Image is not available yet. Retrying in 3 seconds...');
        setTimeout(function () {
            checkImageAvailability(imageURL, dispatch);
        }, 3000); // Retry every 3 seconds
    };
}