import { trpc } from "@/trpc/client/trpcClient";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../../button";
import { AngleDown, SettingIcon } from "@/components/icons/Icons";
import { NewUploadDropDown } from "./dropdowns/newUploadDropDown";
import { Skeleton } from "../../skeleton";

type Team = {
    id: string,
    name: string
}

export default function ProjectHeader() {
    const pathName = usePathname()
    const projectId = pathName.replace('/db/project/', '');

    const [currentTeam, setCurrentTeam] = useState<Team | null>(null)

    useEffect(() => {
        const team = localStorage.getItem('currentTeam');
        setCurrentTeam(JSON.parse(team as string));
    }, []);

    const { data } = trpc.project.getProject.useQuery({ projectId })


    return (
        <>
            <div className="py-5 px-10 text-[#f2f2f2]">
                <div className="text-[12px] text-[#999]">
                    {
                        currentTeam ?
                            currentTeam?.name :
                            <Skeleton className="h-[18px] w-[150px] bg-[#333]" />
                    }
                </div>


                <div className="flex items-center justify-between  my-3">
                    <div className="text-[16px] py-1">
                        {
                            data ?
                                data?.project?.name :
                                <Skeleton className="h-6 w-[280px] bg-[#444]" />
                        }
                    </div>
                    <div>
                        <NewUploadDropDown
                            projectId={projectId}
                        />
                    </div>
                </div>


                <div className="flex items-center justify-end gap-4 py-1">
                    <div className="text-[11px] text-[#999] text-center ">3 item, 90 MB</div>
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