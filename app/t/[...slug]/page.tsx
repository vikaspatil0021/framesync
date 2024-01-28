"use client"

import { ManageMembersModal } from "@/components/ui/membersModal/membersModal";

export default function Page({ params }: {
   params: {
      slug: [teamId: string, projectId: string]
   }
}) {

   const teamId = params.slug[0];
   const projectId = params.slug[1];
   return (
      <>
         <div>
            <ManageMembersModal params={...{teamId}} />
         </div>
      </>
   )
}
