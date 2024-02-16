import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
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
import { Button } from "../button"
import { ScrollArea } from "../scroll-area"
import { toast } from "../use-toast"
import InviteInput from "./inviteInput"
import { InvitationTabContent, MembersTabContent } from "./tabsContent"


type EachMember = {
   user: {
      name: string,
      email: string,
      id: string,
      picture: string
   },
   role: "OWNER" | "MEMBER"
}
type Session = {
   id: string

} | null
export const ManageMembersModal = ({ params }: { params: { teamId: string } }) => {
   const session = useSession();
   const currentUser = session && session.data?.user as Session;


   const [members, setMembers] = useState([]);
   const [invites, setInvites] = useState([])
   const [invitesDataLoading, setInvitesDataLoading] = useState(false); //check if invites are being fetched

   const getMembersInvitationsData = async (urlType: string, teamId: string) => {

      if (urlType === "invite") setInvitesDataLoading(true);

      const result = await fetch(`/api/${urlType}?teamId=${teamId}`, {
         method: "GET"
      });

      if (!result.ok) {
         const errorMsg = await result.json();
         toast({
            variant: "destructive",
            title: errorMsg.error,
         });
         return;
      }

      const data = await result.json();
      if (urlType === "memberships") {
         setMembers(data?.memberships);
      } else {
         setInvites(data?.invites.reverse());
         setInvitesDataLoading(false);
      }

   }


   useEffect(() => {
      getMembersInvitationsData("memberships", params.teamId);

      getMembersInvitationsData("invite", params.teamId);

   }, [params.teamId]);

   // check if the current user is the owner
   let isCurrentUserOwner = false;

   members.length != 0 && members.forEach((eachMember: EachMember) => {
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
            <DialogContent>
               <DialogHeader >
                  <DialogTitle className="text-sm">People</DialogTitle>
                  <DialogDescription className="text-xs">
                     Teammates that have access to this team projects.
                  </DialogDescription>
               </DialogHeader>

               {isCurrentUserOwner &&
                  <InviteInput
                     getMembersInvitationsData={getMembersInvitationsData}
                     params={params}
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
                           members={members}
                           getMembersInvitationsData={getMembersInvitationsData}
                           isCurrentUserOwner={isCurrentUserOwner}
                           params={params}

                        />

                     </ScrollArea>
                  </TabsContent>
                  <TabsContent value="invitations">
                     <ScrollArea className="h-52 w-full pr-3">

                        <InvitationTabContent
                           invites={invites}
                           invitesDataLoading={invitesDataLoading}
                           getMembersInvitationsData={getMembersInvitationsData}
                           isCurrentUserOwner={isCurrentUserOwner}
                           params={params}

                        />

                     </ScrollArea>
                  </TabsContent>
               </Tabs>
            </DialogContent>
         </Dialog>

      </>
   )
}
