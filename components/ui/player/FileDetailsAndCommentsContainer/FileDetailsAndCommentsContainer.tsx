import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react";
import formatTime from "@/lib/formatTime";
import convertBytes from "@/lib/convertBytesFunction";
import formatDate from "@/lib/formatDate";

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
            <Tabs defaultValue="comments" className="w-full">
                <TabsList className="lg:w-full">
                    <TabsTrigger value="comments" className="w-full h-7 text-xs">Comments</TabsTrigger>
                    <TabsTrigger value="fileInfo" className="w-full h-7 text-xs">File Information</TabsTrigger>
                </TabsList>
                <TabsContent value="comments">Make changes to your account here.</TabsContent>
                <TabsContent value="fileInfo">
                    <Table>
                        <TableBody >
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