"use client"
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";

import { GoogleIcon } from "@/components/icons/Icons"
import { GitHubLogoIcon } from "@radix-ui/react-icons"




export default function Login() {
  const session = useSession();

  if (session?.status === 'authenticated') redirect('/');

  return (
    <div className="text-center w-full max-w-md min-w-fit mb-10">
      <div className="font-semibold text-4xl py-2">
        Framesync.in
      </div>
      <div className="text-sm pt-2">
        Authenticate with
      </div>
      <div className="flex flex-col w-full gap-3 px-8 py-2">

        {
          (session.status === 'loading') ? <>
            <Skeleton className="h-10 w-full bg-zinc-700" />
            <Skeleton className="h-10 w-full bg-zinc-700" />
          </> : <>
            <Button variant="secondary" size='lg' className="gap-1" onClick={() => signIn('google')}>
              <GoogleIcon />
              Continue with Google
            </Button>
            <Button variant="secondary" size='lg' className="gap-1" onClick={() => signIn('github')}>
              <GitHubLogoIcon />
              Continue with Github
            </Button>
          </>
        }
      </div>

    </div>

  )
}
