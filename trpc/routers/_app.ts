import { router } from "./../trpc";

import { inviteRouter } from "./invite/_router";
import { membershipsRouter } from "./memberships/_router";


export const appRouter = router({
    invite: inviteRouter,
    memberships:membershipsRouter
});


export type AppRouter = typeof appRouter