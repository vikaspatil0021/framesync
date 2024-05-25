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
            <div className="flex flex-col">
                <PlayerHeader
                    media={data as Media}
                />
                {data ?
                    <VideoPlayer
                        media={data}
                    />
                    : "loading"}
            </div>
        </>
    )
}