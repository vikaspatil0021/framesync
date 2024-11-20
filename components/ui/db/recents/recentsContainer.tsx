import { trpc } from "@/trpc/client/trpcClient"

import { useAppSelector } from "@/lib/redux-toolkit/hook";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "../../scroll-area";

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
    const { currentTeam } = useAppSelector((state) => state.currentTeam);

    const { data } = trpc.recents.getRecents.useQuery({ teamId: currentTeam?.id })
    console.log(data)
    return (
        <>
            <div className="p-5 pb-0 pe-0 w-full mt-10 lg:mt-0">
                <div className="text-lg text-white">
                    Recents
                </div>
                <ScrollArea className="h-[calc(100vh-108px)] lg:h-[calc(100vh-68px)] mt-5 pe-5 xl:pe-40">

                    <div className="grid sm:grid-cols-2 w-full gap-x-10 md:gap-x-20 gap-y-10 mb-5">
                        {
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
                                            <div className="grid grid-cols-2 gap-y-5 gap-x-7 mt-4">
                                                {
                                                    eachProject?.Media?.map((eachMedia: Media, index: number) => {
                                                        return (
                                                            <>
                                                                <Link href={`/player/${eachMedia?.id}`} target="_blank" className="hover:shadow-lg hover:shadow-black/20 hover:scale-[101%] transition-all rounded-lg">
                                                                    <Image
                                                                        key={index}
                                                                        loading="lazy"
                                                                        src={`${process.env.NEXT_PUBLIC_AWS_CDN_DOMAIN}/${eachMedia?.key}.jpg`}
                                                                        width={100}
                                                                        height={100}
                                                                        className="rounded-lg w-full aspect-video border border-white/10"
                                                                        alt='media-Image'
                                                                        unoptimized
                                                                        draggable={false}
                                                                    />
                                                                </Link>
                                                            </>
                                                        )
                                                    })
                                                }

                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        }

                    </div >
                </ScrollArea>
            </div>
        </>
    )
}