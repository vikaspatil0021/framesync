type MediaType = "VideoFile" | "Folder"

import prisma from "../client";


export const createMedia = async (key: string, projectId: string, size: number, type: MediaType, name: string, duration: number) => {
    return await prisma?.media.create({
        data: {
            key,
            projectId,
            size,
            type,
            name,
            duration
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