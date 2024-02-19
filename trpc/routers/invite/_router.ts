import { z } from "zod";
import { TRPCError } from "@trpc/server";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";


import { deleteInvite, getInvitesByTeamId } from "@/lib/prisma/invite/service";
import { hasTeamOwnership } from "@/lib/prisma/teams/service";
import { inviteUser } from "@/lib/apiRouteHandlers/inviteMember";


export const inviteRouter = router({
    getInvites: authedProcedure
        .input(z.object({ teamId: z.string() }))
        .query(async ({ input: { teamId } }) => {

            const invites = await getInvitesByTeamId(teamId as string);
            return {
                invites,
            }
        }),


    createInvite: authedProcedure
        .input(z.object({ teamId: z.string(), email: z.string() }))
        .mutation(async ({ ctx, input: { email, teamId } }) => {
            const isUserOwner = await hasTeamOwnership(teamId as string, ctx.session?.user?.id as string);

            if (!isUserOwner) throw new TRPCError({ code: 'FORBIDDEN' });

            const invite = await inviteUser(email as string, teamId as string);

            return {
                invite
            }
        }),


    deleteInvite: authedProcedure
        .input(z.object({ inviteId: z.string() }))
        .mutation(async ({ input }) => {
            const { inviteId } = input;
            if (!inviteId) throw new TRPCError({ code: 'NOT_FOUND', message: 'Missing inviteID' });

            let invite;
            try {

                invite = await deleteInvite(inviteId as string);
            } catch (error) {
                //@ts-expect-error
                throw new TRPCError({ code: 'NOT_FOUND', message: (error?.code == 'P2025') ? "Invite does not exist." : JSON.stringify(error) as string });
            }
            
            return {
                invite
            };
        })

})