import { Dispatch } from "@reduxjs/toolkit";
import { deleteUploadMediaData } from "./redux-toolkit/slices/newUploadsMediaData";


export default function checkImageAvailability(key: string, dispatch: Dispatch) {

    let imageURL = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN + "/" + key + ".jpg";

    const img: HTMLImageElement = new Image();

    img.src = imageURL;
    img.onload = function () {
        console.log('Image is available at the URL:', imageURL);

        dispatch(deleteUploadMediaData({
            key,
        }))
    };
    img.onerror = function () {
        console.log('Image is not available yet. Retrying in 3 seconds...');
        setTimeout(function () {
            checkImageAvailability(key, dispatch);
        }, 3000); // Retry every 3 seconds
    };
}