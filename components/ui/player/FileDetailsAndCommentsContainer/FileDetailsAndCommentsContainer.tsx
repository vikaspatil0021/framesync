"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import formatTime from "@/lib/formatTime";
import convertBytes from "@/lib/convertBytesFunction";
import formatDate from "@/lib/formatDate";
import { Avatar, AvatarImage } from "../../avatar";
import { SessionContextValue, useSession } from "next-auth/react";
import { ScrollArea } from "../../scroll-area";
import { trpc } from "@/trpc/client/trpcClient";
import { Trash2 } from "lucide-react";

type Media = {
    user: {
        name: string;
    };
    id: string;
    name: string;
    key: string;
    size: number;
    duration: number;
    uploaded_at: string;
    projectId: string;
}

type MediaInfo = {
    Id: string,
    Name: string,
    Duration: string,
    Size: string,
    "Uploaded Date": string,
    Uploader: string
}
type Session = {
    data: {
        user: {
            id: string
        }
    }
} & SessionContextValue

function CommentCard({ mediaId }: { mediaId: string }) {
    const session = useSession() as Session;

    const { data: allComments, refetch: allCommentsRefetch } = trpc?.comment?.getAllComments.useQuery({ mediaId });
    const deleteCommentMutation = trpc?.comment?.deleteComment?.useMutation();

    const { isSuccess } = deleteCommentMutation;

    useEffect(() => {
        if (isSuccess)
            allCommentsRefetch()

    }, [isSuccess]);

    return (
        <>
            <Table className="">
                <TableBody >
                    {allComments && allComments?.map(eachComment => {
                        return (
                            <>
                                < TableRow key={eachComment?.id} className="border-y-[.5px] border-[#444]">

                                    <div className="p-3 flex flex-col gap-1.5">
                                        <div className="flex gap-2 items-center">
                                            <Avatar className="h-5 w-5">
                                                <AvatarImage src={eachComment?.user?.picture} alt="user profile image" />
                                            </Avatar>
                                            <span className="text-sm font-semibold text-white/70">{eachComment?.user?.name}</span>
                                        </div>
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
                                                <div className="cursor-pointer hover:text-[#eb6060]"
                                                    onClick={() => deleteCommentMutation?.mutate({ id: eachComment?.id })}>
                                                    <Trash2 className="h-3" />
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </TableRow>
                            </>
                        )

                    })
                    }
                </TableBody>
            </Table >
        </>
    )
}

export default function FileDetailsAndCommentsContainer({ media }: { media: Media }) {

    const [mediaInfo, setMediaInfo] = useState<MediaInfo>();

    useEffect(() => {
        if (media) {

            const data = {
                Id: media.id,
                Name: media.name,
                "Uploaded Date": formatDate(media?.uploaded_at),
                Uploader: media?.user?.name,
                Duration: formatTime(media?.duration),
                Size: convertBytes(media?.size),
            }

            setMediaInfo(data);
        }
    }, [media])

    return (
        <>
            <Tabs defaultValue="comments" className="w-full flex flex-col">
                <TabsList className=" m-3">
                    <TabsTrigger value="comments" className="w-full h-7 text-xs">Comments</TabsTrigger>
                    <TabsTrigger value="fileInfo" className="w-full h-7 text-xs">File Information</TabsTrigger>
                </TabsList>
                <TabsContent value="comments" className="data-[state=active]:flex flex-col flex-1 overflow-y-auto">
                    <ScrollArea className="flex-1 pb-28 lg:pb-0">
                        <CommentCard
                            mediaId={media?.id} />
                    </ScrollArea>
                </TabsContent>
                <TabsContent value="fileInfo" className="mx-3 mt-0">
                    <Table>
                        <TableBody>
                            {
                                mediaInfo && Object.entries(mediaInfo).map(([key, value]) => {
                                    return (
                                        <>
                                            <TableRow className="hover:bg-none">
                                                <TableCell className="font-medium text-[#999]/90 text-xs">{key}</TableCell>
                                                <TableCell className="text-xs">{value}</TableCell>
                                            </TableRow>
                                        </>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>

                </TabsContent>
            </Tabs>

        </>
    )
}