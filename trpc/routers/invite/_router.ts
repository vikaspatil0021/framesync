import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";


import { getInvitesHandler } from "./getInvites.handler";
import { createInviteHandler } from "./createInvite.handler";
import { deleteInviteHandler } from "./deleteInvite.handler";


export const inviteRouter = router({
    getInvites: authedProcedure
        .input(z.object({ teamId: z.string() }))
        .query(({ input }) => getInvitesHandler(input)),


    createInvite: authedProcedure
        .input(z.object({ teamId: z.string(), email: z.string() }))
        .mutation(({ ctx, input }) => createInviteHandler({ ...input, userId: ctx.session?.user.id as string })),


    deleteInvite: authedProcedure
        .input(z.object({ inviteId: z.string() }))
        .mutation(({ input }) => deleteInviteHandler(input))

})