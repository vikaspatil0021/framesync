'use client'

import { trpc } from "@/trpc/client/trpcClient"
import Invite from "../(auth)/invite/page";


export default function Page() {
   const { data } = trpc.invite.getInvites.useQuery({ teamId: 'jTCUE8s7n5LMUkz' })
   const deleteInvite = trpc.invite.deleteInvite.useMutation();
   const click = () => {
      deleteInvite.mutate({inviteId:'dsjhvhbj'});
   }
   return (
      <>
         <button onClick={click}>click</button>
      </>
   )
}
