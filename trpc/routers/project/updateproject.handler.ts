import { updateProject } from "@/lib/prisma/project/service"

export const updateProjectsHandler = async ({
    projectId,
    projectName
}: {
    projectId: string;
    projectName: string;
}) => {


    try {
        const project = await updateProject(projectId, projectName);
        return {
            project
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

