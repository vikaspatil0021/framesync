import { LoadingIcon, LogoutIcon, SettingIcon } from "@/components/icons/Icons";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/redux-toolkit/hook";
import { trpc } from "@/trpc/client/trpcClient";
import { Download, Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export default function ProjectSetting() {
    const pathname = usePathname();
    const router = useRouter();

    const projectId = pathname.replace("/db/project/", '');

    const [openStatus, setOpenStatus] = useState<boolean>(false);
    const [delProjectLoading, setDelProLodaing] = useState<boolean>(false);

    const { currentTeam } = useAppSelector((state) => state.currentTeam);
    const { data: projectsData } = trpc.project.getProjects.useQuery({ teamId: currentTeam?.id });

    const deleteProjectMutation = trpc.project.deleteProject.useMutation();

    const { data, isSuccess } = deleteProjectMutation;

    useEffect(() => {
        if (isSuccess) {
            toast({
                title: `Project deleted - ${data.project.name}`,
                variant: "success"
            });
            const ids = projectsData?.projects.filter((each: any) => projectId != each.id).map((each: any) => each.id) as string[];

            router.push('/db/project/' + ids[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])


    const deleteProject = () => {
        if (projectsData && projectsData?.projects?.length === 1) {
            toast({
                title: `You cannot delete your last project!`,
                variant: "destructive"
            });
            setDelProLodaing(false);
            setOpenStatus(false);
        } else {
            deleteProjectMutation.mutate({ projectId });
            setDelProLodaing(true);
        }

    }
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
                    <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#eb6060] flex items-center gap-2 cursor-pointer "
                        onClick={deleteProject}>
                        <Trash2 className="h-4 w-4" />
                        Delete project
                        {delProjectLoading &&
                            <LoadingIcon className="-right-2 h-4 w-4" />}
                    </div >
                </DropdownMenuContent>
            </DropdownMenu >
        </>
    )
}