"use client"

import { AppsIcon, RecentIcon, ThreeVerticalDotsIcon } from "@/components/icons/Icons"
import { Input } from "../../input"
import { Search } from "lucide-react"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { trpc } from "@/trpc/client/trpcClient"
import { useAppSelector } from "@/lib/redux-toolkit/hook"

import { AccountDropDown } from "./dropdowns/Account-DropDown"
import { NotificationDropDown } from "./dropdowns/Notification-DropDown"
import { ManageMembersModal } from "./dialogs/membersModal/membersModal"
import { TeamsSelectOption } from "./selects/teams-selects"
import { NewProjectModal } from "./dialogs/newProjectModal/newProjectModal"
import { Dispatch, SetStateAction, useEffect } from "react"
import { ScrollArea } from "../../scroll-area"
import { Skeleton } from "../../skeleton"





type EachProject = {
   teamId: string;
   id: string;
   name: string;
}

const TopSection = ({
   activePath,
   setOpenSideBar
}: {
   activePath: string,
   setOpenSideBar?: Dispatch<SetStateAction<boolean>>

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
                     autoFocus={false}

                  />
               </div>
            </div>
            <div className="my-3">
               <Link href='/db/recents' onClick={()=>{
                   setTimeout(() => {
                                    
                     setOpenSideBar && setOpenSideBar(false);
                  }, 500);
               }}>
                  <div className={cn(`flex items-center gap-2 h-8 px-5 cursor-pointer ${activePath === "recents" ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`)} >
                     <RecentIcon />
                     <span className="text-xs">Recents</span>
                  </div>
               </Link>
               <Link href='/db/apps' onClick={()=>{
                   setTimeout(() => {
                                    
                     setOpenSideBar && setOpenSideBar(false);
                  }, 500);
               }}>
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
   activePath,
   setOpenSideBar
}: {
   activePath: string,
   setOpenSideBar?: Dispatch<SetStateAction<boolean>>
}) => {
   const router = useRouter();

   const { currentTeam } = useAppSelector((state) => state.currentTeam);


   const { data: projectsData, refetch: refetchProjects } = trpc.project.getProjects.useQuery({ teamId: currentTeam?.id });

   const refetchProjectsdata = () => refetchProjects();


   const activePathProject = activePath.replace('project/', '');


   useEffect(() => { // change the url to the current first project  if team changes
      let allProjectIds = projectsData?.projects.map((each: EachProject) => {
         return each.id

      }) as string[];

      if (activePath.includes('project') && allProjectIds && !allProjectIds?.includes(activePathProject)) {

         setTimeout(() => {
                                    
            setOpenSideBar && setOpenSideBar(false);
         }, 500);
         const currentId = allProjectIds[0]
         router.push('/db/project/' + currentId)
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [projectsData])


   return (
      <>
         <div className="flex flex-col flex-1 overflow-y-auto">
            <div className="flex gap-2 m-3">
               <TeamsSelectOption />
               <ManageMembersModal />
            </div>
            <div className="py-2 flex justify-between items-center">
               <div className="px-3 text-[11px]">Projects</div>
                  <NewProjectModal
                     teamId={currentTeam?.id}
                     refetchProjectsdata={refetchProjectsdata}    
                        setOpenSideBar={setOpenSideBar}
                  />
            </div>

            <ScrollArea className="flex-1">
               {
                  projectsData?.projects ?
                     projectsData?.projects.map((eachProject: EachProject, index: number) => {
                        return (
                           <>
                              <Link href={"/db/project/" + eachProject.id} onClick={()=>{

                                 setTimeout(() => {
                                    
                                    setOpenSideBar && setOpenSideBar(false);
                                 }, 500);
                              }}>

                                 <div key={index} className={`group flex items-center cursor-pointer h-8 pe-5 max-w-[300px] ps-10 ${activePathProject === eachProject.id ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`}>
                                    <span className="text-[13px] truncate w-[85%]">
                                       {eachProject.name}
                                    </span>
                                 </div>
                              </Link>
                           </>
                        )
                     })
                     :
                     <>
                        <div className='flex items-center justify-between cursor-pointer h-8 pe-5 max-w-[300px] ps-10'>
                           <Skeleton className="bg-[#444] h-4 w-[50%]" />
                        </div>
                        <div className='flex items-center justify-between cursor-pointer h-8 pe-5 max-w-[300px] ps-10'>
                           <Skeleton className="bg-[#444] h-4 w-[60%]" />
                        </div>
                     </>
               }
            </ScrollArea>
         </div>

      </>
   )
}


export const SideBarComponent = ({
   setOpenSideBar
}: {
   setOpenSideBar?: Dispatch<SetStateAction<boolean>>
}) => {
   const pathName = usePathname();

   const activePath = pathName.replace('/db/', '');
   return (
      <>
         <div className="bg-[#2c2c2c] text-white min-w-[300px] w-[300px] border-r-[.5px] border-[#555] py-3 flex flex-col h-screen overflow-hidden">
            <TopSection
               activePath={activePath}
               setOpenSideBar={setOpenSideBar}
            />
            <BottomSection
               setOpenSideBar={setOpenSideBar}
               activePath={activePath}
            />
         </div>
      </>
   )
}
