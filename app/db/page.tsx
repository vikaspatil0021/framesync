'use client'

import { trpc } from "@/trpc/client/trpcClient"


export default function Page() {
   const { data } = trpc.teams.getTeams.useQuery();
   // const deleteInvite = trpc.memberships.deleteMembership.useMutation();
   // const click = () => {
   //    deleteInvite.mutate({membershipId:'1EKAb8SKPSwDykKlmunBxrb2R7fB6b'});
   // }
   if(!data) return null
   return (
      <>
         <button>click</button>
      </>
   )
}
