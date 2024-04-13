import { useState } from "react";

import { Copy, CopyPlus, Download, FolderInput, Pencil, Trash2 } from "lucide-react";
import { LoadingIcon, ThreeVerticalDotsIcon } from "@/components/icons/Icons"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import downloadMedia from "@/lib/downloadMedia";
import { toast } from "@/components/ui/use-toast";



export const MoreOptionsDropDown = ({
   mediaKey,
   mediaName
}: {
   mediaKey: string,
   mediaName: string
}) => {
   const [openStatus, setOpenStatus] = useState(false);
   const [downloading, setDownloading] = useState(false);

   const downloadMediaHandler = async () => {
      setDownloading(true);
      const result = await downloadMedia(mediaKey, mediaName);
      if (result === 200) {
         setOpenStatus(false)
         setDownloading(false);

         toast({
            title:mediaName + " file downloaded",
            variant:'success'
         })
      }
   }
   return (
      <>
         <DropdownMenu open={openStatus} onOpenChange={setOpenStatus}>
            <DropdownMenuTrigger asChild>
               <div className={`absolute right-0 top-0 bg-[#505871] flex items-center justify-center p-1 m-1 rounded-md shadow-sm shadow-black h-6 w-6 border border-white/40 lg:opacity-0 ${openStatus && "lg:opacity-100"}  transition-all duration-300 lg:group-hover:opacity-100`}>
                  <ThreeVerticalDotsIcon />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-white w-[160px] text rounded-md px-0 p-1  bg-[#111] border-white/20 border">
               <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                  <FolderInput className="h-4 w-4" />
                  <span className="text-xs">Move to...</span>
               </div>
               <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                  <Copy className="h-4 w-4" />
                  <span className="text-xs">Copy to...</span>
               </div>
               <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                  <CopyPlus className="h-4 w-4" />
                  <span className="text-xs">Duplicate</span>
               </div>

               <div className='relative flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]'
                  onClick={downloadMediaHandler}>

                  <Download className="h-4 w-4" />
                  <span className="text-xs">Download</span>
                  {downloading &&
                     <LoadingIcon className="right-0 h-4 w-4" />}
               </div>
               <hr className="border-t-[.5px] border-white/20 my-2" />

               <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                  <Pencil className="h-4 w-4" />
                  <span className="text-xs">Rename</span>
               </div>
               <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#eb6060]' >
                  <Trash2 className="h-4 w-4" />
                  <span className="text-xs">Delete</span>
               </div>
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
