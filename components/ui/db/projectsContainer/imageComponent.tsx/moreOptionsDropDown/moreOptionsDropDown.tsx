import { useEffect, useState } from "react";

import { Copy, CopyPlus, Download, FolderInput, Trash2 } from "lucide-react";
import { LoadingIcon, ThreeVerticalDotsIcon } from "@/components/icons/Icons"

import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { toast } from "@/components/ui/use-toast";

import downloadMedia from "@/lib/downloadMedia";

import { RenameMediaModal } from "./renameModel";
import { DeleteMediaModal } from "./deleteMediaModal";
import { trpc } from "@/trpc/client/trpcClient";
import { MoveToOrCopyToModal } from "./copy&moveModal";

type Media = {
   projectId: string;
   id: string;
   name: string;
   type: "VideoFile" | "Folder"
   user: {
      id: string;
      name: string;
   };
   key: string;
   size: number;
   duration: number;
   uploaded_at: string;
   uploaderId: string;
}


export const MoreOptionsDropDown = ({
   each,
   awsCdnImgDomain,
   refetchMedia
}: {
   each: Media,
   awsCdnImgDomain: string,
   refetchMedia: () => void
}) => {
   const [openStatus, setOpenStatus] = useState(false);
   const [downloading, setDownloading] = useState(false);
   const [duplicateLoading, setDuplicateLoading] = useState(false);

   const downloadMediaHandler = async () => {
      setDownloading(true);
      const result = await downloadMedia(each?.key, each?.name);
      if (result === 200) {
         setOpenStatus(false)
         setDownloading(false);

         toast({
            title: each?.name + " file downloaded",
            variant: 'success'
         })
      }
   }

   const copyMedia = trpc.media.copyMedia.useMutation()
   const { isPending, isSuccess } = copyMedia;

   useEffect(() => {
      setDuplicateLoading(isPending);
   }, [isPending])

   useEffect(() => {
      if (isSuccess) {
         refetchMedia();
         setOpenStatus(false);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isSuccess]);

   return (
      <>
         <DropdownMenu open={openStatus} onOpenChange={setOpenStatus}>
            <DropdownMenuTrigger asChild>
               <div className={`absolute right-0 top-0 bg-[#505871] flex items-center justify-center p-1 m-1 rounded-md shadow-sm shadow-black h-6 w-6 border border-white/40 lg:opacity-0 ${openStatus && "lg:opacity-100"}  transition-all duration-300 lg:group-hover:opacity-100`}>
                  <ThreeVerticalDotsIcon />
               </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="text-white w-[160px] text rounded-md px-0 p-1  bg-[#111] border-white/20 border">

               <MoveToOrCopyToModal
                  element="move"
                  each={each}
                  setOpenStatus={setOpenStatus}
                  refetchMedia={refetchMedia}

               />

               <MoveToOrCopyToModal
                  element="copy"
                  each={each}
                  setOpenStatus={setOpenStatus}

               />

               <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]'
                  onClick={() => {
                     copyMedia.mutate({
                        ...each,
                        name: each?.name + '[COPY]'
                     })
                  }}>
                  <CopyPlus className="h-4 w-4" />
                  <span className="text-xs">Duplicate</span>
                  {duplicateLoading &&
                     <LoadingIcon className="right-0 h-4 w-4" />}

               </div>

               <div className='relative flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]'
                  onClick={downloadMediaHandler}>

                  <Download className="h-4 w-4" />
                  <span className="text-xs">Download</span>
                  {downloading &&
                     <LoadingIcon className="right-0 h-4 w-4" />}
               </div>

               <hr className="border-t-[.5px] border-white/20 my-2" />

               <RenameMediaModal
                  awsCdnImgDomain={awsCdnImgDomain}
                  mediaId={each?.id}
                  mediaName={each?.name}
                  setOpenStatusDropDown={setOpenStatus}
                  refetchMedia={refetchMedia}
               />

               <DeleteMediaModal
                  awsCdnImgDomain={awsCdnImgDomain}
                  mediaId={each?.id}
                  mediaName={each?.name}
                  refetchMedia={refetchMedia}
                  setOpenStatusDropDown={setOpenStatus}

               />
            </DropdownMenuContent>
         </DropdownMenu>
      </>
   )
}
