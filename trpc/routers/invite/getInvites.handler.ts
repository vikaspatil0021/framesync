import { getInvitesByTeamId } from "@/lib/prisma/invite/service";

export const getInvitesHandler = async ({
    teamId
}: {
    teamId: string
}) => {


    try {

        const invites = await getInvitesByTeamId(teamId as string);

        return {
            invites,
        }
    } catch (error: any) {
        throw new Error(error?.message)
    }

}

