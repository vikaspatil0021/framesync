import { options } from "@/lib/auth/options";
import { getMembershipsByTeamId } from "@/lib/teamMembership/service";
import { getServerSession } from "next-auth";
import { NextResponse, NextRequest } from "next/server";

type Session = {
    user: {
        id: string
    }
} | null

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
        const memberships = await getMembershipsByTeamId(teamId as string);

        return NextResponse.json({
            memberships
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 401
        })
    }
}