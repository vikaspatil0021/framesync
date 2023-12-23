
import { getMembershipByTeamIdUserId } from "../teamMembership/service";

export const inviteUser = async (email: string, teamId: string,) => {
    const existingInvite = await prisma?.invite.findFirst({
        where: {
            teamId,
            email
        }
    })
    if (existingInvite) {
         throw new Error("Invite already exists.")
    }

    const user = await prisma?.user.findFirst({
        where: { email }
    });
    if (user) {
        const membership = await getMembershipByTeamIdUserId(user.id, teamId);
        if (membership) {
            throw new Error("User is already a member of this team.")
        }
    }

    const expiresIn = 7 * 24 * 60 * 60 * 1000; // 7 days
    const expiresAt = new Date(Date.now() + expiresIn);

    const invite = await prisma?.invite.create({
        data: {
            teamId,
            email,
            expiresAt
        }
    })

    return invite

}