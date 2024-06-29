import { createComment } from "@/lib/prisma/comment/service"

type params = {
    msg: string
    mediaId: string
    timeStamp?: number
    userId: string
}
export const createCommentHandler = async (params: params) => {
    try {
        const data = await createComment(params);
        return {
            data
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

