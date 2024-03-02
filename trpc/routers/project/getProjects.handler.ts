import { getProjectsByTeamId } from "@/lib/prisma/project/service"


export const getProjectsHandler = async ({
    teamId,
}: {
    teamId: string
}) => {


    try {
        const projects = await getProjectsByTeamId(teamId as string)

        return {
            projects
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

