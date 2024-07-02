import { deleteCommentById } from "@/lib/prisma/comment/service";

type params = {
    id: string
}
export const deleteCommentHandler = async (params: params) => {
    try {
        const data = await deleteCommentById(params?.id);
        return {
            data
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

