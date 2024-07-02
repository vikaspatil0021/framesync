import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createCommentHandler } from "./createComment.handler";
import { getAllCommentHandler } from "./getAllComments.handler";
import { deleteCommentHandler } from "./deleteComment.handler";
import { updateCommentHandler } from "./updateComment.handler";

export const commentRouter = router({
    createComment: authedProcedure
        .input(z.object({ msg: z.string(), mediaId: z.string(), userId: z.string(), timeStamp: z.number().optional() }))
        .mutation(({ input }) => createCommentHandler({ ...input })),

    getAllComments: authedProcedure
        .input(z.object({ mediaId: z.string() }))
        .query(({ input }) => getAllCommentHandler({ ...input })),

    deleteComment: authedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => deleteCommentHandler({ ...input })),

    updateComment: authedProcedure
        .input(z.object({ id: z.string(), msg: z.string() }))
        .mutation(({ input }) => updateCommentHandler({ ...input })),
})