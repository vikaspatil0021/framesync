import { initTRPC } from "@trpc/server";
import { type createTRPCContext } from "./createContext";



const t = initTRPC.context<Awaited<ReturnType<typeof createTRPCContext>>>().create();


export const router = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;
