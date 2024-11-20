import { options } from "@/lib/auth/options"
import { getServerSession } from "next-auth"

import prisma from "@/lib/prisma/client"

export const getRecentsHandler = async ({ teamId }: { teamId: string }) => {
    try {
        const session = await getServerSession(options)

        const res = await prisma?.project.findMany({
            where: {
                team: {
                    TeamMembership: {
                        some: {
                            //@ts-expect-error
                            userId: session?.user?.id
                        }
                    }
                },
                Media: {
                    some: {}
                }
            },
            include: {
                Media: {
                    take: 4,
                    orderBy: {
                        uploaded_at: 'desc'
                    }
                },
                team: true
            },
            take: 4,
            orderBy: {
                Media: {
                    _count: "desc",
                }
            }
        })
        
        return res
    } catch (error: any) {
        throw new Error(error?.message)
    }
}