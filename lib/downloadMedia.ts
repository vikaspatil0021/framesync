import { getPreSignedUrl } from "./aws/s3/preSignedUrl";

export default async function downloadMedia(key: string, mediaName: string) {
  const url = await getPreSignedUrl({
    key
  });

  return new Promise((res, rej) => {
    fetch(url).then(res => res.blob()).then(file => {
      const tempUrl = URL.createObjectURL(file);
      const aTag = document.createElement("a");
      aTag.href = tempUrl;
      aTag.download = mediaName;
      document.body.appendChild(aTag);
      aTag.click();
      URL.revokeObjectURL(tempUrl);
      aTag.remove();
      res(200);
    }).catch(err => {
      rej(err);
    });
  });
}