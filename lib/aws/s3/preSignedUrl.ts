'use server'
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import s3Client from "../client";

export const getPreSignedUrl = async ({
    key,
    contentType
}: {
    key: string,
    contentType?: string
}) => {

    const bucketName = process.env.AWS_BUCKET as string;
    let command =
        (contentType)
            ?
            new PutObjectCommand({
                Bucket: bucketName,
                Key: key,
                ContentType: contentType
            })
            :
            new GetObjectCommand({
                Bucket: bucketName,
                Key: key
            });

    const url = await getSignedUrl(s3Client, command);

    return url;

}
