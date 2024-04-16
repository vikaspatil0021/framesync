"use server"
import s3Client from "./client";

import { DeleteObjectCommand } from "@aws-sdk/client-s3";

export const deleteObjectFromS3 = async (key: string) => {
    const uploadBucketName = process.env.AWS_UPLOAD_BUCKET as string;
    const thumbnailsBucketName = process.env.AWS_THUMBNAILS_BUCKET as string;


    let command1 = new DeleteObjectCommand({
        Bucket: uploadBucketName,
        Key: key,
    });

    let command2 = new DeleteObjectCommand({
        Bucket: thumbnailsBucketName,
        Key: key + '.jpg'
    })

    
    try {
        const data1 = await s3Client.send(command1);
        const data2 = await s3Client.send(command2);

        return {
            data1,
            data2
        };

    } catch (err) {
        console.log("Error", err);
        return err;
    }
}
