import { createMedia, deleteMedia, updateMedia } from "@/lib/prisma/media/service"

type MediaType = "VideoFile" | "Folder"

type Session = {
    user: {
        id: string
    }
}

export const moveMediaHandler = async ({
    projectId,
    name,
    id,
    session
}: {
    projectId: string
    name: string,
    id: string,
    session: Session
}) => {


    try {
        const media = await updateMedia(id, projectId, name, session?.user?.id)

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

