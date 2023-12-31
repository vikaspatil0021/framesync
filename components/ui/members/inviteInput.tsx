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
                teamId: "b27eaf14-6a83-4924-9c32-f21b072c3967",
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