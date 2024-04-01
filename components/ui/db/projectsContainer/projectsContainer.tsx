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
    projectId: string;
    id: string;
    name: string;
    type: "VideoFile" | "Folder"
    user: {
        id: string;
        name: string;
    };
    key: string;
    size: number;
    duration: number;
    uploaded_at: string;
    uploaderId: string;
}

type NewUploadData = {
    uploadProgress: number,
    name: string,
    size: number,
    key: string,
    stage: string
    projectId: string,

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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 py-2.5">
                        {
                            newUploadsMediaData.length !== 0 ?
                                newUploadsMediaData.map((each: NewUploadData) => {

                                    if (each.projectId !== projectId) return null;

                                    return (
                                        <>
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.85 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
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
                                                initial={{ opacity: 0.4, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3 }}
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
                                    <CardSkeleton />
                                    <CardSkeleton />
                                    <CardSkeleton />
                                    <CardSkeleton />
                                </>
                        }
                    </div>
                </ScrollArea>
            </div>

        </>
    )
}


const CardSkeleton = () => {
    return (
        <>
            <div className="h-full">
                <Skeleton className="w-full rounded-b-none aspect-video bg-[#444]" />
                <Skeleton className="text-[11px] bg-[#363c4c] rounded-t-none p-2.5  h-[52px]">
                    <div className="flex justify-between">
                        <Skeleton className="h-3 w-[40%] bg-[#666]" />
                        <Skeleton className="h-3 w-[10%] bg-[#666]" />

                    </div>
                    <div className="flex justify-between mt-2">
                        <Skeleton className="h-1.5 w-[30%] bg-[#666]" />
                        <Skeleton className="h-1.5 w-[25%] bg-[#666]" />
                    </div>
                </Skeleton>
            </div>
        </>
    )
}