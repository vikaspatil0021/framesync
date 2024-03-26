"use client"
import { useSession } from "next-auth/react"
/* eslint-disable react/no-unescaped-entities */
import {
   Dialog,
   DialogContent,
   DialogDescription,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Users } from "lucide-react"
import { Button } from "../../../../button"
import { ScrollArea } from "../../../../scroll-area"
import InviteInput from "./inviteInput"
import { InvitationTabContent, MembersTabContent } from "./tabsContent"
import { trpc } from "@/trpc/client/trpcClient"
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"
import { useAppSelector } from "@/lib/redux-toolkit/hook"

type Refetch = (options?: RefetchOptions) => Promise<QueryObserverResult<unknown, Error>>

type EachMember = {
   user: {
      name: string,
      email: string,
      id: string,
      picture: string
   },
   id: string,
   role: "OWNER" | "MEMBER"
}
type Session = {
   id: string

} | null
type EachInvite = {
   email: string,
   id: string
}
export const ManageMembersModal = () => {
   const session = useSession();
   const currentUser = session && session.data?.user as Session;

   const { currentTeam } = useAppSelector((state) => state.currentTeam);

   const { data: invitesData, isFetching: invitesDataLoading, refetch: refetchInvites } = trpc.invite.getInvites.useQuery({ teamId: currentTeam.id });
   const { data: membersData, refetch: refetchMembers } = trpc.memberships.getMembership.useQuery({ teamId: currentTeam.id })

   const refetchLatestData = (type: string) => {
      if (type === "invites") {
         refetchInvites()
      } else {
         refetchMembers()
      }
   }

   // check if the current user is the owner
   let isCurrentUserOwner = false;

   membersData?.memberships?.length != 0 && membersData?.memberships.forEach((eachMember: EachMember) => {
      if (currentUser && eachMember.user.id === currentUser?.id) {
         if (eachMember?.role === 'OWNER') {
            isCurrentUserOwner = true
            return;
         }
      }
   })

   return (
      <>
         <Dialog key={"membersModal"}>
            <DialogTrigger asChild>
               <Button className="rounded-md p-2.5 h-9 w-9 bg-[#3c3c3c] hover:bg-[#3f3f3f]">
                  <Users />
               </Button>
            </DialogTrigger>
            <DialogContent className="text-[#f2f2f2]">
               <DialogHeader >
                  <DialogTitle className="text-sm">People</DialogTitle>
                  <DialogDescription className="text-xs">
                     Teammates that have access to this team projects.
                  </DialogDescription>
               </DialogHeader>

               {isCurrentUserOwner &&
                  <InviteInput
                     teamId={currentTeam.id}
                     refetchInvites={refetchInvites as Refetch}
                  />
               }

               <Tabs defaultValue="members">
                  <TabsList>
                     <TabsTrigger value="members" className="h-7 text-xs">Members</TabsTrigger>
                     <TabsTrigger value="invitations" className="h-7 text-xs">Invitations</TabsTrigger>
                  </TabsList>
                  <TabsContent value="members" className="">
                     <ScrollArea className="h-52 w-full pr-3">

                        <MembersTabContent
                           members={membersData?.memberships as EachMember[]}
                           isCurrentUserOwner={isCurrentUserOwner}
                           refetchLatestData={refetchLatestData}
                        />

                     </ScrollArea>
                  </TabsContent>
                  <TabsContent value="invitations">
                     <ScrollArea className="h-52 w-full pr-3">

                        <InvitationTabContent
                           invites={invitesData?.invites as EachInvite[]}
                           invitesDataLoading={invitesDataLoading}
                           isCurrentUserOwner={isCurrentUserOwner}
                           refetchLatestData={refetchLatestData}
                        />

                     </ScrollArea>
                  </TabsContent>
               </Tabs>
            </DialogContent>
         </Dialog>

      </>
   )
}
