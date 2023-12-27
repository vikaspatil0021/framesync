import { Metadata } from "next";
import { getServerSession } from "next-auth";

import { verifyInviteToken } from "@/lib/jwt";
import { options } from "@/lib/auth/options";

import { ExpiredContent, NoTokenContent, NotLoggedInContent, RightAccountContent, WrongAccountContent } from "@/components/ui/invite/inviteComponents";

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
    const invite = await prisma?.invite.findFirst({
      where: {
        id: inviteId
      }
    });
    
    //@ts-expect-error
    const isInviteExpired = new Date(invite?.expiresAt) < new Date();
    
    if (!invite || isInviteExpired) {
      return <ExpiredContent />
    } else if (!currentUser) {
      return <NotLoggedInContent />
    } else if (currentUser.user?.email !== email) {
      return <WrongAccountContent />
    } else {
      await prisma?.invite.delete({
        where: {
          id: invite.id
        }
      })

      await prisma?.teamMembership.create({
        data: {
          teamId: invite.teamId,
          // @ts-expect-error
          userId: currentUser.user.id,
          role: "MEMBER",
          accepted: true
        }
      })
      return <RightAccountContent />
    }
  } catch (error) {
    console.log(error)
    return <ExpiredContent />
  }
}
