import { router } from "./../trpc";

import { inviteRouter } from "./invite/_router";


export const appRouter = router({
    invite: inviteRouter
});


export type AppRouter = typeof appRouter