"use client"
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  const fetchdata = async () => {
    await fetch("/api/teams/inviteMember", {
      method: "post",
      body: JSON.stringify({
        "teamId": "9d7f9cc3-d29b-4ac5-bc5c-c40c82dbac50",
        "email": "vikaspatil212222@gmail.com"
      })
    })
  }
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        All ok
        <Button variant='secondary' onClick={fetchdata}>
          Invite
        </Button>
        <Button variant='secondary' onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </>
  )
}
