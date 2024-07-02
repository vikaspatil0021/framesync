import { getAllCommentsByMediaId } from "@/lib/prisma/comment/service"


export const getAllCommentHandler = async (params: { mediaId: string }) => {
    try {
        const allComments = await getAllCommentsByMediaId(params?.mediaId);
        return allComments;
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

