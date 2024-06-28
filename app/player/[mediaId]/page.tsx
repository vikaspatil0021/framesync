"use client"

import { lazy, useEffect } from "react";
import { redirect } from "next/navigation";

import { trpc } from "@/trpc/client/trpcClient";

const VideoPlayer = lazy(() => import("@/components/ui/player/videoPlayer/videoPlayer"))
const PlayerHeader = lazy(() => import("@/components/ui/player/playerHeader/playerHeader"));
const CommentComposer = lazy(() => import("@/components/ui/player/commentComposer/commentComposer"));

interface Media {
    id: string
    key: string
    name: string
    projectId: string
}

export default function PlayerPage({ params }: { params: { mediaId: string } }) {
    const { data } = trpc?.media?.getMedia.useQuery({ mediaId: params?.mediaId });

    useEffect(() => {
        if (data === null) {
            redirect('/db/recents')
        }
    }, [data]);

    return (
        <>
            <div className="flex flex-col lg:flex-row bg-[#222] text-[#f2f2f2]">
                <div className="relative flex flex-col lg:w-[calc(100%-350px)] sm:h-screen bg-[#222]">
                    <PlayerHeader
                        media={data as Media}
                    />
                    <VideoPlayer media={data as Media} />
                    <CommentComposer />
                </div>
                <div className="flex lg:w-[350px] bg-[#2c2c2c] h-screen lg:border-l-[1px] lg:border-[#555] p-4">
                    hi
                </div>
            </div>
        </>
    )
}