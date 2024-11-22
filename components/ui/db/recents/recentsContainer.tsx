import { trpc } from "@/trpc/client/trpcClient"

import { motion } from "framer-motion";

import { useAppSelector } from "@/lib/redux-toolkit/hook";

import { ScrollArea } from "../../scroll-area";
import Link from "next/link";
import Image from "next/image";
import formatTime from "@/lib/formatTime";
import convertBytes from "@/lib/convertBytesFunction";
import { CardSkeleton } from "../projectsContainer/projectsContainer";
import { Skeleton } from "../../skeleton";

type Project = {
    id: string;
    name: string;
    teamId: string;
    Media: Media[];
    team: Team;
};

type Media = {
    id: string;
    key: string;
    name: string;
    size: number;
    duration: number;
    uploaded_at: string;
    type: "VideoFile" | "Folder";
    uploaderId: string;
    projectId: string;
};

type Team = {
    id: string;
    name: string;
};

export default function RecentsContainer() {

    const { data } = trpc.recents.getRecents.useQuery()

    return (
        <>
            <div className="p-5 pb-0 pe-0 w-full mt-10 lg:mt-0">
                <div className="text-lg text-white">
                    Recents
                </div>
                <ScrollArea className="h-[calc(100vh-108px)] lg:h-[calc(100vh-68px)] mt-5 pe-5 xl:pe-40">

                    <div className="grid sm:grid-cols-2 w-full gap-x-10 md:gap-x-16 gap-y-10 mb-5">
                        {data?.length === 0 &&
                            <div className="text-[#999]">
                                No Media Found!
                            </div>
                        }
                        {
                            data ?
                                data?.map((eachProject: Project) => {

                                    return (
                                        <>
                                            <div className="text-white">
                                                <div className="text-[12px] text-[#999]">
                                                    {eachProject?.team?.name}
                                                </div>
                                                <div className="text-[16px]">
                                                    {eachProject?.name}
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-4">
                                                    {
                                                        eachProject?.Media?.map((each: Media, index: number) => {
                                                            return (
                                                                <>
                                                                    <motion.div
                                                                        initial={{ opacity: 0.4, scale: 0.95 }}
                                                                        animate={{ opacity: 1, scale: 1 }}
                                                                        transition={{ duration: 0.3 }}
                                                                    >
                                                                        <Link target="_blank" href={'/player/' + each?.id}>
                                                                            <div className="group relative rounded-md text-[#fff] shadow-md shadow-[#111] cursor-pointer">
                                                                                <div className="relative">
                                                                                    <Image
                                                                                        key={index}
                                                                                        loading="lazy"
                                                                                        src={`${process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN}/${each.key}.jpg`}
                                                                                        width={100}
                                                                                        height={100}
                                                                                        className="rounded-t-md w-full aspect-video"
                                                                                        alt='media-Image'
                                                                                        unoptimized
                                                                                        draggable={false}
                                                                                    />

                                                                                    <span className="text-[9px] font-medium bg-[#222] rounded-sm absolute bottom-0 right-0 px-1 m-1 flex items-center shadow-slate-300/50 shadow-sm">
                                                                                        {formatTime(each?.duration)}
                                                                                    </span>

                                                                                </div>

                                                                                <div className="text-[11px] bg-[#363c4c] rounded-b-md p-2.5">
                                                                                    <div className="flex justify-between">
                                                                                        <span className="truncate w-[70%]">
                                                                                            {each?.name}
                                                                                        </span>
                                                                                        <span>
                                                                                            {convertBytes(each?.size)}
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </Link>
                                                                    </motion.div>
                                                                </>
                                                            )
                                                        })
                                                    }

                                                </div>
                                            </div >
                                        </>
                                    )
                                }) : <>
                                    <div>

                                        <Skeleton className="h-3 w-[30%] bg-[#666]" />
                                        <Skeleton className="h-6 w-[60%] bg-[#666] mt-2" />
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <CardSkeleton showSection={false} height="38px" />
                                            <CardSkeleton showSection={false} height="38px" />
                                            <CardSkeleton showSection={false} height="38px" />
                                            <CardSkeleton showSection={false} height="38px" />
                                        </div>
                                    </div>
                                    <div>

                                        <Skeleton className="h-3 w-[30%] bg-[#666]" />
                                        <Skeleton className="h-6 w-[60%] bg-[#666] mt-2" />
                                        <div className="grid grid-cols-2 gap-3 mt-4">
                                            <CardSkeleton showSection={false} height="38px" />
                                            <CardSkeleton showSection={false} height="38px" />
                                            <CardSkeleton showSection={false} height="38px" />
                                            <CardSkeleton showSection={false} height="38px" />
                                        </div>
                                    </div>
                                </>
                        }

                    </div >
                </ScrollArea >
            </div >
        </>
    )
}