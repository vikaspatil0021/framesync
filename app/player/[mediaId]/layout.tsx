import { Metadata } from "next";
import { redirect } from "next/navigation";

import { getServerSession } from "next-auth";

import { getMediaById } from "@/lib/prisma/media/service";


type Props = {
    params: { mediaId: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const media = await getMediaById(params.mediaId as string)
    return {
        title: `${media?.name} | Framesync.in`,
    }
}


export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession();
    if (!session) redirect('/auth');

    return (
        <>
            {children}
        </>
    )
}