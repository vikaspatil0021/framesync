import { router } from "./../trpc";
import { commentRouter } from "./comment/_route";

import { inviteRouter } from "./invite/_router";
import { mediaRouter } from "./media/_router";
import { membershipsRouter } from "./memberships/_router";
import { projectRouter } from "./project/_router";
import { recentsRouter } from "./recents/_router";
import { replyCommentRouter } from "./replyComment/_route";
import { searchRouter } from "./search/router";
import { teamsRouter } from "./teams/_router";


export const appRouter = router({
    invite: inviteRouter,
    memberships: membershipsRouter,
    teams: teamsRouter,
    project: projectRouter,
    media: mediaRouter,
    comment: commentRouter,
    replyComment: replyCommentRouter,
    recents: recentsRouter,
    search: searchRouter

});


export type AppRouter = typeof appRouter