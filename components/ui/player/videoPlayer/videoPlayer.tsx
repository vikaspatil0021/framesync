'use client'

import { useMemo } from "react"

import VideoPlayerControls from "./videoControls";
import { LoadingIcon } from "@/components/icons/Icons";

interface Media {
    id: string
    name: string
    key: string
    projectId: string
}
export default function VideoPlayer({
    media,
}: {
    media: Media,
}) {

    const src: string = useMemo(() => `${process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN}/${media?.key}`, [media?.key]);

    return (
        <>
            {!media ?
                // <div className="flex justify-center sm:items-center sm:h-[calc(100vh-200px)] sm:p-3">
                <div className="aspect-video  sm:h-[calc(100vh-200px)] flex justify-center items-center">
                    <LoadingIcon />
                </div>
                // </div>
                :
                <div className="flex justify-center sm:items-center sm:h-[calc(100vh-200px)] sm:p-3">
                    <div className="relative max-h-[550px] h-full w-full sm:w-auto">
                        <video id='video-player' className="max-h-[550px] h-full w-full aspect-video bg-black">
                            <source
                                src={src}
                                type="video/mp4"
                            />
                        </video>
                        <VideoPlayerControls />
                    </div>
                </div>
            }
        </>
    )
}