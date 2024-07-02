import { SessionContextValue, useSession } from "next-auth/react";
import { useState } from "react";
import { Avatar, AvatarImage } from "../../avatar";
import { Pencil, Trash2 } from "lucide-react";
import formatTime from "@/lib/formatTime";
import { Button } from "../../button";

type Session = {
    data: {
        user: {
            id: string
        }
    }
} & SessionContextValue

type params = {
    eachComment: {
        user: {
            id: string;
            name: string;
            picture: string;
        };
        id: string;
        userId: string;
        msg: string;
        mediaId: string;
        timeStamp: number | null;
    },
    deleteCommentMutation: any
}

export default function CommentCard({ eachComment, deleteCommentMutation }: params) {
    const session = useSession() as Session;

    const [editMode, setEditMode] = useState(false);
    const [editMsg, setEditMsg] = useState(eachComment?.msg);


    return (
        <>

            < div key={eachComment?.id} className="border-y-[.5px] border-[#444]">

                <div className="p-3 flex flex-col gap-1.5">
                    <div className="flex gap-2 items-center">
                        <Avatar className="h-5 w-5">
                            <AvatarImage src={eachComment?.user?.picture} alt="user profile image" />
                        </Avatar>
                        <span className="text-sm font-semibold text-white/70">{eachComment?.user?.name}</span>
                    </div>
                    {editMode ?
                        <>
                            <div>
                                <textarea
                                    value={editMsg}
                                    rows={2} className="bg-[#363c4c] rounded-md p-2  w-full outline-none text-xs resize-none no-scrollbar text-white/70" placeholder="Leave your comment here ..."
                                    onChange={(e: any) => setEditMsg(e.target.value as string)}
                                />
                                <div className=''>
                                    <Button size={"sm"} className="h-6 text-white/70 bg-transparent hover:bg-transparent hover:text-white/80"
                                        onClick={() => setEditMode(false)}>
                                        Cancel
                                    </Button>
                                    <Button size={"sm"} className="h-6">
                                        Save
                                    </Button>
                                </div>
                            </div>
                        </>
                        :
                        <>
                            <div className="text-[13px] lg:text-xs text-white/80 whitespace-pre-line leading-relaxed">
                                {eachComment?.timeStamp !== null && <span className="text-[#6784d3] pe-2">{formatTime(eachComment?.timeStamp as number)}</span>}
                                {eachComment?.msg}
                            </div>
                            <div className="flex justify-between items-center transition-all">

                                <div className="text-[#f2f2f2]/60 text-xs font-semibold">
                                    reply
                                </div>

                                {
                                    session?.data?.user?.id === eachComment?.userId &&
                                    <div className="flex gap-1 items-center">

                                        <div className="cursor-pointer"
                                            onClick={() => setEditMode(true)}>
                                            <Pencil className="h-3" />
                                        </div>
                                        <div className="cursor-pointer hover:text-[#eb6060]"
                                            onClick={() => deleteCommentMutation?.mutate({ id: eachComment?.id })}>
                                            <Trash2 className="h-3" />
                                        </div>
                                    </div>
                                }
                            </div>
                        </>
                    }

                </div>
            </div >
        </>

    )
}