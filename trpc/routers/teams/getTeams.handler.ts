
import { options } from "@/lib/auth/options";
import { getMembershipsByUserId } from "@/lib/prisma/teamMembership/service";
import { getServerSession } from "next-auth";


export const getTeamsHandler = async () => {

    try {
        const session = await getServerSession(options)
        //@ts-expect-error
        const teams = await getMembershipsByUserId(session?.user?.id); //get teams based on membership

        //making sure that owner is the first object
        teams.sort((a,b)=>{
            if(a.role=='OWNER') return -1;
            if(b.role=='OWNER') return 1;
            return 0;
        });

        return {
            teams
        }

    } catch (error: any) {
        throw new Error(error?.message)
    }

}

