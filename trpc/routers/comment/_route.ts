import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createCommentHandler } from "./createComment.handler";

export const commentRouter = router({
    createComment: authedProcedure
        .input(z.object({ msg: z.string(), mediaId: z.string(), userId: z.string(), timeStamp: z.number().optional() }))
        .mutation(({ input }) => createCommentHandler({ ...input }))
})