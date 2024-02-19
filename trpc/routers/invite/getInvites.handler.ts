import { getInvitesByTeamId } from "@/lib/prisma/invite/service";

export const getInvitesHandler = async ({
    teamId
}: {
    teamId: string
}) => {

    let invites;

    try {
        
        invites = await getInvitesByTeamId(teamId as string);

    } catch (error) {
        throw new Error("Bad request, Try again.")
    }

    return {
        invites,
    }
}

