import { options } from "@/lib/auth/options";
import { createProject, getProjectsByTeamId } from "@/lib/prisma/project/service";
import { getMembershipByTeamIdUserId } from "@/lib/prisma/teamMembership/service";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


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
      const projects = await getProjectsByTeamId(teamId as string)
      return NextResponse.json({
         projects
      }, { status: 200 });


   } catch (error: any) {
      return NextResponse.json({ error: error.message }, {
         status: 401
      })

   }

}



export const POST = async (req: NextRequest) => {

   const session: Session = await getServerSession(options);

   const { teamId, name } = await req.json();

   if (!session) {
      return NextResponse.json({ error: "User not authenticated." }, {
         status: 401
      })
   }
   const membership = await getMembershipByTeamIdUserId(session.user.id as string, teamId as string);

   if (!membership) {
      return NextResponse.json({ error: "User access not allowed" }, {
         status: 401
      })

   }

   try {
      const project = await createProject(name as string, teamId as string);
      return NextResponse.json({
         project
      }, { status: 200 });

   } catch (error: any) {
      return NextResponse.json({ error: error.message }, {
         status: 401
      })
   }
}
