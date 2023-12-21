import { type NextAuthOptions } from "next-auth"

import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

import prisma from "../prisma/client";

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
    session:{strategy:"jwt"},
    pages: {
        error: '/auth',
    },
    callbacks: {
        async signIn({ account, user }) {
            const providerType = (account?.provider === 'google' ? "Google" : "Github");
            const existingUser = await prisma.user.findUnique({
                where: {
                    email: user?.email as string
                },
                select: {
                    id: true,
                    email: true,
                    authProvider: true,
                    authProviderId: true
                }
            });

            if (!existingUser) {
                await prisma.user.create({
                    data: {
                        name: user?.name as string,
                        email: user?.email as string,
                        picture: user?.image as string,
                        authProvider: providerType,
                        authProviderId: user?.id as string
                    }
                })
                return true;
            }

            if (providerType !== existingUser?.authProvider && user?.id !== existingUser?.authProviderId) {
                throw new Error(`Your email is registered with ${existingUser?.authProvider} provider!`);
            }
            return true;
        },
        async session({ session, token }) {

            if (session?.user) {
                session = Object.assign({}, session, { user: { ...session?.user, id: token?.sub } })
            }
            return session
        }
    }
}