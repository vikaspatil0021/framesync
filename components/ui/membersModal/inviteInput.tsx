"use client"
import {  useState } from "react"

import { Button } from "../button"
import { Input } from "../input"
import { toast } from "../use-toast"


export default function InviteInput({
    getMembersInvitationsData,
    params
}: {
    getMembersInvitationsData: (urlType: string, teamId: string) => Promise<void>,
    params:{teamId:string}
}) {

    const [email, setEmail] = useState('');
    
    const inviteUser = async () => {
        if (email === '') return;

        if (!email.includes("@")) {
            toast({
                variant: "destructive",
                title: "Enter a valid email.",
            });
            return;
        }

        const result = await fetch('/api/invite', {
            method: "POST",
            body: JSON.stringify({
                teamId: params.teamId,
                email
            })
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
            title: "Invite Sent Successfully"
        });

        getMembersInvitationsData("invite",params.teamId); //update the invites
        setEmail('');
    }


    return (
        <>
            <div className="flex w-full items-center space-x-2 gap-2">
                <Input type="email" placeholder="Email"
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    value={email}
                    tabIndex={-1}
                />
                <Button
                    variant='secondary'
                    onClick={inviteUser}
                    disabled={email === '' ? true : false}
                >Invite</Button>
            </div>
        </>
    )
}