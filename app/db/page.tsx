'use client'

import { trpc } from "@/trpc/client/trpcClient"


export default function Page() {
   const { data } = trpc.memberships.getMembership.useQuery({ teamId: 'jTCUE8s7n5LMUkz' })
   const deleteInvite = trpc.memberships.deleteMembership.useMutation();
   const click = () => {
      deleteInvite.mutate({membershipId:'1EKAb8SKPSwDykKlmunBxrb2R7fB6b'});
   }
   return (
      <>
         <button onClick={click}>click</button>
      </>
   )
}
