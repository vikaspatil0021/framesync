import { z } from "zod";
import { router } from "@/trpc/trpc";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { getRecentsHandler } from "./getRecentsHandler.handler";


export const recentsRouter = router({

    getRecents: authedProcedure
        .query(() => getRecentsHandler()),

})