import { z } from "zod";

import { router } from "@/trpc/trpc";
import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { createReplyCommentHandler } from "./createReplyComment.handler";

export const replyCommentRouter = router({
    createReplyComment: authedProcedure
        .input(z.object({ msg: z.string(), commentId: z.string(), userId: z.string()}))
        .mutation(({ input }) => createReplyCommentHandler({ ...input })),

})