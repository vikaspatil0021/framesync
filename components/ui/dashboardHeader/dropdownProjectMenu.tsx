import { SwitchTeamIcon } from "@/components/icons/Icons"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link"
import { Check } from "lucide-react"
import { Skeleton } from "../skeleton";
import { ScrollArea, ScrollBar } from "../scroll-area";


type EachProject = {
   id: string,
   teamId: string,
   name: string
}

const ProfileComponent = ({
   eachProject,
   activeProject,
   teamId
}: {
   eachProject: EachProject | null,
   activeProject: EachProject | null,
   teamId: string
}) => {
   return (
      <>
         <div className="w-full" key={eachProject?.id}>
            <Link href={'/t/' + teamId + "/" + eachProject?.id}>
               <div className="flex items-center gap-2 justify-between cursor-pointer py-3 px-2 hover:bg-[#333] rounded-lg">
                  <div className="flex items-center gap-2">

                     <Skeleton className="h-5 w-5 rounded-full " />
                     <span className="text-xs">{eachProject?.name}</span>
                  </div>
                  {
                     activeProject?.id === eachProject?.id &&
                     <Check className="h-5 mr-1 text-green-500" />
                  }
               </div>
            </Link>

         </div>
      </>
   )
}

export default function DropdownProjectMenu({
   projects,
   activeProject,
   teamId
}: {
   projects: [] | null,
   activeProject: EachProject | null,
   teamId: string
}) {
   return (
      <>
         <DropdownMenu>
            <DropdownMenuTrigger className="outline-none data-[state=open]:bg-[#333] rounded-lg hover:bg-[#333] transition-all">
               <SwitchTeamIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
               <div className="p-1">
                  {
                     projects && projects.length != 0 &&
                     <div>

                        <div className="px-2 text-[11px] my-1 text-[#999]">
                           Projects
                        </div>
                        <ScrollArea className="h-[300px] w-[250px]">
                           <div className="w-[235px]">
                              {
                                 projects.map((eachProject: EachProject) => {
                                    return (

                                       <ProfileComponent
                                          key={eachProject.id}
                                          eachProject={eachProject}
                                          activeProject={activeProject}
                                          teamId={teamId}
                                       />
                                    )
                                 })
                              }
                           </div>
                        </ScrollArea>
                     </div>
                  }
               </div>
            </DropdownMenuContent>
         </DropdownMenu >
      </>
   )
}
