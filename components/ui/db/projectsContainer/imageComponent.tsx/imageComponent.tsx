import Image from "next/image"

import convertBytes from "@/lib/convertBytesFunction"
import formatTime from "@/lib/formatTime"

import formatDate from "@/lib/formatDate"
import { ThreeVerticalDotsIcon } from "@/components/icons/Icons"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreOptionsDropDown } from "./moreOptionsDropDown"


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



export default function ImageComponent({
    each,
    index
}: {
    each: Media,
    index: number
}) {

    const awsCdnImgDomain = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN + "/" + each.key + ".jpg";

    return (
        <>

            <div draggable className="group relative rounded-md text-[#fff] shadow-md shadow-[#111] cursor-pointer">
                <div className="relative">
                    <Image
                        key={index}
                        loading="lazy"
                        src={awsCdnImgDomain}
                        width={100}
                        height={100}
                        className="rounded-t-md w-full aspect-video"
                        alt='media-Image'
                        unoptimized
                        draggable={false}
                    />

                    <span className="text-[9px] font-medium bg-[#222] rounded-sm absolute bottom-0 right-0 px-1 m-1 flex items-center shadow-slate-300/50 shadow-sm">
                        {formatTime(each?.duration)}
                    </span>

                    <MoreOptionsDropDown
                        mediaKey={each.key}
                        mediaName={each.name}
                    />

                </div>

                <div className="text-[11px] bg-[#363c4c] rounded-b-md p-2.5">
                    <div className="flex justify-between">
                        <span className="truncate w-[70%]">
                            {each?.name}
                        </span>
                        <span>
                            {convertBytes(each?.size)}
                        </span>
                    </div>
                    <div className="flex justify-between mt-0.5 text-[9px] opacity-70 text-[#eee]">
                        <span className="truncate max-w-[50%]">
                            {each?.user.name}
                        </span>
                        <span className="truncate max-w-[50%]">
                            {formatDate(each?.uploaded_at)}
                        </span>
                    </div>
                </div>
            </div>

        </>
    )
}