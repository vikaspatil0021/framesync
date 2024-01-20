
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { getProjectById } from "@/lib/prisma/project/service";
import { getTeamById } from "@/lib/prisma/teams/service";

export async function generateMetadata({
   params
}: {
   params: {
      slug: [teamId: string, projectId: string]
   }
}): Promise<Metadata> {
   const team = await getTeamById(params.slug[0] as string);
   const project = await getProjectById(params.slug[1] as string || '');

   return {
      title: `${project?.name || team?.name} | Framesync.in`,
   }
}

export default async function RootLayout({
   children,
}: {
   children: React.ReactNode
}) {
   const session = await getServerSession();

   if (!session) redirect('/auth');

   return (
      <>
         <div>
            {children}
         </div>
      </>
   )
}
