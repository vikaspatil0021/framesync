import { renameMedia } from "@/lib/prisma/media/service"


export const renameMediaHandler = async ({
    id,
    name
}: {
    id: string,
    name: string
}) => {


    try {
        const data = await renameMedia(id, name);
        
        return {
            media: data
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

