import { getMembershipsByUserId } from "@/lib/prisma/teamMembership/service";


export const getTeamsHandler = async ({
    userId
}: {
    userId: string
}) => {

    try {
        const teams = await getMembershipsByUserId(userId as string); //get teams based on membership

        return {
            teams
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

