import prisma from "../client"

type createCommentParams = {
    msg: string
    mediaId: string
    userId: string
    timeStamp?: number
}

export const createComment = async (params: createCommentParams) => {
    return await prisma?.comment.create({
        data: params
    })
}

export const getAllCommentsByMediaId = async (mediaId: string) => {
    return await prisma?.comment.findMany({
        where: {
            mediaId
        },
        include: {
            user: {
                select: {
                    id: true,
                    picture: true,
                    name: true
                }
            },
            ReplyComment: {
                include: {
                    user: {
                        select: {
                            id: true,
                            picture: true,
                            name: true
                        }
                    }
                },
                orderBy:{
                    date:'asc'
                }
            }

        },
        orderBy: {
            date: "asc"
        }
    })
}

export const deleteCommentById = async (id: string) => {
    return await prisma?.comment.delete({
        where: {
            id
        }
    })
}

export const updateCommentById = async (id: string, msg: string) => {
    return await prisma?.comment.update({
        where: {
            id
        },
        data: {
            msg,
            // date: new Date()
        }
    })
}