import { router } from "@/trpc/trpc";

import { authedProcedure } from "@/trpc/procedures/authedProcedure";
import { getTeamsHandler } from "./getTeams.handler";


export const teamsRouter = router({

    getTeams: authedProcedure
        .query(() => getTeamsHandler())

})