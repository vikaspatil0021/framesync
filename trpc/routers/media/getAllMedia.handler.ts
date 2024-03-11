import { getAllMediaByProjectId } from "@/lib/prisma/media/service"


export const getAllMediaHandler = async ({
    projectId,
}: {
    projectId: string
}) => {


    try {
        const allMedia = await getAllMediaByProjectId(projectId as string)

        return {
            allMedia
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

