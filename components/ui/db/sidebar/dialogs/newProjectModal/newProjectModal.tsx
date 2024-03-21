import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import {  useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";

import { trpc } from "@/trpc/client/trpcClient";


export const NewProjectModal = ({
    teamId,
    refetchProjectsdata
}: {
    teamId: string,
    refetchProjectsdata: () => void
}) => {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [isLoading, setLoading] = useState(false);
    const [projectName, setProjectName] = useState('');


    const createProject = trpc.project.createProject.useMutation();

    const { error, isPending, isSuccess, data } = createProject;

    useEffect(() => {
        setLoading(isPending);

    }, [isPending]);

    useEffect(() => {

        if (error) {
            toast({
                title: error?.message,
                variant: "destructive"
            })
        }

        if (isSuccess && data) {
            toast({
                title: data?.project.name + " - Project Created",
                variant: "success"
            });
            setProjectName('');
            refetchProjectsdata()
            setOpen(false);
            router.push('/db/project/' + data?.project.id)

        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.project.name, error, isSuccess]);
    
    return (
        <>
            <Dialog key={"newProjectModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="flex items-center gap-1 hover:bg-[#383838] cursor-pointer h-8 px-3">
                        <Plus className="h-5" />
                        <span className="text-[13px]">
                            New Project
                        </span>
                    </div>
                </DialogTrigger>
                <DialogContent className="text-[#f2f2f2]">
                    <DialogHeader>
                        <DialogTitle className="text-sm ps-2">New Project</DialogTitle>
                    </DialogHeader>

                    <ScrollArea className="max-h-[40vh] flex">
                        <div className="py-3 ps-1 pe-3 ">
                            <Input
                                className="h-9 text-xs"
                                placeholder="Project Name"
                                value={projectName}
                                onChange={(e) => {
                                    setProjectName(e.target.value)
                                }}
                            />
                        </div>
                    </ScrollArea>

                    <DialogFooter className="1m:justify-start">
                        <Button
                            variant='secondary'
                            className="w-full"
                            loading={isLoading}
                            onClick={() => {
                                createProject.mutate({ name: projectName as string, teamId });
                            }}
                        >
                            Create Project
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog >
        </>
    )
}