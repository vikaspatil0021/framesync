
import { Skeleton } from "../skeleton"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { toast } from "../use-toast"

import DropdownTeamMenu from "./dropdownTeamMenu"
import { ManageMembersModal } from "../membersModal/membersModal"
import Link from "next/link"
import { Button } from "../button"

type EachTeam = {

   team: {
      id: string,
      name: string
   },
   id: string,
   role: string

}


export const DashboardHeader = ({ params }: { params: { teamId: string } }) => {
   const session = useSession();
   //@ts-expect-error
   const userId = session?.data?.user?.id;

   const [personalTeam, setPersonalTeam] = useState<EachTeam | null>(null);
   const [sharedTeam, setSharedTeam] = useState<[] | null>(null);
   const [activeTeam, setActiveTeam] = useState<EachTeam | null>(null)

   const getTeamsByUserId = async (userId: string) => {
      const result = await fetch(`/api/teams?userId=${userId}`, {
         method: "GET"
      });

      if (!result.ok) {
         const errorMsg = await result.json();
         toast({
            variant: "destructive",
            title: errorMsg.error,
         });
         return;
      }

      const data = await result.json();

      const sharedTeamArr = data.teams.filter((eachTeam: EachTeam) => {
         if (eachTeam?.team.id === params.teamId) {
            setActiveTeam(eachTeam);
         }
         if (eachTeam.role === 'OWNER') {
            setPersonalTeam(eachTeam);
         } else if (eachTeam.role === "MEMBER") {
            return eachTeam;
         }
      })
      setSharedTeam(sharedTeamArr)
   }


   useEffect(() => {
      if (personalTeam === null && sharedTeam === null && userId) {

         getTeamsByUserId(userId as string)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [personalTeam, sharedTeam, userId]);
   return (
      <>
         <div className="flex items-center justify-center bg-[#111] border-b border-[#555]/50 w-full  py-2.5  text-lg">
            <div className=" flex items-center justify-between max-w-[1400px] w-[90vw]">
               <div className="flex items-center gap-3 md:gap-10">

                  <Skeleton className="h-7 w-7 bg-[#222]" /> {/* //replace with logog */}
                  <div className="inline-flex items-center gap-3 ">
                     <div className="flex items-center gap-2 cursor-pointer">

                        <Skeleton className="h-5 w-5 rounded-full " />
                        {
                           activeTeam ?
                              <Link href={'/t/' + activeTeam?.team.id} className="flex items-center">
                                 <span className="text-sm">{activeTeam?.team.name}</span>
                              </Link>
                              :
                              <Skeleton className="h-4 w-[120px] bg-[#444]" />
                        }
                     </div>

                     <DropdownTeamMenu
                        personalTeam={personalTeam}
                        sharedTeam={sharedTeam}
                        activeTeam={activeTeam}
                     />

                  </div>
               </div>
               <div className="flex align-center gap-3">
                  <ManageMembersModal params={params} />
                  <Button onClick={() => signOut()} variant='secondary' size='sm'>sign out
                  </Button>
               </div>
            </div >
         </div>
      </>
   )
}
