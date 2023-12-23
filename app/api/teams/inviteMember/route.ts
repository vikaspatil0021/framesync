import { getServerSession } from "next-auth"
import { NextResponse } from "next/server"

import { options } from "@/lib/auth/options"
import { hasTeamOwnership } from "@/lib/teams/service"
import { inviteUser } from "@/lib/teams/inviteMember"


type Session = {
    user: {
        id: string
    }
} | null


export const POST = async (req: NextResponse) => {
    const session: Session = await getServerSession(options);
    const { teamId, email } = await req.json();

    if (!session) {
        return new Response("User not authenticated.", {
            status: 401
        })
    }
    const isUserOwner = await hasTeamOwnership(teamId as string, session?.user?.id);

    if (!isUserOwner) {
        return new Response("User access not allowed.", {
            status: 401
        })
    }
    try {
        const invite = await inviteUser(email as string, teamId as string);
        return NextResponse.json({ invite });
    } catch (error: any) {
        return new Response(error.message, {
            status: 401
        })
    }

}