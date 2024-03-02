import { createProject } from "@/lib/prisma/project/service";
import { getMembershipByTeamIdUserId } from "@/lib/prisma/teamMembership/service";


export const createProjectHandler = async ({
    name,
    teamId,
    userId
}: {
    name: string,
    teamId: string
    userId: string
}) => {


    try {

        const membership = await getMembershipByTeamIdUserId(userId, teamId);

        if (!membership) {
            throw new Error("User access not allowed")
        }

        const project = await createProject(name as string, teamId as string);

        return {
            project
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

