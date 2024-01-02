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
    getMembersInvitationsData,
    isCurrentUserOwner
}: {
    id: string,
    imageURL: string,
    name: string,
    email: string,
    role: "OWNER" | "MEMBER",
    isInvitationtab: boolean,
    getMembersInvitationsData: (urlType: string, teamId: string) => Promise<void>,
    isCurrentUserOwner: boolean

}) => {
    //here id is the membership ID
    const removeMemberHandler = async (id: string) => {
        const result = await fetch(`/api/memberships?membershipId=${id}`, {
            method: "DELETE"
        });

        if (!result.ok) {
            const errorMsg = await result.json();
            toast({
                variant: "destructive",
                title: errorMsg.error,
            });
            return;
        }

        toast({
            variant: "success",
            title: "Member removed successfully"
        });

        getMembersInvitationsData("memberships", "b27eaf14-6a83-4924-9c32-f21b072c3967");

    }

    //here id is the inviteId
    const revokeInviteHandler = async (id: string) => {
        const result = await fetch(`/api/invite?inviteId=${id}`, {
            method: "DELETE"
        });

        if (!result.ok) {
            const errorMsg = await result.json();
            toast({
                variant: "destructive",
                title: errorMsg.error,
            });
            return;
        }

        toast({
            variant: "success",
            title: "Invitation revoked successfully"
        });

        getMembersInvitationsData("invite", "b27eaf14-6a83-4924-9c32-f21b072c3967");

    }

    //here id is the inviteId
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

                    <Avatar>
                        <AvatarImage src={imageURL} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="text-sm font-bold flex items-center gap-2">
                            {name}
                            {
                                !isInvitationtab && role === 'OWNER' &&
                                <Badge variant={"custom"}>{role}</Badge>
                            }
                        </div>
                        <div className="text-xs text-[#f2f2f2]/70">
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
                                    <div className="text-sm text-center text-white/70">
                                        {isInvitationtab ? "Revoke invite?" : "Remove member?"}
                                    </div>
                                    <Button variant='destructive'
                                        onClick={() => {
                                            isInvitationtab ? revokeInviteHandler(id as string) : removeMemberHandler(id as string)
                                        }}>
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
                    <Skeleton className="rounded-full h-9 w-9 bg-[#444]" />
                </div>
                <div className="flex flex-col gap-2 py-1 w-full">
                    <Skeleton className="h-3 w-1/4 bg-[#555]" />
                    <Skeleton className="h-2 w-1/2 bg-[#444]" />
                </div>

            </div>
        </>
    )
}

export const MembersTabContent = ({
    members,
    getMembersInvitationsData,
    isCurrentUserOwner
}: {
    members: EachMember[],
    getMembersInvitationsData: (urlType: string, teamId: string) => Promise<void>,
    isCurrentUserOwner: boolean
}) => {

    return (
        <>
            {
                (members.length !== 0) ?
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
                                    getMembersInvitationsData={getMembersInvitationsData}
                                    isCurrentUserOwner={isCurrentUserOwner}
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
    getMembersInvitationsData,
    isCurrentUserOwner
}: {
    invites: EachInvite[],
    invitesDataLoading: boolean,
    getMembersInvitationsData: (urlType: string, teamId: string) => Promise<void>,
    isCurrentUserOwner: boolean
}) => {
    return (
        <>
            {
                (invites.length !== 0) ?
                    invites?.map((eachInvite: EachInvite) => {
                        return (
                            <>
                                <ProfileCard
                                    key={"invite" + eachInvite.id}
                                    id={eachInvite.id}
                                    imageURL={"https://github.com/shadcn.png"}
                                    name={(eachInvite.email).split("@")[0]}
                                    role={"MEMBER"}
                                    email={eachInvite.email}
                                    isInvitationtab={true}
                                    getMembersInvitationsData={getMembersInvitationsData}
                                    isCurrentUserOwner={isCurrentUserOwner}
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