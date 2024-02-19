'use client'

import { trpc } from "@/trpc/client/trpcClient"


export default function Page() {
   const { data } = trpc.teams.getTeams.useQuery({ userId: '07_bIRs3Ym2av1G' })
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
