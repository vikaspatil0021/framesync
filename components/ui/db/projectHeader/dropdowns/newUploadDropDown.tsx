import { useState } from "react";
import type { ChangeEvent } from "react"

import { nanoid } from "nanoid";

import { AngleDown } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "@/components/ui/use-toast";

import { trpc } from "@/trpc/client/trpcClient";
import { getPreSignedUrl } from "@/lib/aws/s3/preSignedUrl";



export const NewUploadDropDown = ({
    projectId,
    refetchMedia
}: {
    projectId: string,
    refetchMedia: () => void
}) => {

    const [openStatus, setOpenStatus] = useState<boolean>(false);

    const createMedia = trpc.media.createMedia.useMutation()



    const mediaUploadHandler = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e?.target?.files?.[0];

        if (file) {
            let key = nanoid(21);

            const url = await getPreSignedUrl({ //get the presigned url to upload
                key,
                contentType: 'video/mp4'
            });

            setOpenStatus(false);

            await fetch(url, { //upload to s3
                method: 'PUT',
                headers: {
                    'Content-type': 'video/mp4',
                },
                body: file,
            }).then((result) => {

                createMedia.mutate({ //after upload to  s3 create a media record in database
                    key,
                    projectId,
                    size: file.size,
                    type: "VideoFile"
                });

                if (result.ok) {
                    setTimeout(() => {
                        refetchMedia()
                    }, 10000);
                }

            }).catch((err) => {

                toast({
                    title: err?.message,
                    variant: 'destructive'
                })
            })
        }
    }


    return (
        <>
            <DropdownMenu open={openStatus} onOpenChange={setOpenStatus}>
                <DropdownMenuTrigger asChild>
                    <Button size='sm' variant='default' className={`outline-none focus-visible:ring-0 gap-1 flex items-center hover:bg-[#536795] transition-all ${openStatus ? "bg-[#536795]" : "bg-[#4a5878]"}`} >
                        New
                        <AngleDown />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-white rounded-sm p-1 w-[150px] text-[12px] bg-[#2c2c2c]">
                    <div className="">
                        <div className="relative px-2.5 py-1.5 rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-default">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path fill-rule="evenodd" fill="currentColor" d="M3.75 8.81l-2.22 2.22A.75.75 0 0 1 .47 9.97l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L5.25 8.81v6.59a.75.75 0 1 1-1.5 0V8.81zM9 1.5H4.625c-.074 0-.125.05-.125.1v2.149L3 5.102V1.6C3 .716 3.728 0 4.625 0h5.688L16 5.6v8.8c0 .884-.728 1.6-1.625 1.6h-7v-1.5h7c.074 0 .125-.05.125-.1V7H9.75A.75.75 0 0 1 9 6.25V1.5zm1.5.79V5.5h3.26L10.5 2.29z"></path></svg>
                            File upload
                            <input type="file" className="opacity-0 absolute h-full w-full left-0 top-0" accept=".mp4"
                                onChange={mediaUploadHandler}
                            />
                        </div>
                        <div className="px-2.5 py-1.5 rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-default">
                            <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" width="12" height="12"><path fill="currentColor" fill-rule="evenodd" d="M3.75 8.81l-2.22 2.22A.75.75 0 0 1 .47 9.97l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L5.25 8.81V15a.75.75 0 1 1-1.5 0V8.81zM8.375 16v-1.5H14.4c.041 0 .1-.061.1-.167V5.167c0-.106-.059-.167-.1-.167H7.2a1.5 1.5 0 0 1-1.263-.691L4.779 2.5H1.6c-.041 0-.1.061-.1.167v4.17L0 8.354V2.667C0 1.747.716 1 1.6 1h4l1.6 2.5h7.2c.884 0 1.6.746 1.6 1.667v9.166c0 .92-.716 1.667-1.6 1.667H8.375z"></path></svg>
                            Folder upload
                        </div>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}
