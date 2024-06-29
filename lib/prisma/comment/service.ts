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