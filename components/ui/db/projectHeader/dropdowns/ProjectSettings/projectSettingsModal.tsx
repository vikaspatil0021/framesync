import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { trpc } from "@/trpc/client/trpcClient";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { SettingIcon } from "@/components/icons/Icons";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";


export default function ProjectSettingModal({
    project,
    setOpenStatus
}: {
    project: {
        id: string;
        name: string;
        teamId: string;
    },
    setOpenStatus: Dispatch<SetStateAction<boolean>>,
}) {

    const [projectName, setProjectName] = useState<string>(project?.name || '');
    const [btnLoading, setBtnLoading] = useState<boolean>(false);

    const updateprojectMutation = trpc.project.updateProject.useMutation();
    const { data, isSuccess } = updateprojectMutation;

    useEffect(() => {
        if (isSuccess) {

            toast({
                title: `Project name updated - ${projectName}`,
                variant: "success"
            });

            setOpenStatus(false);
            setBtnLoading(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])
    const updateProjectHandler = () => {
        if (projectName !== '') {
            updateprojectMutation.mutate({
                projectId: project?.id,
                projectName
            });
            setBtnLoading(true)
        }
    }
    return (
        <>
            <Dialog key={"ProjectSettingModal"}>
                <DialogTrigger asChild>
                    <div className="relative p-1.5 text-[11px] rounded-sm hover:bg-[#4c4c4c] flex items-center gap-2 cursor-pointer " >
                        <SettingIcon />
                        Project settings
                    </div >
                </DialogTrigger>
                <DialogContent className="text-[#f2f2f2]">
                    <DialogHeader >
                        <DialogTitle className="text-sm">Edit Project</DialogTitle>
                        <div className="pt-2">
                            <Input type="text" placeholder="Project name"
                                className="h-9 text-xs"
                                value={projectName}
                                onChange={(e) => setProjectName(e?.target?.value)} />

                            <DialogFooter className="flex-row space-x-2 justify-end mt-3">
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
                                    variant='secondary'
                                    className="w-20"
                                    size='sm'
                                    loading={btnLoading}
                                    onClick={updateProjectHandler}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </>
    );
}