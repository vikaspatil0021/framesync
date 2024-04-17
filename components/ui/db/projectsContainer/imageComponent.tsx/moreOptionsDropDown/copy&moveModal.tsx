import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Copy, FolderInput } from "lucide-react";
import { trpc } from "@/trpc/client/trpcClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AngleRight } from "@/components/icons/Icons";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { useAppSelector } from "@/lib/redux-toolkit/hook";


type EachTeam = {
    team: {
        id: string;
        name: string;
    };
    id: string;
    role: "OWNER" | "MEMBER"
}

type Media = {
    projectId: string;
    id: string;
    name: string;
    type: "VideoFile" | "Folder"
    user: {
        id: string;
        name: string;
    };
    key: string;
    size: number;
    duration: number;
    uploaded_at: string;
    uploaderId: string;
}

export const MoveToOrCopyToModal = ({
    element,
    each,
    setOpenStatus,
    refetchMedia
}: {
    element: string,
    each: Media,
    setOpenStatus: Dispatch<SetStateAction<boolean>>,
    refetchMedia?: () => void
}) => {
    const pathName = usePathname();
    const projectUrlId = pathName.replace('/db/project/', '');

    const [open, setOpen] = useState<boolean>(false);
    const [selectValue, setSelectValue] = useState<string>('')
    const [activeProject, setActiveProject] = useState<string>('');
    const [btnDisabled, setbtnDisabled] = useState<boolean>(false);
    const [btnLoading, setBtnLoading] = useState<boolean>(false);


    useEffect(() => {

        setbtnDisabled((activeProject === projectUrlId) ? true : false); //making sure that media is not moved or copied in the same project id
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeProject]);

    const copyMedia = trpc.media.copyMedia.useMutation()
    const { isPending: isPending1, isSuccess: isSuccess1 } = copyMedia;


    const moveMedia = trpc.media.moveMedia.useMutation()
    const { isPending: isPending2, isSuccess: isSuccess2 } = moveMedia;


    useEffect(() => {
        setBtnLoading(isPending1);
    }, [isPending1]);

    useEffect(() => {
        setBtnLoading(isPending2);
    }, [isPending2]);

    useEffect(() => {
        if (isSuccess1) {
            setOpenStatus(false);

            toast({
                variant: 'success',
                title: each?.name + " copied successfully!"
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess1]);

    useEffect(() => {
        if (isSuccess2) {
            setOpenStatus(false);

            refetchMedia && refetchMedia();
            toast({
                variant: 'success',
                title: each?.name + " moved successfully!"
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess2]);

    const copyMoveToHandler = () => {
        element === 'move' ?
            moveMedia.mutate({
                ...each,
                name: each?.name + '[MOVED]',
                projectId: activeProject,
                mediaId: each?.id
            })
            :
            copyMedia.mutate({
                ...each,
                name: each?.name + '[COPY]',
                projectId: activeProject,
            })

    }


    return (
        <>
            <Dialog key={"MoveToOrCopyToModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    {
                        element === 'move' ?
                            <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                                <FolderInput className="h-4 w-4" />
                                <span className="text-xs">Move to...</span>
                            </div>
                            : <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                                <Copy className="h-4 w-4" />
                                <span className="text-xs">Copy to...</span>
                            </div>
                    }
                </DialogTrigger>
                <DialogContent className="text-[#fff]">
                    <DialogHeader>
                        {element === 'move' ? "Move to" : "Copy to"}
                    </DialogHeader>

                    <TeamSelectComponent
                        selectValue={selectValue}
                        setSelectValue={setSelectValue}
                    />

                    <div className="text-[12px] text-[#999]">
                        Projects
                    </div>

                    <ProjectSelectComponent
                        selectValue={selectValue}
                        activeProject={activeProject}
                        setActiveProject={setActiveProject}
                    />

                    <DialogFooter>
                        <DialogClose className="w-20">
                            <Button
                                size='sm'
                                variant='default'
                                className="w-20 inline-flex"
                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            size='sm'
                            disabled={btnDisabled}
                            variant='secondary'
                            className="w-20"
                            loading={btnLoading}
                            onClick={copyMoveToHandler}
                        >
                            {element === 'move' ? "Move" : "Copy"}
                        </Button>
                    </DialogFooter>

                </DialogContent>

            </Dialog>
        </>
    )
}


const TeamSelectComponent = ({
    selectValue,
    setSelectValue
}: {
    selectValue: string
    setSelectValue: (teamId: string) => void
}) => {


    const { data: allTeams } = trpc.teams.getTeams.useQuery();

    const { currentTeam: { id: currentTeamId } } = useAppSelector((state) => state?.currentTeam);


    useEffect(() => {
        setSelectValue(currentTeamId as string);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTeamId]);

    return (
        <>
            <Select value={selectValue} onValueChange={setSelectValue}>
                <SelectTrigger className="flex-auto min-w-[180px] bg-[#3c3c3c] text-white border-none focus:ring-offset-0 focus:ring-0">
                    <SelectValue placeholder="Select a Team" />
                </SelectTrigger>
                <SelectContent className="bg-[#222] text-white border-white/10 ">
                    <SelectGroup>
                        {
                            allTeams?.teams?.map((eachTeam: EachTeam) => {
                                return (
                                    <>
                                        <SelectItem value={eachTeam.team.id} key={'key' + eachTeam.team.id}>
                                            <div className="flex gap-2">
                                                <div className="h-5 w-5 rounded-full bg-green-400" />
                                                <span className="text-[12px] text-center m-auto">{eachTeam.team.name}</span>
                                            </div>
                                        </SelectItem>
                                    </>
                                )
                            })
                        }

                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    )
}


type EachProject = {
    teamId: string;
    id: string;
    name: string;
}

const ProjectSelectComponent = ({
    selectValue,
    activeProject,
    setActiveProject
}: {
    selectValue: string,
    activeProject: string,
    setActiveProject: React.Dispatch<React.SetStateAction<string>>
}) => {

    const { data: projectsData, refetch: refetchProjects } = trpc.project.getProjects.useQuery({ teamId: selectValue });

    useEffect(() => {
        setActiveProject(projectsData?.projects[0]?.id as string)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [projectsData]);


    return (
        <>

            <ScrollArea className="flex-1 h-44 pe-4">

                {
                    projectsData?.projects.map((eachProject: EachProject, index: number) => {
                        return (
                            <>

                                <div key={index} className={`group flex items-center justify-between cursor-pointer h-8 pe-5  ps-10 rounded-md ${activeProject === eachProject.id ? "bg-[#4a5878]" : 'hover:bg-[#3c3c3c]/50'}`}
                                    onClick={() => {
                                        setActiveProject(eachProject?.id)
                                    }}>

                                    <span className="text-[13px] truncate w-[85%] flex items-center gap-2">
                                        <AngleRight className="w-3" />
                                        {eachProject.name}
                                    </span>
                                </div>
                            </>
                        )
                    })

                }
            </ScrollArea>
        </>
    )
}