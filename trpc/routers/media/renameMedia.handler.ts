import { renameMedia } from "@/lib/prisma/media/service"


export const renameMediaHandler = async ({
    id,
    name
}: {
    id: string,
    name: string
}) => {


    try {
        const media = await renameMedia(id, name);

        return {
            media
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

