type MediaType = "VideoFile" | "Folder"

import { createMedia } from "@/lib/prisma/media/service";



export const createMediaHandler = async ({
    key,
    projectId,
    type,
    size
}: {
    key: string,
    projectId: string
    size: number,
    type: MediaType
}) => {


    try {


        const media = await createMedia(key, projectId, size, type);

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

