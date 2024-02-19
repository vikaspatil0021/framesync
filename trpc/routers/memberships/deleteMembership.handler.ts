import { deleteMembershipById } from "@/lib/prisma/teamMembership/service";


export const deleteMembershipHandler = async ({
    membershipId
}: {
    membershipId: string,
}) => {


    try {

        if(!membershipId) throw new Error("Missing membershipId");

        const membership = await deleteMembershipById(membershipId as string);

        return {
            membership
        }
  

    } catch (error: any) {
        const msg = error?.code === 'P2025' && "Invite does not exist."

        throw new Error(msg || error?.message);
    }

 
}

