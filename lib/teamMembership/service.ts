export const getMembershipByTeamIdUserId = async (userId: string, teamId: string) => {
    return await prisma?.teamMembership.findFirst({
        where: {
            userId,
            teamId
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