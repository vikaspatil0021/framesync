import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { verifyInviteToken } from "@/lib/jwt";
import { options } from "@/lib/auth/options";

import { createMembership } from "@/lib/teamMembership/service";
import { deleteInvite, getInviteById } from "@/lib/invite/service";

import { ExpiredContent, NoTokenContent, NotLoggedInContent, RightAccountContent, WrongAccountContent } from "@/components/ui/invite/inviteContentComponents";

export const metadata: Metadata = {
  title: "Invite | Framesync.in",
}


export default async function Invite({
  searchParams
}: {
  searchParams: {
    token: string
  }
}) {
  const currentUser = await getServerSession(options);

  try {
    if (!searchParams.token) return <NoTokenContent /> //if no token available

    const { email, inviteId } = verifyInviteToken(searchParams.token as string);
    
    const invite = await getInviteById(inviteId as string)

    //@ts-expect-error
    const isInviteExpired = new Date(invite?.expiresAt) < new Date();

    if (!invite || isInviteExpired) {
      return <ExpiredContent />
    } else if (!currentUser) {
      return <NotLoggedInContent />
    } else if (currentUser.user?.email !== email) {
      return <WrongAccountContent />
    } else {
      await deleteInvite(invite.id as string)

      //@ts-expect-error
      await createMembership(invite.teamId as string, currentUser.user?.id as string, "MEMBER");

      return <RightAccountContent />
    }
  } catch (error) {
    console.log(error)
    return <ExpiredContent />
  }
}
