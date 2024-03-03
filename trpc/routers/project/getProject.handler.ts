import { getProjectById } from "@/lib/prisma/project/service"

export const getProjectByIdHandler = async ({
    projectId
}: {
    projectId: string
}) => {

    try {
        const project = await getProjectById(projectId)

        return {
            project
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

