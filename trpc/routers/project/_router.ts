import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createProjectHandler } from "./createProject.handler";
import { getProjectsHandler } from "./getProjects.handler";
import { getProjectByIdHandler } from "./getProject.handler";
import { deleteProjectHandler } from "./deleteProject.handler";
import { updateProjectsHandler } from "./updateproject.handler";



export const projectRouter = router({

    getProject: authedProcedure
        .input(z.object({ projectId: z.string() }))
        .query(({ input }) => getProjectByIdHandler({ ...input })),

    getProjects: authedProcedure
        .input(z.object({ teamId: z.string() }))
        .query(({ input }) => getProjectsHandler({ ...input })),

    createProject: authedProcedure
        .input(z.object({ teamId: z.string(), name: z.string() }))
        .mutation(({ ctx, input }) => createProjectHandler({ ...input, userId: ctx.session?.user.id as string })),

    deleteProject: authedProcedure
        .input(z.object({ projectId: z.string() }))
        .mutation(({ input }) => deleteProjectHandler({ ...input })),

    updateProject: authedProcedure
        .input(z.object({ projectName: z.string(), projectId: z.string() }))
        .mutation(({ input }) => updateProjectsHandler({ ...input }))
})