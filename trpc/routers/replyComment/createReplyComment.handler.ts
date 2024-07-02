import { createComment } from "@/lib/prisma/comment/service"
import { createReplyComment } from "@/lib/prisma/replyComment/service"

type params = {
    msg: string
    commentId: string
    userId: string
}
export const createReplyCommentHandler = async (params: params) => {
    try {
        const data = await createReplyComment(params);
        return {
            data
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

