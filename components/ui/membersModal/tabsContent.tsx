import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SearchX, UserMinusIcon, X } from "lucide-react"
import { Button } from "../button"
import { Badge } from "../badge"
import { Skeleton } from "../skeleton"
import { toast } from "../use-toast"
import { CopyIcon } from "@/components/icons/Icons"
import { createInviteToken } from "@/lib/jwt"
import { useEffect, useState } from "react"
import { trpc } from "@/trpc/client/trpcClient"
import { QueryObserverBaseResult, QueryObserverResult, RefetchOptions } from "@tanstack/react-query"

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
type EachInvite = {
   email: string,
   id: string
}

const ProfileCard = ({
   id,
   imageURL,
   name,
   email,
   role,
   isInvitationtab,
   isCurrentUserOwner,
   refetchLatestData
}: {
   id: string,
   imageURL: string,
   name: string,
   email: string,
   role: "OWNER" | "MEMBER",
   isInvitationtab: boolean,
   isCurrentUserOwner: boolean,
   refetchLatestData: (type: string) => void
}) => {
   const [isLoading, setLoading] = useState(false);

   const deleteInvite = trpc.invite.deleteInvite.useMutation()
   const { error: inviteError, isPending: isInvitePending, isSuccess: isInviteDeleted } = deleteInvite;

   useEffect(() => {
      setLoading(isInvitePending);
   }, [isInvitePending]);

   useEffect(() => {

      if (inviteError) {
         toast({
            title: inviteError?.message,
            variant: "destructive"
         })
      }

      if (isInviteDeleted) {
         refetchLatestData("invites");
         toast({
            title: "Invitation revoked successfully",
            variant: 'success'
         });
      }

   }, [isInviteDeleted, inviteError, refetchLatestData])




   const deleteMember = trpc.memberships.deleteMembership.useMutation();
   const { error: memberError, isPending: isMemberPending, isSuccess: isMemberDeleted } = deleteMember;

   useEffect(() => {
      setLoading(isMemberPending);
   }, [isMemberPending]);

   useEffect(() => {
      if (memberError) {
         toast({
            title: memberError?.message,
            variant: "destructive"
         })
      }

      if (isMemberDeleted) {
         refetchLatestData("members");
         toast({
            title: "Member removed successfully",
            variant: 'success'
         })
      }

   }, [isMemberDeleted, memberError, refetchLatestData])

   const copyInviteToken = async (id: string, email: string) => {

      const token = await createInviteToken(email, id);

      const inviteUrl = process.env.NEXT_PUBLIC_WEBAPP_URL + "/invite?token=" + token

      navigator.clipboard.writeText(inviteUrl);

      toast({
         variant: "success",
         title: "Invite copied to clipboard"
      });

   }

   return (
      <>
         <div className="flex items-center justify-between bg-[#151515] p-3  border-[.5px] border-white/10 mt-1 rounded-lg">
            <div className="flex items-center  gap-3">

               <Avatar className="h-7 w-7">
                  <AvatarImage src={imageURL} />
                  <AvatarFallback>CN</AvatarFallback>
               </Avatar>
               <div>
                  <div className="text-xs font-bold flex items-center gap-2">
                     {name}
                     {
                        !isInvitationtab && role === 'OWNER' &&
                        <Badge variant={"custom"} className="h-4 text-[8px]">{role}</Badge>
                     }
                  </div>
                  <div className="text-[11px] text-[#f2f2f2]/70">
                     {email}
                  </div>
               </div>
            </div>
            {
               isCurrentUserOwner &&
               <div className="flex gap-3 items-center">

                  {
                     isInvitationtab ?
                        <div className="cursor-pointer opacity-70 hover:opacity-100" onClick={() => {
                           copyInviteToken(id as string, email as string);
                        }}>
                           <CopyIcon />
                        </div>
                        : null
                  }

                  {
                     role !== "OWNER" &&
                     <Popover>
                        <PopoverTrigger>
                           {
                              isInvitationtab ?
                                 <X className=" h-6 w-6 p-1 text-red-400 hover:text-red-500 cursor-pointer" />
                                 :
                                 <UserMinusIcon className=" h-6 w-6 p-1 text-red-400 hover:text-red-500 cursor-pointer" />
                           }

                        </PopoverTrigger>
                        <PopoverContent className="flex gap-3 items-center">
                           <div className="text-xs text-center text-white/70">
                              {isInvitationtab ? "Revoke invite?" : "Remove member?"}
                           </div>
                           <Button variant='destructive'
                              size='sm'
                              loading={isLoading}
                              onClick={() => {
                                 isInvitationtab ? deleteInvite.mutate({ inviteId: id }) : deleteMember.mutate({ membershipId: id })
                              }}
                           >
                              Confirm
                           </Button>
                        </PopoverContent>
                     </Popover>
                  }
               </div>
            }
         </div>
      </>
   )
}

const ProfileCardSkeleton = () => {
   return (
      <>
         <div className="flex items-center justify-between bg-[#151515] p-3 gap-3 border-[.5px] border-white/10 mt-1 rounded-lg">

            <div>
               <Skeleton className="rounded-full h-7 w-7 bg-[#444]" />
            </div>
            <div className="flex flex-col gap-1 py-1 w-full">
               <Skeleton className="h-3 w-1/4 bg-[#555]" />
               <Skeleton className="h-2 w-1/2 bg-[#444]" />
            </div>

         </div>
      </>
   )
}

export const MembersTabContent = ({
   members,
   isCurrentUserOwner,
   refetchLatestData
}: {
   members: EachMember[],
   isCurrentUserOwner: boolean,
   refetchLatestData: (type: string) => void

}) => {

   return (
      <>
         {
            (members && members?.length !== 0) ?
               members?.map((eachMember: EachMember) => {
                  return (
                     <>
                        <ProfileCard
                           key={"members" + eachMember.user.id}
                           id={eachMember.id}
                           imageURL={eachMember?.user?.picture}
                           name={eachMember.user.name}
                           email={eachMember.user.email}
                           role={eachMember.role}
                           isInvitationtab={false}
                           isCurrentUserOwner={isCurrentUserOwner}
                           refetchLatestData={refetchLatestData}
                        />
                     </>
                  )
               })
               :
               <>
                  <ProfileCardSkeleton />
               </>
         }

      </>
   )
}

export const InvitationTabContent = ({
   invites,
   invitesDataLoading,
   isCurrentUserOwner,
   refetchLatestData
}: {
   invites: EachInvite[],
   invitesDataLoading: boolean,
   isCurrentUserOwner: boolean,
   refetchLatestData: (type: string) => void

}) => {
   return (
      <>
         {
            (invites && invites.length !== 0) ?
               invites?.map((eachInvite: EachInvite) => {
                  return (
                     <>
                        <ProfileCard
                           key={"invite" + eachInvite.id}
                           id={eachInvite.id}
                           imageURL={"https://github.com/shadcn.png"}
                           name={(eachInvite.email).split("@")[0]}
                           role={"MEMBER"}//here role does nothing & need to find a way to remove it 
                           email={eachInvite.email}
                           isInvitationtab={true}
                           isCurrentUserOwner={isCurrentUserOwner}
                           refetchLatestData={refetchLatestData}

                        />
                     </>
                  )
               })
               :
               <>
                  {
                     !invitesDataLoading ?

                        <>
                           <div className="flex flex-col gap-3 justify-center items-center h-52">
                              <div className="rounded-full bg-red-700 p-3">
                                 <SearchX />
                              </div>
                              <div>
                                 No Invitations
                              </div>
                           </div>
                        </>
                        :
                        <>
                           <ProfileCardSkeleton />
                        </>

                  }

               </>
         }
      </>
   )
}
