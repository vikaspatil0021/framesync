import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createProjectHandler } from "./createProject.handler";



export const projectRouter = router({
    createProject: authedProcedure
        .input(z.object({ teamId: z.string(), name: z.string() }))
        .mutation(({ ctx, input }) => createProjectHandler({ ...input, userId: ctx.session?.user.id as string })),
        
})