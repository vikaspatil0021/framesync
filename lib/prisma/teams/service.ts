import prisma from "../client";

import { getMembershipByTeamIdUserId } from "../teamMembership/service";

export const hasTeamOwnership = async (teamId: string, userId: string) => {
    const membership = await getMembershipByTeamIdUserId(userId, teamId)

    if (membership?.role === "OWNER") return true;

    return false;
}

export const getTeamById = async (teamId:string)=>{
    return await prisma?.team.findFirst({
        where:{
            id:teamId
        },
        select:{
            id:true,
            name:true
        }
    })
}

export const createTeam = async (name: string) => {
    return await prisma?.team.create({
        data: {
            name
        }
    })
}