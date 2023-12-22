"use client"
import { signOut } from "next-auth/react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        All ok
        <Button onClick={() => signOut()}>
          Sign Out
        </Button>
      </main>
    </>
  )
}
