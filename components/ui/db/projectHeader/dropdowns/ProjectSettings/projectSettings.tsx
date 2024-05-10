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
import ProjectSettingModal from "./projectSettingsModal";


export default function ProjectSetting({
    project
}: {
    project: {
        id: string;
        name: string;
        teamId: string;
    }
}) {
    const router = useRouter();

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
                        projectId={project?.id}
                        setOpenStatus={setOpenStatus}
                    />

                    <hr className="border-t-[.5px] border-white/20 my-1" />
                    <ProjectSettingModal
                        project={project}
                        setOpenStatus={setOpenStatus}
/>
                    <DeleteProjectModal
                        setOpenStatus={setOpenStatus}
                        router={router}
                        projectId={project?.id}
                    />
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}