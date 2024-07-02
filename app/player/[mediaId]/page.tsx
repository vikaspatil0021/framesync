"use client"

import { lazy, useEffect } from "react";
import { redirect } from "next/navigation";

import { trpc } from "@/trpc/client/trpcClient";
import FileDetailsAndCommentsContainer from "@/components/ui/player/FileDetailsAndCommentsContainer/FileDetailsAndCommentsContainer";

const VideoPlayer = lazy(() => import("@/components/ui/player/videoPlayer/videoPlayer"))
const PlayerHeader = lazy(() => import("@/components/ui/player/playerHeader/playerHeader"));
const CommentComposer = lazy(() => import("@/components/ui/player/commentComposer/commentComposer"));

type Media = {
    user: {
        name: string;
    };
    id: string;
    name: string;
    key: string;
    size: number;
    duration: number;
    uploaded_at: string;
    projectId: string;
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
                <div className="relative flex flex-col lg:w-[calc(100%-350px)] sm:h-[98vh] lg:h-screen bg-[#222]">
                    <PlayerHeader
                        media={data as Media}
                    />
                    <VideoPlayer media={data as Media} />
                    <CommentComposer
                        mediaId={data?.id as string} />

                </div>
                <div className="flex lg:w-[350px] bg-[#2c2c2c] h-screen lg:border-l-[1px] lg:border-[#555]">
                    <FileDetailsAndCommentsContainer
                    media={data as Media} />
                </div>
            </div>
        </>
    )
}