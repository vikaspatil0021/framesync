import { deleteObjectsFromS3 } from "@/lib/aws/s3/s3Operations"
import { deleteManyMedia, getAllMediaByProjectId } from "@/lib/prisma/media/service"
import { deleteProjectById } from "@/lib/prisma/project/service"

export const deleteProjectHandler = async ({
    projectId
}: {
    projectId: string
}) => {

    try {
        //get project keys
        const media = await getAllMediaByProjectId(projectId, { 'uploaded_at': 'asc' })
        const keys = media.map((each) => {
            return { Key: each?.key }
        })
        // delete media from s3 and DB
        const data1 = await deleteObjectsFromS3(keys)
        const data2 = await deleteManyMedia(projectId);
        // delete the project
        const project = await deleteProjectById(projectId);
        
        return {
            data1,
            data2,
            project
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

