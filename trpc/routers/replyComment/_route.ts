import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createReplyCommentHandler } from "./createReplyComment.handler";
import { deleteReplyCommentHandler } from "./deleteReplyComment.handler";
import { updateReplyCommentHandler } from "./updateComment.handler";

export const replyCommentRouter = router({
    createReplyComment: authedProcedure
        .input(z.object({ msg: z.string(), commentId: z.string(), userId: z.string() }))
        .mutation(({ input }) => createReplyCommentHandler({ ...input })),

    deleteReplyComment: authedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(({ input }) => deleteReplyCommentHandler({ ...input })),

    updateReplyComment: authedProcedure
        .input(z.object({ id: z.string(), msg: z.string() }))
        .mutation(({ input }) => updateReplyCommentHandler({ ...input }))
})