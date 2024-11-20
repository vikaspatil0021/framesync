import { z } from "zod";
import { router } from "@/trpc/trpc";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { getRecentsHandler } from "./getRecentsHandler.handler";


export const recentsRouter = router({

    getRecents: authedProcedure
        .input(z.object({ teamId: z.string() }))
        .query(({ input }) => getRecentsHandler({ ...input }))

})