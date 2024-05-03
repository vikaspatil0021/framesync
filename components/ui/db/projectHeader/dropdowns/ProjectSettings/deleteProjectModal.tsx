import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast";

import { Trash2 } from "lucide-react";

import { trpc } from "@/trpc/client/trpcClient";
import { useAppSelector } from "@/lib/redux-toolkit/hook";
import { usePathname, useRouter } from "next/navigation";



export const DeleteProjectModal = ({
    setOpenStatus
}: {
    setOpenStatus: Dispatch<SetStateAction<boolean>>
}) => {

    const pathname = usePathname();
    const router = useRouter();

    const projectId = pathname.replace("/db/project/", '');


    const [open, setOpen] = useState<boolean>(false);
    const [btnLoading, setLoading] = useState<boolean>(false);

    const { currentTeam } = useAppSelector((state) => state.currentTeam);
    const { data: projectsData, refetch } = trpc.project.getProjects.useQuery({ teamId: currentTeam?.id });



    const deleteProjectMutation = trpc.project.deleteProject.useMutation();

    const { data, isSuccess } = deleteProjectMutation;

    useEffect(() => {
        if (isSuccess) {
            
            toast({
                title: `Project deleted - ${data.project.name}`,
                variant: "success"
            });
            const ids = projectsData?.projects.filter((each: any) => projectId != each.id).map((each: any) => each.id) as string[];
            
            refetch();
            setOpenStatus(false);
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
            setOpenStatus(false);
            setLoading(false);
        } else {
            deleteProjectMutation.mutate({ projectId });
            setLoading(true);
        }

    }

    return (
        <>
            <Dialog key={"deleteProjectModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#eb6060] flex items-center gap-2 cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                        Delete project
                        {/* {delProjectLoading &&
                            <LoadingIcon className="-right-2 h-4 w-4" />} */}
                    </div >
                </DialogTrigger>
                <DialogContent className="text-[#fff] ">
                    <div >
                        Delete Project?
                    </div>

                    <DialogFooter className="flex-row space-x-2 justify-end">
                        <DialogClose className="w-20">
                            <Button
                                variant='default'
                                size='sm'
                                className="w-20 inline-flex outline-none"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant='destructive'
                            className="w-20"
                            size='sm'
                            loading={btnLoading}
                            onClick={deleteProject}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}