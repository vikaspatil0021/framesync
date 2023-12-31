import { options } from "@/lib/auth/options";
import { getMembershipsByTeamId } from "@/lib/prisma/teamMembership/service";
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

        let isTeamMember = false;

        //check if current user belongs to the team
        memberships.forEach(eachMember => {
            if (eachMember.user.id === session.user.id) {
                isTeamMember = true
            }
        })

        if (isTeamMember) {

            return NextResponse.json({
                memberships
            }, { status: 200 });
        }
        throw Error("User access not allowed")

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 401
        })
    }
}