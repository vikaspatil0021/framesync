
export const hasTeamOwnership = async (teamId: string, userId: string) => {
    const membership = await prisma?.teamMembership.findFirst({
        where: {
            teamId,
            userId
        },
        select: {
            id: true,
            role: true
        }
    })

    if (membership?.role === "OWNER") return true;

    return false;
}