'use client'

import Image from "next/image";

import { trpc } from "@/trpc/client/trpcClient";

import { Skeleton } from "../../skeleton";

import ProjectHeader from "../projectHeader/projectHeader";
import ImageComponent from "./imageComponent.tsx/imageComponent";

type Media = {
    id: String
    key: String
    size: number
    type: "VideoFile" | "Folder"
    projectId: String
}


export default function ProjectsContainer({
    projectId
}: {
    projectId: string
}) {


    const { data, refetch: refetchMedia } = trpc.media.getAllMedia.useQuery({ projectId });


    return (
        <>
            <ProjectHeader
                projectId={projectId}
                totalItems={data?.totalItems as number}
                totalMediaSize={data?.totalMediaSize as number}
                refetchMedia={refetchMedia}
            />

            <div className="px-5 pb-5">


                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">

                    {
                        data ? data.allMedia?.map((each: Media) => {

                            return (
                                <>
                                    <ImageComponent
                                        each={each}
                                    />
                                </>
                            )
                        })
                            :
                            <>
                                <Skeleton className="rounded-lg w-full aspect-video bg-[#444]" />
                                <Skeleton className="rounded-lg w-full aspect-video bg-[#444]" />

                            </>
                    }
                </div>
            </div>
        </>
    )
}
