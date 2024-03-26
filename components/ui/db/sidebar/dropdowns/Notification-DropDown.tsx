import { NotificationIcon } from "@/components/icons/Icons"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";



export const NotificationDropDown = () => {

   const [openStatus, setOpenStatus] = useState(false);

   return (
      <>
         <DropdownMenu onOpenChange={setOpenStatus}>
            <DropdownMenuTrigger asChild>
               <div className={`rounded-sm  hover:bg-[#383838] inline-flex items-center p-0.5 me-7 lg:me-0 cursor-pointer ${openStatus && "bg-[#383838]"}`}>
                  <NotificationIcon />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white w-[330px] h-[250px] p-0 rounded-sm bg-[#222]">
               <div className="flex flex-col h-full">
                  <div className="text-[12px] px-3 py-2 border-b-[.5px] border-white/20">
                     Notifications
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                     <span className="text-[10px]">
                        You don&#39;t have any notifications.
                     </span>
                  </div>
               </div>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
