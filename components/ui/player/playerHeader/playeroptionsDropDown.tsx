
import { LoadingIcon, ThreeVerticalDotsIcon } from "@/components/icons/Icons"
import { Download, Trash2 } from "lucide-react";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import { toast } from "../../use-toast";

import downloadMedia from "@/lib/downloadMedia";
import { useAppDispatch } from "@/lib/redux-toolkit/hook";
import { trpc } from "@/trpc/client/trpcClient";
import { redirect } from "next/navigation";

interface Media {
    id: string
    key: string
    name: string
    projectId: string
}

export default function PlayerDropDownOptions({ media }: { media: Media }) {
    const dispatch = useAppDispatch();

    const [openStatus, setOpenStatus] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const [downloading, setDownloading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);


    const downloadMediaHandler = async () => {
        setDownloading(true);
        const result = await downloadMedia(media?.key, media?.name, dispatch);
        if (result === 200) {
            setOpenStatus(false)
            setDownloading(false);

            toast({
                title: media?.name + " file downloaded",
                variant: 'success'
            })
        }
    }
    const deleteMediahandler = trpc.media.deleteMedia.useMutation();

    const { isPending, isSuccess } = deleteMediahandler;

    useEffect(() => {
        setBtnLoading(isPending);
    }, [isPending]);

    useEffect(() => {
        if (isSuccess) {
            toast({
                variant: 'success',
                title: media?.name + " deleted!"
            });

            setOpenModal(false);
            setOpenStatus(false);
            redirect('/db/project/' + media?.projectId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    return (
        <>
            <DropdownMenu open={openStatus} onOpenChange={setOpenStatus}>
                <DropdownMenuTrigger asChild>
                    <div className="bg-[#444] rounded-md h-6 w-6 p-1 flex items-center justify-center cursor-pointer">
                        <ThreeVerticalDotsIcon />
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="text-white w-[160px] text rounded-md px-0 p-1  bg-[#111] border-white/20 border">

                    <div className='relative flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]'
                        onClick={downloadMediaHandler}>

                        <Download className="h-4 w-4" />
                        <span className="text-xs">Download</span>
                        {downloading &&
                            <LoadingIcon className="right-0 h-4 w-4" />}
                    </div>


                    <Dialog key={"deleteModalPlayer"} open={openModal} onOpenChange={setOpenModal}>
                        <DialogTrigger asChild>
                            <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#eb6060]' >
                                <Trash2 className="h-4 w-4" />
                                <span className="text-xs">Delete</span>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="text-[#fff] ">
                            <div className="flex gap-3 items-center">
                                <span className="line-clamp-2">
                                    {media?.name}
                                </span>
                            </div>

                            <DialogFooter className="flex-row space-x-2 justify-end">
                                <DialogClose className="w-20">
                                    <Button
                                        variant='default'
                                        size='sm'
                                        className="w-20 inline-flex"
                                    >
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    variant='destructive'
                                    className="w-20"
                                    size='sm'
                                    loading={btnLoading}
                                    onClick={() => {
                                        deleteMediahandler.mutate({
                                            id: media?.id,
                                        })
                                    }}
                                >
                                    Delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>

                    </Dialog>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}
