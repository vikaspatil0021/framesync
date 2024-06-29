"use client"

import { useSession } from "next-auth/react";

import { useRef, useState } from "react"
import { Avatar, AvatarImage } from "../../avatar";
import { Skeleton } from "../../skeleton";
import { Button } from "../../button";
import { Checkbox } from "../../checkbox";

import formatTime from "@/lib/formatTime";
import { useAppSelector } from "@/lib/redux-toolkit/hook";

export default function CommentComposer() {
    const session = useSession();

    const { startTime } = useAppSelector(state => state.videoPlayerInfoReducer)

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const [startTimeChecked, setStartTimeChecked] = useState(true);

    // controlling the rows of textarea by scrollheight
    const handleTextareaHeight = () => {
        if (textareaRef.current === null) return;
        textareaRef.current.style.height = "auto";
        if (textareaRef.current.scrollHeight > 96) {
            textareaRef.current.style.height = "96px";
        } else {
            textareaRef.current.style.height = (textareaRef.current.scrollHeight) + "px";
        }
    }

    console.log(startTimeChecked)


    return (
        <>
            <div className="fixed lg:absolute bottom-0 w-full flex justify-center px-3 pb-5">
                <div className="bg-[#363c4c] w-[calc(100%-24px)] max-w-[600px] rounded-lg px-3 py-2">
                    <div className="flex gap-2 mb-2">

                        {session?.data
                            ?
                            <Avatar className="h-5 w-5">
                                <AvatarImage src={session?.data?.user?.image as string} alt="user profile image" />
                            </Avatar>
                            :
                            <Skeleton className="h-5 w-5 rounded-full bg-[#555]" />
                        }

                        <textarea
                            ref={textareaRef}
                            rows={1} className="bg-transparent outline-none text-sm w-full resize-none no-scrollbar text-white/70" placeholder="Leave your comment here ..."
                            onChange={() => {
                                handleTextareaHeight();
                            }} />
                    </div>
                    <div className="flex justify-between items-center ps-7">
                        <div className="flex items-center  bg-[rgb(32,34,43)] rounded-md gap-1  p-1">
                            <Checkbox
                                checked={startTimeChecked}
                                onCheckedChange={(val) => setStartTimeChecked(val as boolean)} className="bg-[#999] border-none" id="currentTime" />
                            <label htmlFor='currentTime' className="flex w-8 items-center text-[11px]  text-white/90">
                                <span>
                                    {formatTime(startTime)}
                                </span>
                            </label>
                        </div>
                        <Button size={"sm"} className="h-7 text-white/70 hover:text-white/80">
                            Send
                        </Button>
                    </div>
                </div>
            </div >
        </>
    )
}