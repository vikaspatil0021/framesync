import { createInvite, getInviteByTeamIdEmail, getInvitesByTeamId } from "@/lib/prisma/invite/service";
import { getMembershipByTeamIdUserId } from "@/lib/prisma/teamMembership/service";
import { hasTeamOwnership } from "@/lib/prisma/teams/service";
import { getUserByEmail } from "@/lib/prisma/user/service";

export const createInviteHandler = async ({
    email,
    teamId,
    userId
}: {
    email: string,
    teamId: string
    userId: string
}) => {

    let invite;

    try {

        const isUserOwner = await hasTeamOwnership(teamId, userId);

        if (!isUserOwner) throw new Error('FORBIDDEN');

        const existingInvite = await getInviteByTeamIdEmail(teamId, email)
        if (existingInvite) {
            throw new Error("Invite already exists.")
        }

        const user = await getUserByEmail(email as string);

        if (user) {
            const membership = await getMembershipByTeamIdUserId(user.id, teamId);

            if (membership) {
                throw new Error("User is already a member of this team.")
            }
        }

        const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days
        const expiresAt = new Date(Date.now() + expiresIn);

        invite = await createInvite(teamId as string, email as string, expiresAt as Date)

    } catch (error: any) {
        throw new Error(error?.message)
    }

    return {
        invite
    }
}

