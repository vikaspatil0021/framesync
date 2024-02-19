import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { createTRPCContext } from '@/trpc/createContext';
import { appRouter } from '@/trpc/routers/_app';

const handler = (req: Request) => {
    return fetchRequestHandler({
        endpoint: "/api/trpc",
        req,
        router: appRouter,
        createContext: createTRPCContext
    })
}


export { handler as GET, handler as POST };