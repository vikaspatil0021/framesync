"use server"
import prisma from "../client";

export const getMembershipByTeamIdUserId = async (userId: string, teamId: string) => {
    return await prisma?.teamMembership.findFirst({
        where: {
            userId,
            teamId
        }
    });
}

export const getMembershipsByTeamId = async (teamId: string) => {
    return await prisma?.teamMembership.findMany({
        where: {
            teamId
        },
        select: {
            user: {
                select: {
                    name: true,
                    email: true,
                    id: true,
                    picture: true
                }
            },
            id:true,
            role: true,
        }
    });
}

export const getMembershipsByUserId = async (userId: string) => {
    return await prisma?.teamMembership.findMany({
        where: {
            userId
        },
        select: {
            team:{
                select:{
                    id:true,
                    name:true
                }
            },
            id:true,
            role: true,
        }
    });
}

export const createMembership = async (teamId: string, userId: string, role: "MEMBER" | "OWNER") => {
    return await prisma?.teamMembership.create({
        data: {
            teamId,
            userId,
            role,
            accepted: true
        }
    })
}

export const deleteMembershipById = async (membershipId: string) => {
    return await prisma?.teamMembership.delete({
        where:{
            id:membershipId 
        }
    })
}