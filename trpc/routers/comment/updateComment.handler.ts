import { updateCommentById } from "@/lib/prisma/comment/service";

type params = {
    id: string,
    msg: string
}
export const updateCommentHandler = async (params: params) => {
    try {
        const data = await updateCommentById(params?.id, params?.msg);
        return {
            data
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

