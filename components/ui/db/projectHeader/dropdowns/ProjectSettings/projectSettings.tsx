import { LoadingIcon, LogoutIcon, SettingIcon } from "@/components/icons/Icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download } from "lucide-react";
import { useState } from "react";
import { DeleteProjectModal } from "./deleteProjectModal";


export default function ProjectSetting() {


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
                    <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-pointer " >
                        <Download className="h-4 w-4" />
                        Download All
                    </div >
                    <hr className="border-t-[.5px] border-white/20 my-1" />
                    <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-pointer " >
                        <SettingIcon />
                        Project settings
                    </div >
                    {/* <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-pointer " >
                        <LogoutIcon />
                       Leave project
                    </div > */}
                    <DeleteProjectModal
                        setOpenStatus={setOpenStatus}
                    />
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}