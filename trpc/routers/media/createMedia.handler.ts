type MediaType = "VideoFile" | "Folder"

import { createMedia } from "@/lib/prisma/media/service";



export const createMediaHandler = async ({
    key,
    projectId,
    type,
    size,
    name,
    duration
}: {
    key: string,
    projectId: string
    size: number,
    type: MediaType,
    name: string,
    duration: number
}) => {


    try {


        const media = await createMedia(key, projectId, size, type, name, duration);

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

