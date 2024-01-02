import { useEffect, useState } from "react"

/* eslint-disable react/no-unescaped-entities */
import { Users } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InviteInput from "./inviteInput"
import { ScrollArea } from "../scroll-area"
import { InvitationTabContent, MembersTabContent } from "./tabsContent"
import { toast } from "../use-toast"
import { useSession } from "next-auth/react"

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
export const ManageMembersModal = () => {
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
        getMembersInvitationsData("memberships", "b27eaf14-6a83-4924-9c32-f21b072c3967");

        getMembersInvitationsData("invite", "b27eaf14-6a83-4924-9c32-f21b072c3967");

    }, []);

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
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant='secondary' className="rounded-full p-3 h-11 w-11">
                        <Users />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader >
                        <DialogTitle>People</DialogTitle>
                        <DialogDescription >
                            Teammates that have access to this team projects.
                        </DialogDescription>
                    </DialogHeader>

                    {isCurrentUserOwner &&
                        <InviteInput getMembersInvitationsData={getMembersInvitationsData} />
                    }

                    <Tabs defaultValue="members">
                        <TabsList>
                            <TabsTrigger value="members">Members</TabsTrigger>
                            <TabsTrigger value="invitations">Invitations</TabsTrigger>
                        </TabsList>
                        <TabsContent value="members" className="">
                            <ScrollArea className="h-52 w-full pr-3">

                                <MembersTabContent
                                    members={members}
                                    getMembersInvitationsData={getMembersInvitationsData}
                                    isCurrentUserOwner={isCurrentUserOwner}
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
                                />

                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

        </>
    )
}
