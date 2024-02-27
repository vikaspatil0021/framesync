import { trpc } from "@/trpc/client/trpcClient"

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"

type EachTeam = {
   team: {
       id: string;
       name: string;
   };
   id: string;
   role: "OWNER" | "MEMBER"
}

export const TeamsSelectOption = () => {

   const [selectValue, setSelectValue] = useState<string>('')

   const { data } = trpc.teams.getTeams.useQuery()

   useEffect(() => {
      setSelectValue(data?.teams[0].team.id as string)
   }, [data])

   useEffect(() => {
      if (![undefined, ""].includes(selectValue)) {
         localStorage.setItem('teamId', selectValue);
         window.dispatchEvent(new Event('storage'))

      }
   }, [selectValue])


   return (
      <>
         <Select value={selectValue} onValueChange={setSelectValue}>
            <SelectTrigger className="flex-auto w-[180px] bg-[#3c3c3c] text-white border-none focus:ring-offset-0 focus:ring-0">
               <SelectValue placeholder="Select a Team" />
            </SelectTrigger>
            <SelectContent className="bg-[#222] text-white border-white/10 ">
               <SelectGroup>
                  {
                     data?.teams?.map((eachTeam:EachTeam) => {
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
