import { getMembershipByTeamIdUserId } from "../teamMembership/service";

export const hasTeamOwnership = async (teamId: string, userId: string) => {
    const membership = await getMembershipByTeamIdUserId(userId,teamId)

    if (membership?.role === "OWNER") return true;

    return false;
}