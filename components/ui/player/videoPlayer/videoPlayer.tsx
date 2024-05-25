'use client'

import { useMemo } from "react"

import  VideoPlayerControls from "./videoControls";

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
    if (!media) return "loading";
    
    return (
        <>
            <div className="flex justify-center sm:items-center sm:h-[calc(100vh-200px)] sm:p-3">
                <div className="relative max-h-[550px]">
                    <video id='video-player' controls={false} className="max-h-[550px] aspect-video bg-black">
                        <source
                            src={src}
                            type="video/mp4"
                        />
                    </video>
                    <VideoPlayerControls />
                </div>
            </div>

        </>
    )
}