"use client"
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button"

import { GoogleIcon } from "@/components/icons/Icons"
import { GitHubLogoIcon } from "@radix-ui/react-icons"


// export const metadata: Metadata = {
//   title: 'Auth',
// }

export default function Login() {
  return (
    <div className="text-center w-full max-w-md min-w-fit mb-10">
      <div className="font-semibold text-4xl py-2">
        Framesync.in
      </div>
      <div className="text-sm pt-2">
        Authenticate with
      </div>
      <div className="flex flex-col w-full gap-3 px-8 py-2">

        <Button variant="secondary" size='lg' className="gap-1" onClick={()=>signIn('google')} >
          <GoogleIcon />
          Continue with Google
        </Button>
        <Button variant="secondary" size='lg' className="gap-1" onClick={()=>signIn('github')}>
          <GitHubLogoIcon />
          Continue with Github
        </Button>
      </div>

    </div>
  )
}
