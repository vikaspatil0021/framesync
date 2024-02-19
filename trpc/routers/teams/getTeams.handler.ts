
import { getMembershipsByUserId } from "@/lib/prisma/teamMembership/service";


export const getTeamsHandler = async ({
    userId
}: {
    userId: string
}) => {

    try {

        const teams = await getMembershipsByUserId(userId as string); //get teams based on membership

        //making sure that owner is the first object
        teams.sort((a,b)=>{
            if(a.role=='OWNER') return -1;
            if(b.role=='OWNER') return 1;
            return 0;
        })

        return {
            teams
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

