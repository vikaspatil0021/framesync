import { useState } from "react";

import Image from "next/image";

import { Input } from "../../input"
import { Search } from "lucide-react";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "../../scroll-area";


export default function SearchComponent() {
    const [open, setOpen] = useState<boolean>(false);

    
    return (
        <>
            <Dialog key={"newProjectModal"} open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <div className="relative flex items-center cursor-pointer">
                        <Search className="h-4 absolute left-1.5" />
                        <div className="h-8 bg-[#3c3c3c] w-full rounded-md text-xs text-white/60 flex items-center ps-9">
                            Search files or projects
                        </div>
                    </div>
                </DialogTrigger>
                <DialogContent className="text-[#f2f2f2]">
                    <DialogTitle>
                        Search...
                    </DialogTitle>
                    <div className="relative flex items-center">
                        <Search className="h-4 absolute left-1.5" />
                        <Input className="border-none h-8 bg-[#3c3c3c] placeholder:text-[#999] text-xs p-1 ps-9 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-500 focus-visible:ring-transparent transition-all"
                            placeholder="Search files or projects"
                            autoFocus={false}
                        />
                    </div>
                    <ScrollArea className="max-h-[40vh] pe-3">
                        <div>
                            <div className="text-xs text-[#999]">
                                Files
                            </div>
                            <div className="flex flex-col mt-2">
                                <div className="flex w-full p-2 hover:bg-[#333] rounded-md cursor-pointer">
                                    <Image src={'https://d3c077k1fiz41j.cloudfront.net/YMTeOqBvJN4gf2xBky7Y0.jpg'} alt="media_image" width='100' height='100' className="w-16 rounded-md" />
                                    <div className="flex flex-col px-3">
                                        <div className="text-[13px] line-clamp-1">
                                            9789c63b-0ff9-48c5-98a0-647783d5f8 99 (1).mp4sidjgvb aasidhvbsdhbv
                                        </div>
                                        <div className="text-[#999] text-xs">
                                            9.8 MB
                                        </div>
                                    </div>
                                </div>
                                <div className="flex w-full p-2 hover:bg-[#333] rounded-md cursor-pointer">
                                    <Image src={'https://d3c077k1fiz41j.cloudfront.net/YMTeOqBvJN4gf2xBky7Y0.jpg'} alt="media_image" width='100' height='100' className="w-16 rounded-md" />
                                    <div className="flex flex-col px-3">
                                        <div className="text-[13px] line-clamp-1">
                                            9789c63b-0ff9-48c5-98a0-647783d5f8 99 (1).mp4sidjgvb aasidhvbsdhbv
                                        </div>
                                        <div className="text-[#999] text-xs">
                                            9.8 MB
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="mt-3">
                            <div className="text-xs text-[#999]">
                                Projects
                            </div>
                            <div className="flex flex-col mt-2">

                                <div className="flex flex-col w-full py-1 px-3 hover:bg-[#333] rounded-md cursor-pointer">
                                    <div className="text-[13px] line-clamp-1">
                                        another cool project
                                    </div>
                                    <div className="text-[#999] text-[10px]">
                                        VIKAS's Team
                                    </div>
                                </div>
                                <div className="flex flex-col w-full py-1 px-3 hover:bg-[#333] rounded-md cursor-pointer">
                                    <div className="text-[13px] line-clamp-1">
                                        another cool project
                                    </div>
                                    <div className="text-[#999] text-[10px]">
                                        VIKAS's Team
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    )
}