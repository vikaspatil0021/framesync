import { getProjectByIdHandler } from "@/trpc/routers/project/getProject.handler";
import { Metadata } from "next"

type Props = {
    params: { projectId: string }
}

export async function generateMetadata(
    { params }: Props
): Promise<Metadata> {

    const projectId = params.projectId;
    const project = await getProjectByIdHandler({ projectId })

    return {
        title: project.project?.name  + " | Framesync.in",

    }
}


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}