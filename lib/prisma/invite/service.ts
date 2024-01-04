import prisma from "../client";

export const getInvitesByTeamId = async (teamId: string) => {
    return await prisma?.invite.findMany({
        where: {
            teamId
        },
        select: {
            email: true,
            id: true
        }
    })
}


export const getInviteById = async (inviteId: string) => {

    return await prisma?.invite.findFirst({
        where: {
            id: inviteId as string
        }
    });

}


export const getInviteByTeamIdEmail = async (teamId: string, email: string) => {
    return await prisma?.invite.findFirst({
        where: {
            teamId,
            email
        }
    })
}

export const createInvite = async (teamId: string, email: string, expiresAt: Date) => {
    return await prisma?.invite.create({
        data: {
            teamId,
            email,
            expiresAt
        }
    })
}


export const deleteInvite = async (inviteId: string) => {
    return await prisma?.invite.delete({
        where: {
            id: inviteId
        }
    })
}