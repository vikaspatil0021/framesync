type MediaType = "VideoFile" | "Folder"

import { copyS3Object } from "@/lib/aws/s3/s3Operations";
import { createMedia } from "@/lib/prisma/media/service";

type Session = {
    user: {
        id: string
    }
}

export const copyMediaHandler = async ({
    key,
    projectId,
    type,
    size,
    name,
    duration,
    session
}: {
    key: string,
    projectId: string
    size: number,
    type: MediaType,
    name: string,
    duration: number,
    session: Session
}) => {


    try {

        const newKey = await copyS3Object(key)
        const media = await createMedia(newKey as string, projectId, size, type, name, duration, session?.user?.id);

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

