import { router } from "./../trpc";

import { inviteRouter } from "./invite/_router";
import { mediaRouter } from "./media/_router";
import { membershipsRouter } from "./memberships/_router";
import { projectRouter } from "./project/_router";
import { teamsRouter } from "./teams/_router";


export const appRouter = router({
    invite: inviteRouter,
    memberships: membershipsRouter,
    teams: teamsRouter,
    project: projectRouter,
    media: mediaRouter

});


export type AppRouter = typeof appRouter