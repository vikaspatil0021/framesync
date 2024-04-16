import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { trpc } from "@/trpc/client/trpcClient";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


export const RenameMediaModal = ({
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
    const [inputVal, setInputVal] = useState(mediaName);
    const [loading, setLoading] = useState(false);

    const renamehandler = trpc.media.renameMedia.useMutation();

    const { isPending, isSuccess } = renamehandler;

    useEffect(() => {
        setLoading(isPending);
    }, [isPending])

    useEffect(() => {
        if (isSuccess) {
            toast({
                variant: 'success',
                title: inputVal + " renamed successufully!"
            });
            setOpen(false);
            setOpenStatusDropDown(false);
            refetchMedia();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])


    return (
        <>
            <Dialog key={"renameModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className='flex items-center gap-2 h-7 px-2 cursor-default rounded-sm hover:bg-[#383838]' >
                        <Pencil className="h-4 w-4" />
                        <span className="text-xs">Rename</span>
                    </div>

                </DialogTrigger>
                <DialogContent className="text-[#fff]">
                    <div>
                        Rename Media
                    </div>
                    <div className="flex items-center gap-3">
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
                        <Input className="h-9 text-[#fff]"
                            value={inputVal}
                            onChange={(e) => {
                                setInputVal(e.target.value)
                            }}
                        />
                    </div>
                    <DialogFooter className="flex-row space-x-2 justify-end">
                        <DialogClose className="w-20">
                            <Button
                                variant='default'
                                className="w-20 inline-flex"

                            >
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant='secondary'
                            className="w-20"
                            loading={loading}
                            onClick={() => {
                                if (inputVal !== '' && inputVal !== mediaName) {
                                    renamehandler.mutate({
                                        id: mediaId,
                                        name: inputVal
                                    })
                                }
                            }}
                        >
                            Confirm
                        </Button>
                    </DialogFooter>
                </DialogContent>

            </Dialog>
        </>
    )
}