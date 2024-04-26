import { getAllMediaByProjectId } from "@/lib/prisma/media/service"

export const getAllMediaHandler = async ({
    projectId,
    orderBy
}: {
    projectId: string,
    orderBy: Record<string, string>
}) => {


    try {
        const allMedia = await getAllMediaByProjectId(projectId, orderBy);

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

