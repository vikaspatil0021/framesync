import { useEffect, useState } from "react"

import { Button } from "../button"
import { Input } from "../input"
import { toast } from "../use-toast"
import { trpc } from "@/trpc/client/trpcClient"
import type { QueryObserverResult, RefetchOptions } from "@tanstack/react-query"


export default function InviteInput({
   teamId,
   refetchInvites
}: {
   teamId: string,
   refetchInvites: (options?: RefetchOptions) => Promise<QueryObserverResult<unknown,Error>>
}) {
   const [isLoading, setLoading] = useState(false);
   const [email, setEmail] = useState('');

   const createInvite = trpc.invite.createInvite.useMutation();

   const { error: inviteError, isPending, isSuccess } = createInvite;

   useEffect(() => {
      setLoading(isPending);

   }, [isPending]);

   useEffect(()=>{

      if (inviteError) {
         toast({
            title: inviteError?.message,
            variant: "destructive"
         })
      }
      
      if (isSuccess) {
         toast({
            title: "Invite Sent Successfully",
            variant: "success"
         });
         setEmail('');
         refetchInvites();
      }
   },[inviteError,isSuccess,refetchInvites])


   return (
      <>
         <div className="flex w-full items-center space-x-2 gap-2">
            <Input type="email" placeholder="Email"
               className="h-9 text-xs"
               onChange={(e) => {
                  setEmail(e.target.value);
               }}
               value={email}
               tabIndex={-1}
            />
            <Button
               variant='secondary'
               size='sm'
               onClick={() => {
                  createInvite.mutate({ email, teamId });
               }}
               disabled={(isLoading || email === '') ? true : false}
               loading={isLoading}
            >
               Invite
            </Button>
         </div>
      </>
   )
}
