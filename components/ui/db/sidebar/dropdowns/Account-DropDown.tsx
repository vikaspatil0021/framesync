
import { AngleDown, LogoutIcon, RecentIcon, SettingIcon } from "@/components/icons/Icons"
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Skeleton } from "@/components/ui/skeleton";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";



export const AccountDropDown = () => {
   const session = useSession();

   const [openStatus, setOpenStatus] = useState(false);

   return (
      <>
         <DropdownMenu onOpenChange={setOpenStatus}>
            <DropdownMenuTrigger asChild>
               <div className={`inline-flex items-center gap-2 cursor-pointer pl-2 py-1.5 pr-3 hover:bg-[#383838]  rounded-sm ${openStatus && 'bg-[#383838]'}`}>

                  <div className="h-6 w-6 rounded-full bg-green-400" />
                  {
                     session.data ?
                        <span className="text-[13px]">
                           {session.data?.user?.name}
                        </span>
                        : <Skeleton className="w-[100px] h-4 bg-[#555]" />
                  }
                  <AngleDown />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white w-[290px] rounded-sm px-0 py-2 mx-1 bg-[#222]">
               <div className='flex items-center gap-2 h-8 px-5 cursor-pointer hover:bg-[#348ac8]' >
                  <SettingIcon />
                  <span className="text-xs">Settings</span>
               </div>

               <hr className="border-t-[.5px] border-white/20 my-2" />

               <div className='flex items-center gap-2 h-8 px-5 cursor-pointer hover:bg-[#348ac8]' onClick={() => signOut()}>
                  <LogoutIcon />
                  <span className="text-xs">Log out</span>
               </div>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
