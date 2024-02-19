import { useEffect, useState } from "react"
import { useSession } from "next-auth/react";
import { trpc } from "@/trpc/client/trpcClient";

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"



export const TeamsSelectOption = () => {
   const session = useSession();

   const [selectValue, setSelectValue] = useState('');

   //@ts-expect-error
   const { data } = trpc.teams.getTeams.useQuery({ userId:  session?.data?.user?.id })


   useEffect(()=>{
      setSelectValue(data?.teams[0]?.team?.id as string)
   },[data])

   return (
      <>
         <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger className="flex-auto w-[180px] bg-[#3c3c3c] text-white border-none focus:ring-offset-0 focus:ring-0">
               <SelectValue placeholder="Select a Team" />
            </SelectTrigger>
            <SelectContent className="bg-[#222] text-white border-white/10 ">
               <SelectGroup>
                  {
                     data?.teams.map(eachTeam => {
                        return (
                           <>
                              <SelectItem value={eachTeam.team.id} key={'key' + eachTeam.team.id}>
                                 <div className="flex gap-2">
                                    <div className="h-5 w-5 rounded-full bg-green-400" />
                                    <span className="text-[12px] text-center m-auto">{eachTeam.team.name}</span>
                                 </div>
                              </SelectItem>
                           </>
                        )
                     })
                  }

               </SelectGroup>
            </SelectContent>
         </Select>

      </>
   )
}
