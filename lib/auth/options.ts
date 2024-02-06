import { type NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import { createMembership } from "../prisma/teamMembership/service";
import { createUser, getUserByEmail } from "../prisma/user/service";
import { createTeam } from "../prisma/teams/service";

export const options: NextAuthOptions = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_CLIENT_ID as string,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      }),
      GithubProvider({
         clientId: process.env.GITHUB_CLIENT_ID as string,
         clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
      })
   ],
   session: { strategy: "jwt" },
   pages: {
      signIn: '/auth',
      error: '/auth',
   },
   callbacks: {
      async jwt({ token }) {
         const existingUser = await getUserByEmail(token?.email as string);

         if (!existingUser) {
            return token
         }

         return {
            ...token,
            id: existingUser.id,
         }
      },
      async signIn({ account, user }) {
         const providerType = (account?.provider === 'google' ? "Google" : "Github");

         let existingUser;


         existingUser = await getUserByEmail(user?.email as string);

         if (!existingUser) {

            const data = {
               name: user?.name as string,
               email: user?.email as string,
               picture: user?.image as string,
               authProvider: providerType as "Google" | "Github",
               authProviderId: user?.id as string
            }


            const newUser = await createUser(data)

            const teamName = newUser ? ((newUser.name).split(' ')[0]).toUpperCase() + "'s Team" : ''

            const newTeam = await createTeam(teamName)

            await createMembership(newTeam?.id as string, newUser?.id as string, "OWNER");
            return true;
         }

         if (providerType !== existingUser?.authProvider && user?.id !== existingUser?.authProviderId) {
            throw new Error(`Your email is registered with ${existingUser?.authProvider} provider!`);
         }
         return true;
      },
      async redirect({ baseUrl }) {
         return baseUrl;
      },
      async session({ session, token }) {
         // @ts-expect-error
         session.user.id = token?.id;

         return session
      }
   }
}
