"use client"
import { useState } from "react"
import { Button } from "../button"
import { Input } from "../input"
import { toast } from "../use-toast"

export default function InviteInput() {
    const [email, setEmail] = useState('');
    const inviteUser = async () => {
        if (email === '') return;

        if(!email.includes("@")){
            toast({
                variant: "destructive",
                title: "Enter a valid email.",
            });
            return;
        }

        const result = await fetch('/api/teams/inviteMember', {
            method: "POST",
            body: JSON.stringify({
                teamId: "04d916a0-561c-479c-8e6d-1f2992d4bca6",
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