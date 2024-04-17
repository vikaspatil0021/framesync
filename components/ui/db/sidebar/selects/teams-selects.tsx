'use client'
import { trpc } from "@/trpc/client/trpcClient"

import { useEffect, useState } from "react"

import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hook";
import { updateTeam } from "@/lib/redux-toolkit/slices/currentTeamSlice";

import {
   Select,
   SelectContent,
   SelectGroup,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";


type EachTeam = {
   team: {
      id: string;
      name: string;
   };
   id: string;
   role: "OWNER" | "MEMBER"
}

export const TeamsSelectOption = () => {
   const dispatch = useAppDispatch();

   const pathName = usePathname();
   const projectId = pathName.replace('/db/project/', '');


   const [selectValue, setSelectValue] = useState<string>('')


   const { data: allTeams } = trpc.teams.getTeams.useQuery()
   const { data: projectDetails } = trpc.project.getProject.useQuery({ projectId });


   const { currentTeam } = useAppSelector((state) => state.currentTeam);

   useEffect(() => {
      const teamId = projectDetails?.project?.teamId || currentTeam?.id || allTeams?.teams[0]?.team?.id;

      setSelectValue(teamId as string);

   // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [allTeams]);


   useEffect(() => {
      if (![undefined, ""].includes(selectValue)) {
         const selectedTeam = allTeams?.teams.flatMap((eachTeam: EachTeam) => eachTeam.team.id === selectValue ? eachTeam.team : []);

         dispatch(updateTeam(selectedTeam?.[0]));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [selectValue])


   return (
      <>
         {
            !allTeams ?
               <div className="flex-auto ">
                  <Skeleton className="w-full h-9 bg-[#555]" />
               </div>
               :

               <Select value={selectValue} onValueChange={setSelectValue}>
                  <SelectTrigger className="flex-auto min-w-[180px] bg-[#3c3c3c] text-white border-none focus:ring-offset-0 focus:ring-0">
                     <SelectValue placeholder="Select a Team" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#222] text-white border-white/10 ">
                     <SelectGroup>
                        {
                           allTeams?.teams?.map((eachTeam: EachTeam) => {
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
         }
      </>
   )
}
