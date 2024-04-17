import { createMedia, deleteMedia } from "@/lib/prisma/media/service"

type MediaType = "VideoFile" | "Folder"

type Session = {
    user: {
        id: string
    }
}

export const moveMediaHandler = async ({
    key,
    projectId,
    type,
    size,
    name,
    duration,
    mediaId,
    session
}: {
    key: string,
    projectId: string
    size: number,
    type: MediaType,
    name: string,
    duration: number,
    mediaId: string,
    session: Session
}) => {


    try {
        const media = await createMedia(key, projectId, size, type, name, duration, session?.user?.id);
        const data = await deleteMedia(mediaId);

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

