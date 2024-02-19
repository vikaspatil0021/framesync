import { getMembershipsByTeamId } from "@/lib/prisma/teamMembership/service";


export const getMembershipHandler = async ({
    teamId,
    userId
}: {
    teamId: string,
    userId: string
}) => {


    try {
        const memberships = await getMembershipsByTeamId(teamId as string);

        let isTeamMember = false;

        // check if current user belongs to the team
        memberships.forEach(eachMember => {
            if (eachMember.user.id === userId) {
                isTeamMember = true
            }
        })

        if (!isTeamMember) throw new Error("User access not allowed")

        return {
            memberships
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

