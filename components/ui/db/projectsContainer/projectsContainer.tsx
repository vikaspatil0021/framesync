'use client'

import { trpc } from "@/trpc/client/trpcClient";

import { motion } from "framer-motion";

import { Skeleton } from "../../skeleton";
import ProjectHeader from "../projectHeader/projectHeader";
import ImageComponent from "./imageComponent.tsx/imageComponent";
import NewuploadSkeleton from "./imageComponent.tsx/newUploadSkeleton";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hook";
import checkImageAvailability from "@/lib/checkImage";
import { ScrollArea } from "../../scroll-area";


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
    const dispatch = useAppDispatch();

    const { data, refetch: refetchMedia } = trpc.media.getAllMedia.useQuery({ projectId });

    const { uploadStatus: { stage, key: newUploadedVideoKey } } = useAppSelector((state) => state.uploadProgress);


    return (
        <>
            <div className="flex flex-col h-screen w-full">

                <ProjectHeader
                    projectId={projectId}
                    totalItems={data?.totalItems as number}
                    totalMediaSize={data?.totalMediaSize as number}
                    refetchMedia={refetchMedia}
                />


                <ScrollArea className="px-5 flex-1 ">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 py-2.5">
                        {
                            stage !== 'none' ?
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.85 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <NewuploadSkeleton />
                                </motion.div>
                                : null
                        }
                        {
                            data ?
                                data.allMedia?.map((each: Media, index: number) => {

                                    if (each.key === newUploadedVideoKey) {
                                        const awsCdnImgDomain = process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN + "/" + each.key + ".jpg";

                                        checkImageAvailability(awsCdnImgDomain, dispatch)
                                    }

                                    if (each.key === newUploadedVideoKey && stage !== 'none') return null

                                    return (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0.4, scale: 0.99 }}
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
                </ScrollArea>
            </div>

        </>
    )
}
