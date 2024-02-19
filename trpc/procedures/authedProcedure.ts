import { TRPCError } from "@trpc/server";
import { middleware, publicProcedure } from "../trpc";


const isAuthed = middleware(({ ctx, next }) => {

    const { session } = ctx;
    if (!session || !session?.user?.id) throw new TRPCError({ code: 'UNAUTHORIZED' });

    return next({
        ctx
    })
})

export const authedProcedure = publicProcedure.use(isAuthed);