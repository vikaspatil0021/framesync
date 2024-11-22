import prisma from "@/lib/prisma/client"


export const searchHandler = async ({ searchString, user_id }: { searchString: string, user_id: string }) => {
    try {

        const projects = await prisma.project.findMany({
            where: {
                name: {
                    contains: searchString,
                    mode: 'insensitive',
                },
                team: {
                    TeamMembership: {
                        some: {
                            userId: user_id
                        }
                    }
                },
            },
            include: {
                team: true,
            },
            take: 3
        });

        const media = await prisma.media.findMany({
            where: {
                name: {
                    contains: searchString,
                    mode: 'insensitive',
                },
                project: {
                    team: {
                        TeamMembership: {
                            some: {
                                userId: user_id
                            }
                        }
                    },
                }
            },
            take: 6
        });

        return {
            projects,
            media,
        };

    } catch (error: any) {
        throw new Error(error?.message)
    }
}