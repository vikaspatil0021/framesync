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

import { ScrollArea } from "../../scroll-area";
import CommentCard from "./CommentCard";
import { trpc } from "@/trpc/client/trpcClient";
import { Skeleton } from "../../skeleton";


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
type EachComment = {
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
    date: string
}

export default function FileDetailsAndCommentsContainer({ media }: { media: Media }) {

    const [mediaInfo, setMediaInfo] = useState<MediaInfo>();

    const { data: allComments, refetch: allCommentsRefetch } = trpc?.comment?.getAllComments.useQuery({ mediaId: media?.id });
    const deleteCommentMutation = trpc?.comment?.deleteComment?.useMutation();
    const updateCommentMutation = trpc?.comment?.updateComment?.useMutation();

    const { isSuccess: deleteSuccess } = deleteCommentMutation;
    const { isSuccess: updateSuccess } = updateCommentMutation;


    useEffect(() => {
        if (deleteSuccess || updateSuccess)
            allCommentsRefetch()

    }, [deleteSuccess, updateSuccess]);

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

                        {allComments && allComments?.map((eachComment: EachComment) => {
                            return (
                                <CommentCard
                                    key={eachComment?.id}
                                    deleteCommentMutation={deleteCommentMutation}
                                    updateCommentMutation={updateCommentMutation}
                                    eachComment={eachComment}
                                />
                            )

                        })}
                        {allComments?.length === 0
                            && <div className="flex justify-center items-center h-full w-full text-sm opacity-80">No Comments</div>
                        }
                        {
                            !allComments &&
                            <>
                                < div className="border-y-[.5px] border-[#444]">

                                    <div className="p-3 flex flex-col gap-1.5">
                                        <div className="flex gap-2 items-center">
                                            <Skeleton className="h-5 min-w-5 w-5 rounded-full bg-[#555]" />
                                            <Skeleton className="h-4  w-20 rounded-md bg-[#555]" />
                                        </div>
                                        <Skeleton className="h-8  w-full rounded-md bg-[#555]" />

                                    </div>
                                </div>
                                < div className="border-y-[.5px] border-[#444]">

                                    <div className="p-3 flex flex-col gap-1.5">
                                        <div className="flex gap-2 items-center">
                                            <Skeleton className="h-5 min-w-5 w-5 rounded-full bg-[#555]" />
                                            <Skeleton className="h-4  w-20 rounded-md bg-[#555]" />
                                        </div>
                                        <Skeleton className="h-8  w-full rounded-md bg-[#555]" />

                                    </div>
                                </div>
                            </>
                        }


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
            </Tabs >

        </>
    )
}