import { updateReplyCommentById } from "@/lib/prisma/replyComment/service";

type params = {
    id: string,
    msg: string
}
export const updateReplyCommentHandler = async (params: params) => {
    try {
        const data = await updateReplyCommentById(params?.id, params?.msg);
        return {
            data
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

