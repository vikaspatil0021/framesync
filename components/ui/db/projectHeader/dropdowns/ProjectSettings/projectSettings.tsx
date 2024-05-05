import { SettingIcon } from "@/components/icons/Icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { DeleteProjectModal } from "./deleteProjectModal";
import { usePathname, useRouter } from "next/navigation";
import { DownloadAllBtn } from "./downloadAllBtn";


export default function ProjectSetting() {
    const pathname = usePathname();
    const router = useRouter();

    const projectId = pathname.replace("/db/project/", '');

    const [openStatus, setOpenStatus] = useState<boolean>(false);


    return (
        <>
            <DropdownMenu key={'projectSetting'} open={openStatus} onOpenChange={setOpenStatus}>
                <DropdownMenuTrigger asChild>
                    <div className="cursor-pointer">
                        <SettingIcon />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-white rounded-sm p-1 w-[150px] text-[12px] bg-[#111] border-white/25">
                    <DownloadAllBtn
                        projectId={projectId}
                        setOpenStatus={setOpenStatus}
                    />

                    <hr className="border-t-[.5px] border-white/20 my-1" />
                    <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-pointer " >
                        <SettingIcon />
                        Project settings
                    </div >
                    <DeleteProjectModal
                        setOpenStatus={setOpenStatus}
                        router={router}
                        projectId={projectId}
                    />
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}