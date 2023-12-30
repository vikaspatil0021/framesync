import { options } from "@/lib/auth/options";
import { getServerSession } from "next-auth";
import { NextResponse, type NextRequest } from "next/server";

type Session = {
    user: {
        id: string
    }
} | null

export const GET = async (req: NextRequest) => {
    const session: Session = await getServerSession(options);
    
    if (!session) {
        return NextResponse.json({ error: "User not authenticated." }, {
            status: 401
        })
    }
}