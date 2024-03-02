"use client"

import { AppsIcon, NotificationIcon, RecentIcon, SwitchTeamIcon, ThreeVerticalDotsIcon } from "@/components/icons/Icons"
import { Input } from "../../input"
import { Search } from "lucide-react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"

import { AccountDropDown } from "./dropdowns/Account-DropDown"
import { NotificationDropDown } from "./dropdowns/Notification-DropDown"
import { ManageMembersModal } from "./dialogs/membersModal/membersModal"
import { TeamsSelectOption } from "./selects/teams-selects"
import { NewProjectModal } from "./dialogs/newProjectModal/newProjectModal"
import { useEffect, useState } from "react"
import { trpc } from "@/trpc/client/trpcClient"
import { ScrollArea } from "../../scroll-area"




type EachProject = {
   teamId: string;
   id: string;
   name: string;
}

const TopSection = ({
   activePath
}: {
   activePath: string
}) => {

   return (
      <>
         <div className="border-b-[1px] border-[#555]">
            <div className="grid gap-2 px-3">
               <div className="flex justify-between  items-center">

                  <AccountDropDown />
                  <NotificationDropDown />
               </div>
               <div className="relative flex items-center ">
                  <Search className="h-4 absolute left-1.5" />
                  <Input className="border-none h-8 bg-[#3c3c3c] placeholder:text-[#999] text-xs p-1 ps-9 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500 focus-visible:ring-transparent transition-all"
                     placeholder="Search files or projects"
                  />
               </div>
            </div>
            <div className="my-3">
               <Link href='/db/recents'>
                  <div className={cn(`flex items-center gap-2 h-8 px-5 cursor-pointer ${activePath === "recents" ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`)} >
                     <RecentIcon />
                     <span className="text-xs">Recents</span>
                  </div>
               </Link>
               <Link href='/db/apps'>
                  <div className={cn(`flex items-center gap-2 h-8 px-5 cursor-pointer ${activePath === "apps" ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`)} >
                     <AppsIcon />
                     <span className="text-xs">
                        Apps
                     </span>
                  </div>
               </Link>
            </div >
         </div >

      </>
   )
}

const BottomSection = ({
   activePath
}: {
   activePath: string
}) => {
   const router = useRouter();


   const [teamId, setTeamId] = useState('');

   useEffect(() => {

      window.onstorage = () => {
         setTeamId(localStorage.getItem('teamId') as string)
      }
   }, [])

   const { data: projectsData, refetch: refetchProjects } = trpc.project.getProjects.useQuery({ teamId });

   const refetchProjectsdata = () => refetchProjects();


   const activePathProject = activePath.replace('project/', '');


   useEffect(()=>{ // change the url to the current first project  if team changes
      let allProjectIds = projectsData?.projects.map((each:EachProject)=>{
         return each.id
         
      }) as string[];

      if(allProjectIds && !allProjectIds?.includes(activePathProject)){
         const currentId = allProjectIds[0]
         router.push('/db/project/' + currentId) 
      }
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[projectsData])


   return (
      <>
         <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex gap-2 m-3">
               <TeamsSelectOption />
               <ManageMembersModal
                  teamId={teamId}
               />
            </div>
            <div className="pt-2">
               <div className="px-3 text-[11px]">Projects</div>
               <div className="mt-2 font-normal text-[#ccc]">
                  <NewProjectModal
                     teamId={teamId}
                     refetchProjectsdata={refetchProjectsdata}
                  />

               </div>
            </div>

            <ScrollArea className="flex-1">

               {
                  projectsData?.projects.map((eachProject: EachProject, index) => {
                     return (
                        <>
                           <Link href={"/db/project/" + eachProject.id}>

                              <div key={index} className={`group flex items-center justify-between cursor-pointer h-8 pe-3 ps-10 ${activePathProject === eachProject.id ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`}>
                                 <span className="text-[13px]">
                                    {eachProject.name}
                                 </span>
                                 <div className="rounded-sm hidden hover:bg-[#444] group-hover:flex items-center justify-center h-8 w-8">

                                    <ThreeVerticalDotsIcon />
                                 </div>
                              </div>
                           </Link>
                        </>
                     )
                  })
               }
         </ScrollArea>
            </div>

      </>
   )
}


export const SideBarComponent = () => {
   const pathName = usePathname();

   const activePath = pathName.replace('/db/', '');
   return (
      <>
         <div className="bg-[#2c2c2c] text-white min-w-[300px] border-r-[.5px] border-[#555] py-3 flex flex-col h-screen overflow-hidden">
            <TopSection
               activePath={activePath}
            />
            <BottomSection
               activePath={activePath}
            />
         </div>
      </>
   )
}
