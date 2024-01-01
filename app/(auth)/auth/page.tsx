"use client"

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

import { GoogleIcon } from "@/components/icons/Icons"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useEffect } from "react";


export default function Auth() {
  const session = useSession();
  const searchParams = useSearchParams();

  useEffect(() => {

    // handle oauth errors with toast
    const error: string | null = searchParams.get('error');
    if (session?.status === 'unauthenticated' && error) {
      toast({
        variant: "destructive",
        title: error,
      });
    }
  }, [searchParams, session?.status])

  return (
    <>
      <div className="text-center w-full max-w-md min-w-fit mb-5">
        <div className="font-semibold text-4xl py-3 mb-5">
          Framesync.in
        </div>
        <div className="flex flex-col w-full gap-3 p-6 bg-[#222] rounded-md border border-white/10">
          <div className="text-sm">
            Authenticate with
          </div>
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
    </>

  )
}
