"use client"

import { Button } from "@/components/ui/button";
import { ManageMembersModal } from "@/components/ui/membersModal/membersModal"
import { signOut } from "next-auth/react";

export default function Page({
   params
}: {
   params: { teamID: string }
}) {
   console.log(1, params);
   const customParams = {
      teamId: params.teamID
   }
   return (
      <>
         <Button onClick={() => signOut()}>Sign out</Button>
         <ManageMembersModal params={customParams} />
      </>
   )
}
