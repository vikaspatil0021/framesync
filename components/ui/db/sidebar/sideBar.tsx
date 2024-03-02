"use client"

import { AppsIcon, NotificationIcon, RecentIcon, SwitchTeamIcon, ThreeVerticalDotsIcon } from "@/components/icons/Icons"
import { Input } from "../../input"
import { Plus, Search, Users } from "lucide-react"
import { Button } from "../../button"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

import { AccountDropDown } from "./dropdowns/Account-DropDown"
import { NotificationDropDown } from "./dropdowns/Notification-DropDown"
import { ManageMembersModal } from "./dialogs/membersModal/membersModal"
import { TeamsSelectOption } from "./selects/teams-selects"
import { NewProjectModal } from "./dialogs/newProjectModal/newProjectModal"
import { useEffect, useState } from "react"




const TopSection = () => {
   const pathName = usePathname();

   const activePage = pathName.replace('/db/', '');
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
                  <div className={cn(`flex items-center gap-2 h-8 px-5 cursor-pointer ${activePage === "recents" ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`)} >
                     <RecentIcon />
                     <span className="text-xs">Recents</span>
                  </div>
               </Link>
               <Link href='/db/apps'>
                  <div className={cn(`flex items-center gap-2 h-8 px-5 cursor-pointer ${activePage === "apps" ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]'}`)} >
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

const BottomSection = () => {
   const [teamId, setTeamId] = useState('');

   useEffect(() => {

      window.onstorage = () => {
         setTeamId(localStorage.getItem('teamId') as string)
      }
   }, [])

   return (
      <>
         <div>
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
                  />
                  <div className="group flex items-center justify-between hover:bg-[#383838] cursor-pointer h-8 pe-3 ps-10">
                     <span className="text-[13px]">
                        Sarah new video
                     </span>
                     <div className="rounded-sm hidden hover:bg-[#444] group-hover:flex items-center justify-center h-8 w-8">

                        <ThreeVerticalDotsIcon />
                     </div>
                  </div>
                  <div className="group flex items-center justify-between hover:bg-[#383838] cursor-pointer h-8 pe-3 ps-10">
                     <span className="text-[13px]">
                        One Love
                     </span>
                     <div className="rounded-sm hover:bg-[#444] hidden group-hover:flex items-center justify-center h-8 w-8">
                        <ThreeVerticalDotsIcon />
                     </div>
                  </div>
               </div>
            </div>
         </div >
      </>
   )
}
export const SideBarComponent = () => {
   return (
      <>
         <div className="bg-[#2c2c2c] text-white min-w-[300px] border-r-[.5px] border-[#555] py-3">
            <TopSection />
            <BottomSection />
         </div>
      </>
   )
}
