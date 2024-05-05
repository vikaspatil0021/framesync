import axios from "axios";
import { getPreSignedUrl } from "./aws/s3/preSignedUrl";
import { updateDownloadMediaData } from "./redux-toolkit/slices/downloadMediaSlice";

export default async function downloadMedia(key: string, mediaName: string, dispatch: any) {
  const url = await getPreSignedUrl({
    key
  });
  dispatch(updateDownloadMediaData({
    type: "add"
  }))
  return new Promise((res, rej) => {
    axios.get(url, {
      responseType: 'arraybuffer',
    }).then((res) => res?.data).then(file => {
      const blob = new Blob([file]);
      const tempUrl = URL.createObjectURL(blob);
      const aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = mediaName;
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(tempUrl);
      aTag.remove();

      dispatch(updateDownloadMediaData({
        type: 'remove'
      }))
      res(200);
    }).catch(err => {
      rej(err);
    });
  });
}