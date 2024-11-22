import { z } from "zod";
import { router } from "@/trpc/trpc";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { searchHandler } from "./search.handler";


export const searchRouter = router({

    searchQuery: authedProcedure
        .input(z.object({ searchString: z.string() }))
        .query(({ input, ctx }) => searchHandler({ ...input, user_id: ctx.session?.user?.id as string })),
})