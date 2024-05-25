import { getMediaById } from "@/lib/prisma/media/service"

export const getMediaHandler = async ({
    mediaId
}: {
    mediaId: string
}) => {


    try {
        const media = await getMediaById(mediaId);

        return media;

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

