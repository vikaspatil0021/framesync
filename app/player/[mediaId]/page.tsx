"use client"

import { lazy } from "react";

const VideoPlayer = lazy(() => import("@/components/ui/player/videoPlayer/videoPlayer"))

import { trpc } from "@/trpc/client/trpcClient";
import PlayerHeader from "@/components/ui/player/playerHeader/playerHeader";

interface Media {
    id: string
    key: string
    name: string
    projectId: string
}

export default function PlayerPage({ params }: { params: { mediaId: string } }) {
    const { data } = trpc?.media?.getMedia.useQuery({ mediaId: params?.mediaId });

    return (
        <>
            <div className="flex flex-col lg:flex-row bg-[#222] text-[#f2f2f2]">
                <div className="flex flex-col lg:w-[calc(100%-350px)] h-screen">
                    <PlayerHeader
                        media={data as Media}
                    />
                    {data ?
                          <VideoPlayer media={data as Media} />
                        : "loading"}
                </div>
                <div className="flex lg:w-[350px] bg-[#2c2c2c] h-screen lg:border-l-[1px] lg:border-[#555] p-4">
                    hi
                </div>
            </div>
        </>
    )
}