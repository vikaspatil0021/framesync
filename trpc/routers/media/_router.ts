import { router } from "@/trpc/trpc";
import { z } from "zod";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createMediaHandler } from "./createMedia.handler";


export const mediaRouter = router({

    createMedia: authedProcedure
        .input(z.object({
            key: z.string(),
            projectId: z.string(),
            size: z.number(),
            type:  z.enum(["VideoFile", "Folder"])
        }))
        .mutation(({ input }) => createMediaHandler({ ...input })),


})