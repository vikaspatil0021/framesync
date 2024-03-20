'use client'

import { trpc } from "@/trpc/client/trpcClient";

import { motion } from "framer-motion";

import { Skeleton } from "../../skeleton";
import ProjectHeader from "../projectHeader/projectHeader";
import ImageComponent from "./imageComponent.tsx/imageComponent";


type Media = {
    id: String
    key: String
    size: number
    type: "VideoFile" | "Folder"
    projectId: String
    name: string
    duration: number
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


                <div id='grid' className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3">
                    {
                        data ? data.allMedia?.map((each: Media, index: number) => {

                            return (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.99 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <ImageComponent
                                            each={each}
                                            index={index}
                                        />
                                    </motion.div>
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
