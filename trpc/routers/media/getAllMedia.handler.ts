import { getAllMediaByProjectId } from "@/lib/prisma/media/service"


export const getAllMediaHandler = async ({
    projectId,
}: {
    projectId: string
}) => {


    try {
        const allMedia = await getAllMediaByProjectId(projectId as string)

        allMedia.reverse();
        let totalMediaSize = 0;
        allMedia.map((each) => {
            totalMediaSize += each.size
        })
        return {
            allMedia,
            totalMediaSize,
            totalItems: allMedia.length
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

