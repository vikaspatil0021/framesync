import { getMembershipByTeamIdUserId } from "../teamMembership/service";
import prisma from "../prisma/client";

export const hasTeamOwnership = async (teamId: string, userId: string) => {
    const membership = await getMembershipByTeamIdUserId(userId, teamId)

    if (membership?.role === "OWNER") return true;

    return false;
}



export const createTeam = async (name: string) => {
    return await prisma?.team.create({
        data: {
            name
        }
    })
}