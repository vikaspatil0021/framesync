import { deleteObjectFromS3 } from "@/lib/aws/s3/deleteObjectFromS3";
import { deleteMedia } from "@/lib/prisma/media/service"


export const deleteMediaHandler = async ({
    id,
}: {
    id: string,
}) => {


    try {
        const media = await deleteMedia(id);
        const data = await deleteObjectFromS3(media?.key);
        
        return {
            data
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

