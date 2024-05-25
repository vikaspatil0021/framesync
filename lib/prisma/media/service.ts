type MediaType = "VideoFile" | "Folder"

import prisma from "../client";


export const createMedia = async (key: string, projectId: string, size: number, type: MediaType, name: string, duration: number, uploaderId: string) => {
    return await prisma?.media.create({
        data: {
            key,
            projectId,
            size,
            type,
            name,
            duration,
            uploaderId
        }
    })
}

export const getAllMediaByProjectId = async (projectId: string, orderBy: Record<string, string>) => {
    return await prisma?.media.findMany({
        where: {
            projectId
        },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                }
            }
        },
        orderBy: {
            ...orderBy
        }
    })
}

export const renameMedia = async (id: string, name: string) => {
    return await prisma?.media.update({
        where: {
            id
        },
        data: {
            name
        }
    })
}


export const deleteMedia = async (id: string) => {
    return await prisma?.media.delete({
        where: {
            id
        }
    })
}

export const deleteManyMedia = async (projectId: string) => {
    return await prisma.media.deleteMany({
        where: {
            projectId
        }
    })
}

export const updateMedia = async (id: string, projectId: string, name: string, uploaderId: string) => {
    return await prisma?.media.update({
        where: {
            id
        },
        data: {
            projectId,
            name,
            uploaderId,
            uploaded_at: new Date()
        }
    })
}

export const getMediaById = async (id: string) => {
    return await prisma?.media?.findFirst({
        where: {
            id
        },
        select: {
            id: true,
            name: true,
            key:true,
            projectId:true
        }
    })
}