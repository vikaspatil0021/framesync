import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createProjectHandler } from "./createProject.handler";
import { getProjectsHandler } from "./getProjects.handler";



export const projectRouter = router({
    getProjects: authedProcedure
        .input(z.object({ teamId: z.string() }))
        .query(({ input }) => getProjectsHandler({ ...input })),

    createProject: authedProcedure
        .input(z.object({ teamId: z.string(), name: z.string() }))
        .mutation(({ ctx, input }) => createProjectHandler({ ...input, userId: ctx.session?.user.id as string })),

})