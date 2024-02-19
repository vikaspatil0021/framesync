import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth";

type Session = {
   user: {
      id: string
   }
}

export const createTRPCContext = async (_opts: FetchCreateContextFnOptions) => {
   const { req } = _opts

   const session = req && (await getServerSession(options));

   return {
      req,
      session
   } as { req: Request, session: Session | null }
}
