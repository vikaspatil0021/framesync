import { type NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const options: NextAuthOptions = {
    secret: process.env.AUTH_SECRET,
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
    callbacks: {
        async session({ session, token }) {

            if (session?.user) {
                session = Object.assign({}, session, { user:{...session?.user,id:token?.sub}})
            }
            return session
        }
    }
}