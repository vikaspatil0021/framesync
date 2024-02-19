import { z } from "zod"
import { router } from "@/trpc/trpc";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { getMembershipHandler } from "./getMembership.handler";
import { deleteMembershipHandler } from "./deleteMembership.handler";


export const membershipsRouter = router({
    
    getMembership: authedProcedure
        .input(z.object({ teamId: z.string() }))
        .query(({ ctx, input }) => getMembershipHandler({ ...input, userId: ctx.session?.user.id as string })),

    deleteMembership: authedProcedure
        .input(z.object({ membershipId: z.string() }))
        .mutation(({input})=>deleteMembershipHandler(input))

})