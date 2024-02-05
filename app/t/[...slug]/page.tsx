"use client"

import { Button } from "@/components/ui/button";
import { ManageMembersModal } from "@/components/ui/membersModal/membersModal";
import { signOut } from "next-auth/react";

export default function Page({ params }: {
   params: {
      slug: [teamId: string, projectId: string]
   }
}) {

   const teamId = params.slug[0];
   const projectId = params.slug[1];

   const customParams = {
      teamId,
   }
   return (
      <>
         <div>
            <ManageMembersModal params={customParams} />
            <Button onClick={signOut}>Sign out</Button>
         </div>
      </>
   )
}
