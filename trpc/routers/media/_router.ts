import { router } from "@/trpc/trpc";
import { z } from "zod";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createMediaHandler } from "./createMedia.handler";
import { getAllMediaHandler } from "./getAllMedia.handler";


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
        .mutation(({ input }) => createMediaHandler({ ...input })),

    getAllMedia: authedProcedure
        .input(z.object({ projectId: z.string() }))
        .query(({ input }) => getAllMediaHandler({ ...input }))


})