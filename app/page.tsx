"use client"
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  // const fetchdata = async () => {
  //   await fetch("/api/teams/inviteMember", {
  //     method: "post",
  //     body: JSON.stringify({
  //       "teamId": "8189bcf3-06fe-4f0c-854d-6a7dbeabee81",
  //       "email": "kvianboleto@gmail.com"
  //     })
  //   })
  
  // }
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        All ok
        <Button variant='secondary'>
          Invite
        </Button>
        <Button variant='secondary' onClick={() => signOut()}>
          Sign Out
        </Button>
      </div>
    </>
  )
}
