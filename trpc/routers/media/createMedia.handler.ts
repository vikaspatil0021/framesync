type MediaType = "VideoFile" | "Folder"

import { createMedia } from "@/lib/prisma/media/service";

type Session = {
    user: {
       id: string
    }
 }

export const createMediaHandler = async ({
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


        const media = await createMedia(key, projectId, size, type, name, duration, session?.user?.id);

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

