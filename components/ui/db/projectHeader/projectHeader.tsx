import { useEffect, useState } from "react";
import { trpc } from "@/trpc/client/trpcClient";

import { AngleDown, SettingIcon } from "@/components/icons/Icons";
import { NewUploadDropDown } from "./dropdowns/newUploadDropDown";
import { Skeleton } from "../../skeleton";

import convertBytes from "@/lib/convertBytesFunction";
import { useAppSelector } from "@/lib/redux-toolkit/hook";


import { SideBarComponent } from "../sidebar/sideBar";

type Team = {
    id: string,
    name: string
}

export default function ProjectHeader({
    projectId,
    totalItems,
    totalMediaSize,
    refetchMedia
}: {
    projectId: string,
    totalItems: number,
    totalMediaSize: number,
    refetchMedia: () => void
}) {


    const { currentTeam } = useAppSelector((state) => state.currentTeam);


    const { data } = trpc.project.getProject.useQuery({ projectId })


    return (
        <>
            <div className="p-5 text-[#f2f2f2]">
                   
                <div className="text-[12px] text-[#999] hidden lg:block lg:ps-0">

                    {
                        currentTeam?.name ?
                            currentTeam?.name :
                            <Skeleton className="h-[18px] w-[150px] bg-[#333]" />
                    }
                </div>


                <div className="flex items-center justify-between  lg:mt-3">
                    <div className="text-[16px] py-1 ps-10 lg:ps-0">
                        {
                            data ?
                                data?.project?.name :
                                <Skeleton className="h-6 w-[200px] bg-[#444]" />
                        }
                    </div>
                    <div>
                        <NewUploadDropDown
                            projectId={projectId}
                            refetchMedia={refetchMedia}
                        />
                    </div>
                </div>
                <div className="flex items-center justify-end gap-4 pt-5">
                    <div className="text-[11px] text-[#999] text-center ">
                        {
                            totalItems && totalMediaSize ?
                                totalItems + " items, " + convertBytes(totalMediaSize)
                                :
                                '0 items, 0 bytes'
                        }
                    </div>
                    <div className="cursor-pointer flex gap-1 items-center text-[11px] text-[#cbcbcb]">
                        Last modified

                        <AngleDown />
                    </div>
                    <div className="cursor-pointer">

                        <SettingIcon />
                    </div>
                </div>
            </div>
        </>
    )
}