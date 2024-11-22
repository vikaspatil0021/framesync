import React, { useEffect, useState } from "react";

import Image from "next/image";

import { Input } from "../../input"
import { Search } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../../scroll-area";

import { trpc } from "@/trpc/client/trpcClient";
import convertBytes from "@/lib/convertBytesFunction";
import Link from "next/link";
import { useAppDispatch } from "@/lib/redux-toolkit/hook";
import { updateTeam } from "@/lib/redux-toolkit/slices/currentTeamSlice";
import { useRouter } from "next/navigation";
import { Skeleton } from "../../skeleton";
import { LoadingIcon } from "@/components/icons/Icons";

type Project = {
    id: string;
    name: string;
    teamId: string;
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

function SearchComponent() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const [open, setOpen] = useState<boolean>(false);

    const [searchString, setSearchString] = useState<string>('');

    const { data, isRefetching, isFetching } = trpc?.search.searchQuery?.useQuery({ searchString })

    return (
        <>
            <Dialog key={"newProjectModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="relative flex items-center cursor-pointer">
                        <Search className="h-4 absolute left-1.5" />
                        <div className="h-8 bg-[#3c3c3c] w-full rounded-md text-xs text-white/60 flex items-center ps-9">
                            Search files or projects
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="text-[#f2f2f2]">
                    <DialogTitle>
                        Search...
                    </DialogTitle>
                    <div className="relative flex items-center">
                        <Search className="h-4 absolute left-1.5" />
                        <Input className="border-none h-8 bg-[#3c3c3c] placeholder:text-[#999] text-xs p-1 ps-9 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500 focus-visible:ring-transparent transition-all"
                            placeholder="Search files or projects"
                            autoFocus={false}
                            value={searchString}
                            onChange={(e) => setSearchString(e.target.value)}
                        />
                    </div>
                    <ScrollArea className="max-h-[40vh] h-[40vh] pe-3">
                        <div className="">
                            <div className="text-xs text-[#999] flex relative">
                                Projects [{data?.projects ? data?.projects.length : 0}]
                                {isRefetching || isFetching && <LoadingIcon className="h-3 right-0" />}
                            </div>
                            <div className="flex flex-col mt-2">
                                {
                                    data?.projects && data?.projects?.map((eachProject: Project) => {
                                        return (
                                            <>
                                                <div className="flex flex-col w-full py-1 px-3 hover:bg-[#333] rounded-md cursor-pointer"
                                                    onClick={() => {
                                                        dispatch(updateTeam(eachProject?.team));
                                                        setTimeout(() => {
                                                            router.push(`/db/project/${eachProject?.id}`);
                                                            setOpen(false)
                                                        }, 100);
                                                    }}
                                                >
                                                    <div className="text-[13px] line-clamp-1">
                                                        {eachProject?.name}
                                                    </div>
                                                    <div className="text-[#999] text-[10px]">
                                                        {eachProject?.team?.name}
                                                    </div>
                                                </div>
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div>
                        <div className="mt-3">
                            <div className="text-xs text-[#999] flex relative">
                                Files [{data?.media ? data?.media.length : 0}]
                                {isRefetching || isFetching && <LoadingIcon className="h-3 right-0" />}
                            </div>
                            <div className="flex flex-col mt-2">
                                {
                                    data?.media && data?.media?.map((eachMedia: Media) => {
                                        return (
                                            <>
                                                <Link href={`/player/${eachMedia?.id}`} target="_blank" onClick={() => setOpen(false)}>
                                                    <div className="flex w-full p-2 hover:bg-[#333] rounded-md cursor-pointer">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN}/${eachMedia?.key}.jpg`}
                                                            alt="media_image" width='100' height='100'
                                                            className="w-16 rounded-md" />

                                                        <div className="flex flex-col px-3">
                                                            <div className="text-[13px] line-clamp-1">
                                                                {eachMedia?.name}
                                                            </div>
                                                            <div className="text-[#999] text-xs">
                                                                {convertBytes(eachMedia?.size)}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </>
                                        )
                                    })
                                }

                            </div >

                        </div>

                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}

const MemoizedSearchComponent = React.memo(SearchComponent);

export default MemoizedSearchComponent;