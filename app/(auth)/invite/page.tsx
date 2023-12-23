import { Metadata } from "next";

import { ExpiredContent, RightAccountContent, UsedContent, WrongAccountContent } from "@/components/ui/invite/inviteComponents";

export const metadata: Metadata = {
  title: "Invite | Framesync.in",
}


export default function Invite() {
  return (
    <>
        <UsedContent />
    </>
  )
}
