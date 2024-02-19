import { deleteInvite } from "@/lib/prisma/invite/service";


export const deleteInviteHandler = async ({
    inviteId
}: {
    inviteId: string,
}) => {


    try {

        if (!inviteId) throw new Error('Missing inviteID');

        const invite = await deleteInvite(inviteId as string);

        return {
            invite
        }

    } catch (error: any) {
        const msg = error?.code === 'P2025' && "Invite does not exist."
        throw new Error(msg || error?.message);
    }

 
}

