import prisma from "../client"

type CreateReplyCommentParams = {
    msg: string
    commentId: string
    userId: string
}
export const createReplyComment = async (params: CreateReplyCommentParams) => {
    return await prisma?.replyComment.create({
        data: params
    })
}


export const deleteReplyCommentById = async (id: string) => {
    return await prisma?.replyComment.delete({
        where: {
            id
        }
    })
}

export const updateReplyCommentById = async (id: string, msg: string) => {
    return await prisma?.replyComment.update({
        where: {
            id
        },
        data: {
            msg,
            // date: new Date()
        }
    })
}