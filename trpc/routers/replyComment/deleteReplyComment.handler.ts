import { deleteReplyCommentById } from "@/lib/prisma/replyComment/service";

type params = {
    id: string
}
export const deleteReplyCommentHandler = async (params: params) => {
    try {
        const data = await deleteReplyCommentById(params?.id);
        return {
            data
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}


