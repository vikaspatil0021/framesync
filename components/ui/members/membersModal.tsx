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


export const ManageMembersModal = () => {
    const [members, setMembers] = useState([])

    const getMembersData = async (teamId: string) => {
        const result = await fetch(`/api/teams/getMembers?teamId=${teamId}`, {
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

        setMembers(data?.memberships);
    }

    useEffect(() => {
        getMembersData("b27eaf14-6a83-4924-9c32-f21b072c3967");
    }, [])

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

                    <InviteInput />

                    <Tabs defaultValue="members">
                        <TabsList>
                            <TabsTrigger value="members">Members</TabsTrigger>
                            <TabsTrigger value="invitations">Invitations</TabsTrigger>
                        </TabsList>
                        <TabsContent value="members" className="">
                            <ScrollArea className="h-52 w-full pr-3">

                                <MembersTabContent members={members} />

                            </ScrollArea>
                        </TabsContent>
                        <TabsContent value="invitations">
                            <ScrollArea className="h-52 w-full pr-3">

                                <InvitationTabContent />

                            </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </DialogContent>
            </Dialog>

        </>
    )
}