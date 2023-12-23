import { Metadata } from "next";

import { RightAccountContent } from "@/components/ui/invite/inviteComponents";

export const metadata: Metadata = {
  title: "Invite | Framesync.in",
}


export default function Invite() {
  return (
    <>
      <div>
        <RightAccountContent />
      </div>
    </>
  )
}
