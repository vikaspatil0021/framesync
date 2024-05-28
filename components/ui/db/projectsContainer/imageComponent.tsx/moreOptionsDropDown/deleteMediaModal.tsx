import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";

import { Trash2 } from "lucide-react";

import { trpc } from "@/trpc/client/trpcClient";
import Image from "next/image";



export const DeleteMediaModal = ({
    awsCdnImgDomain,
    mediaId,
    mediaName,
    setOpenStatusDropDown,
    refetchMedia
}: {
    awsCdnImgDomain: string,
    mediaId: string,
    mediaName: string,
    setOpenStatusDropDown: Dispatch<SetStateAction<boolean>>,
    refetchMedia: () => void
}) => {

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const deleteMediahandler = trpc.media.deleteMedia.useMutation();

    const { isPending, isSuccess } = deleteMediahandler;

    useEffect(() => {
        setLoading(isPending);
    }, [isPending])

    useEffect(() => {
        if (isSuccess) {
            toast({
                variant: 'success',
                title: mediaName + " deleted!"
            });
            setOpen(false);
            setOpenStatusDropDown(false);
            refetchMedia();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])


    return (
        <>
            <Dialog key={"deleteModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#eb6060]' >
                        <Trash2 className="h-4 w-4" />
                        <span className="text-xs">Delete</span>
                    </div>
                </DialogTrigger>
                <DialogContent className="text-[#fff] ">
                    <div className="flex gap-3 items-center">
                        <Image
                            loading="lazy"
                            src={awsCdnImgDomain}
                            width={100}
                            height={100}
                            className="rounded-lg w-20 aspect-video"
                            alt='media-Image'
                            unoptimized
                            draggable={false}
                        />
                        <span className="line-clamp-2">
                            {mediaName}
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
                            loading={loading}
                            onClick={() => {
                                deleteMediahandler.mutate({
                                    id: mediaId,
                                })
                            }}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}