
type params = {
    msg: string
    mediaId: string
    timeStamp?: number
    userId: string
}
export const createCommentHandler = async (params: params) => {
    try {
        console.log(params)

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

