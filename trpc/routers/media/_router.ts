import { router } from "@/trpc/trpc";
import { z } from "zod";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createMediaHandler } from "./createMedia.handler";
import { getAllMediaHandler } from "./getAllMedia.handler";

type Session = {
    user: {
       id: string
    }
 }


export const mediaRouter = router({

    createMedia: authedProcedure
        .input(z.object({
            key: z.string(),
            projectId: z.string(),
            size: z.number(),
            type: z.enum(["VideoFile", "Folder"]),
            name: z.string(),
            duration: z.number()
        }))
        .mutation(({ input, ctx }) => createMediaHandler({ ...input, session: ctx.session as Session })),

    getAllMedia: authedProcedure
        .input(z.object({ projectId: z.string() }))
        .query(({ input }) => getAllMediaHandler({ ...input }))


})