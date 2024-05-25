import { router } from "@/trpc/trpc";
import { z } from "zod";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createMediaHandler } from "./createMedia.handler";
import { getAllMediaHandler } from "./getAllMedia.handler";
import { renameMediaHandler } from "./renameMedia.handler";
import { deleteMediaHandler } from "./deleteMedia.handler";
import { copyMediaHandler } from "./copyMedia.handler";
import { moveMediaHandler } from "./moveMedia.handler";
import { getMediaHandler } from "./getMedia.handler";

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
        .input(z.object({ projectId: z.string(), orderBy: z.record(z.string(), z.string()) }))
        .query(({ input }) => getAllMediaHandler({ ...input })),

    renameMedia: authedProcedure
        .input(z.object({ id: z.string(), name: z.string() }))
        .mutation(({ input }) => renameMediaHandler({ ...input })),

    deleteMedia: authedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => deleteMediaHandler({ ...input })),

    copyMedia: authedProcedure
        .input(z.object({
            key: z.string(),
            projectId: z.string(),
            size: z.number(),
            type: z.enum(["VideoFile", "Folder"]),
            name: z.string(),
            duration: z.number()
        }))
        .mutation(({ input, ctx }) => copyMediaHandler({ ...input, session: ctx.session as Session })),

    moveMedia: authedProcedure
        .input(z.object({
            projectId: z.string(),
            name: z.string(),
            id: z.string()
        }))
        .mutation(({ input, ctx }) => moveMediaHandler({ ...input, session: ctx.session as Session })),

    getMedia: authedProcedure
        .input(z.object({ mediaId: z.string() }))
        .query(({ input }) => getMediaHandler({ ...input }))

})