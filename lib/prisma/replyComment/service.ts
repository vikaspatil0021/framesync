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
