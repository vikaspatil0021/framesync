import { router } from "./../trpc";

import { inviteRouter } from "./invite/_router";
import { membershipsRouter } from "./memberships/_router";
import { teamsRouter } from "./teams/_router";


export const appRouter = router({
    invite: inviteRouter,
    memberships:membershipsRouter,
    teams:teamsRouter
});


export type AppRouter = typeof appRouter