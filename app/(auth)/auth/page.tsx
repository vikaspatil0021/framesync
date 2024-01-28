"use client"

import { signIn, useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/components/ui/use-toast";

import { GoogleIcon } from "@/components/icons/Icons"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { useEffect, useState } from "react";


export default function Auth() {
   const session = useSession();
   const searchParams = useSearchParams();

   const [googleBtnLoading, setGoogleBtnLoading] = useState(false);
   const [githubBtnLoading, setGithubBtnLoading] = useState(false);


   useEffect(() => {

      // handle oauth errors with toast
      const error: string | null = searchParams.get('error');
      if (session?.status === 'unauthenticated' && error) {
         toast({
            variant: "destructive",
            title: "Error: " + error,
         });
      }
   }, [searchParams, session?.status])

   return (
      <>
         <div className="text-center w-full max-w-md min-w-fit mb-5">
            <div className="font-semibold text-4xl py-3 mb-5">
               Framesync.in
            </div>
            <div className="flex flex-col w-full gap-3 p-6 bg-[#333] rounded-md border border-white/10">
               <div className="text-sm">
                  Authenticate with
               </div>
               {
                  (session.status === 'loading') ?
                     <>
                        <Skeleton className="h-10 w-full bg-zinc-500" />
                        <Skeleton className="h-10 w-full bg-zinc-500" />
                     </> :
                     <>
                        <Button variant="secondary" loading={googleBtnLoading} size='lg' className="gap-1" onClick={() => {
                           signIn('google');
                           setGoogleBtnLoading(true);
                        }}>
                           <GoogleIcon />
                           Continue with Google
                        </Button>
                        <Button variant="secondary" loading={githubBtnLoading} size='lg' className="gap-1" onClick={() => {
                           signIn('github');
                           setGithubBtnLoading(true);
                        }}>
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
