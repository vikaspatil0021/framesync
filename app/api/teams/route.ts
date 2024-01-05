import { options } from "@/lib/auth/options";
import { getMembershipsByUserId } from "@/lib/prisma/teamMembership/service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

type Session = {
    user: {
        id: string
    }
} | null

// GET teams by teamId  - GET /api/teams?userId=
export const GET = async (req: NextRequest) => {
    const session: Session = await getServerSession(options);

    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId')

    if (!session) {
        return NextResponse.json({ error: "User not authenticated." }, {
            status: 401
        })
    }
    try {
        const teams = await getMembershipsByUserId(userId as string); //get teams based on membership

        return NextResponse.json({
            teams
        }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, {
            status: 401
        })
    }
}