import { deleteInvite } from "@/lib/prisma/invite/service";


export const deleteInviteHandler = async ({
    inviteId
}: {
    inviteId: string,
}) => {

    let invite;

    try {

        if (!inviteId) throw new Error('Missing inviteID');

        invite = await deleteInvite(inviteId as string);

    } catch (error: any) {
        const msg = error?.code === 'P2025' && "Invite does not exist."
        throw new Error(msg || error?.message);
    }

    return {
        invite
    }
}

