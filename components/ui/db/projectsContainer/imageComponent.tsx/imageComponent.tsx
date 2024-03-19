import Image from "next/image"
import { useState } from "react"

import convertBytes from "@/lib/convertBytesFunction"
import formatTime from "@/lib/formatTime"


type Media = {
    id: String
    key: String
    size: number
    type: "VideoFile" | "Folder"
    projectId: String
    name: String
    duration: number
}

export default function ImageComponent({
    each,
    index
}: {
    each: Media,
    index: number
}) {

    const [keyy, setKey] = useState(Math.random() + index)


    const awsCdnDomain = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN + "/";

    return (
        <>
            <div className="relative text-[#c7c6c6]">
                <div className="relative">
                    
                    <Image
                        key={keyy}
                        loading="lazy"
                        src={awsCdnDomain + each.key + ".jpg"}
                        width={100}
                        height={100}
                        className="rounded-t-lg w-full aspect-video"
                        alt='media-Image'
                        unoptimized
                        onError={(e) => {
                            setTimeout(() => {
                                setKey(Math.random() + index)
                            }, 3000);
                        }}
                    />
                    
                    <span className="text-[9px] font-medium bg-[#222] rounded-sm absolute bottom-0 right-0 px-1 m-1 flex items-center">
                        {formatTime(each?.duration)}
                    </span>
                </div>

                <div className="flex justify-between text-[10px] bg-[#3c3c3c] rounded-b-lg p-2">
                    <span className="truncate w-[70%]">
                        {each?.name}
                    </span>
                    <span>
                        {convertBytes(each?.size)}
                    </span>
                </div>
            </div>
        </>
    )
}