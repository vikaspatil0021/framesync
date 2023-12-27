
import { createInvite, getInviteByTeamIdEmail } from "../invite/service";
import { getMembershipByTeamIdUserId } from "../teamMembership/service";
import { getUserByEmail } from "../user/service";

export const inviteUser = async (email: string, teamId: string) => {
    
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

    const invite = await createInvite(teamId as string, email as string, expiresAt as Date)

    return invite

}