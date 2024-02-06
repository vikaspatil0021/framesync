import { AngleDown, AppsIcon, NotificationIcon, RecentIcon } from "@/components/icons/Icons"
import { Skeleton } from "../../skeleton"
import { Input } from "../../input"
import { Search } from "lucide-react"




const TopSection = () => {
   return (
      <>
         <div className="border-b-[1px] border-[#555]">
            <div className="grid gap-2 px-3">
               <div className="flex justify-between  items-center">

                  <div className="inline-flex items-center gap-2 cursor-pointer pl-2 py-1.5 pr-3 hover:bg-[#383838] rounded-sm">

                     <div className="h-6 w-6 rounded-full bg-green-400" />
                     <span className="text-[13px]">Vikas Patil</span>
                     <AngleDown />
                  </div>
                  <div className="rounded-sm  hover:bg-[#383838] inline-flex items-center p-0.5 cursor-pointer">
                     <NotificationIcon />
                  </div>
               </div>
               <div className="relative flex items-center ">
                  <Search className="h-4 absolute left-1.5" />
                  <Input className="border-none h-8 bg-[#3c3c3c] placeholder:text-[#999] text-xs p-1 ps-9 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500 focus-visible:ring-transparent transition-all"
                     placeholder="Search files or projects"
                  />
               </div>
            </div>
            <div className="my-3">
               <div className="flex items-center gap-2 h-8 px-5 hover:bg-[#3c3c3c] cursor-pointer">
                  <RecentIcon />
                  <span className="text-xs text-[#b7b7b7]">Recents</span>
               </div>
               <div className="flex items-center gap-2 h-8 px-5 hover:bg-[#3c3c3c] cursor-pointer">
                  <AppsIcon />
                  <span className="text-xs text-[#b7b7b7]">
                     Apps
                  </span>
               </div>
            </div>
         </div>

      </>
   )
}
export const SideBarComponent = () => {
   return (
      <>
         <div className="bg-[#2c2c2c] text-white min-w-[300px] border-r-[.5px] border-[#555] py-3">
            <TopSection />
         </div>
      </>
   )
}
