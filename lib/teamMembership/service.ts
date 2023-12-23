export const getMembershipByTeamIdUserId = (userId:string,teamId:string)=>{
    return prisma?.teamMembership.findFirst({
        where: {
            userId,
            teamId
        }
    });
}