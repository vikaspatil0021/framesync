import { S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ID || '',
        secretAccessKey: process.env.AWS_KEY || '',
    }
});

export default s3Client;

