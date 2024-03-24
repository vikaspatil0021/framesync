'use client'

import { trpc } from "@/trpc/client/trpcClient";

import { motion } from "framer-motion";

import { Skeleton } from "../../skeleton";
import ProjectHeader from "../projectHeader/projectHeader";
import ImageComponent from "./imageComponent.tsx/imageComponent";
import { useAppDispatch, useAppSelector } from "@/lib/redux-toolkit/hook";
import { ScrollArea } from "../../scroll-area";
import checkImageAvailability from "@/lib/checkImage";
import NewuploadSkeleton from "./imageComponent.tsx/newUploadSkeleton";


type Media = {
    id: string
    key: string
    size: number
    type: "VideoFile" | "Folder"
    projectId: string
    name: string
    duration: number
}

type NewUploadData = {
    uploadProgress: number,
    name: string,
    size: number,
    key: string,
    stage: string
    projectId: string

}


export default function ProjectsContainer({
    projectId
}: {
    projectId: string
}) {
    const dispatch = useAppDispatch();

    const { data: mediaData, refetch: refetchMedia } = trpc.media.getAllMedia.useQuery({ projectId });

    const { newUploadsMediaData } = useAppSelector((state) => state.newUploadsMediaData);

    const newUploadkeys = newUploadsMediaData.map((each: NewUploadData) => {
        return each.key;
    })

    return (
        <>
            <div className="flex flex-col h-screen w-full">

                <ProjectHeader
                    projectId={projectId}
                    totalItems={mediaData?.totalItems as number}
                    totalMediaSize={mediaData?.totalMediaSize as number}
                    refetchMedia={refetchMedia}
                />


                <ScrollArea className="px-5 flex-1 ">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 py-2.5">
                        {
                            newUploadsMediaData.length !== 0 ?
                                newUploadsMediaData.map((each: NewUploadData) => {

                                    if (each.projectId !== projectId) return null;
                                    
                                    return (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <NewuploadSkeleton
                                                    newUploadData={each}
                                                />
                                            </motion.div>
                                        </>
                                    )
                                })
                                : null
                        }
                        {
                            mediaData ?
                                mediaData?.allMedia?.map((each: Media, index: number) => {

                                    if (newUploadkeys.includes(each.key as string)) {

                                        checkImageAvailability(each.key, dispatch);

                                        return null;
                                    }


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
