import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

import { options } from "@/lib/auth/options";
import { deleteInvite, getInvitesByTeamId } from "@/lib/prisma/invite/service";
import { hasTeamOwnership } from "@/lib/prisma/teams/service";
import { inviteUser } from "@/lib/apiRouteHandlers/inviteMember";

type Session = {
    user: {
        id: string
    }
} | null

// GET invitations by teamId GET /api/invite?teamId
export const GET = async (req: NextRequest) => {
    const session: Session = await getServerSession(options);

    const searchParams = req.nextUrl.searchParams;
    const teamId = searchParams.get('teamId')

    if (!session) {
        return NextResponse.json({ error: "User not authenticated." }, {
            status: 401
        })
    }
    try {
        const invites = await getInvitesByTeamId(teamId as string);

        return NextResponse.json({
            invites
        }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 401
        })
    }
}

// invite user by teamId and email - POST /api/invite
export const POST = async (req: NextRequest) => {
    const session: Session = await getServerSession(options);
    const { teamId, email } = await req.json();

    if (!session) {
        return NextResponse.json({ error: "User not authenticated." }, {
            status: 401
        })
    }
    const isUserOwner = await hasTeamOwnership(teamId as string, session?.user?.id);

    if (!isUserOwner) {
        return NextResponse.json({ error: "User access not allowed." }, {
            status: 401
        })
    }
    try {
        const invite = await inviteUser(email as string, teamId as string);
        return NextResponse.json({ invite });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 401
        })
    }

}

export const DELETE = async (req: NextRequest) => {
    const session: Session = await getServerSession(options);

    const searchParams = req.nextUrl.searchParams;
    const inviteId = searchParams.get('inviteId')

    if (!session) {
        return NextResponse.json({ error: "User not authenticated." }, {
            status: 401
        })
    }

    if (!inviteId) {
        return NextResponse.json("Missing inviteID", {
            status: 400,
        });
    }

    try {
        const invite = await deleteInvite(inviteId as string);
        return NextResponse.json({ invite });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 401
        })
    }
}