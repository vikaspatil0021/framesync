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
    session: { strategy: "jwt" },
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
                const newUser = await prisma.user.create({
                    data: {
                        name: user?.name as string,
                        email: user?.email as string,
                        picture: user?.image as string,
                        authProvider: providerType,
                        authProviderId: user?.id as string
                    }
                });

                const newTeam = await prisma.team.create({
                    data: {
                        name: ((newUser.name).split(' ')[0]).toUpperCase() + "'s Team" as string
                    }
                })

                await prisma.teamMembership.create({
                    data:{
                        teamId:newTeam.id as string,
                        userId:newUser.id as string,
                        role:"OWNER",
                        accepted: true
                    }
                });
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

            if (session?.user) {
                session = Object.assign({}, session, { user: { ...session?.user, id: token?.sub } });
            }
            return session
        }
    }
}