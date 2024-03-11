type MediaType = "VideoFile" | "Folder"


export const createMedia = async (key: string, projectId: string, size: number, type: MediaType) => {
    return await prisma?.media.create({
        data: {
            key,
            projectId,
            size,
            type
        }
    })
}

export const getAllMediaByProjectId = async (projectId: string) => {
    return await prisma?.media.findMany({
        where: {
            projectId
        }
    })
}