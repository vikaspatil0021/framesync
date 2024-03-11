'use client'
import ProjectHeader from "@/components/ui/db/projectHeader/projectHeader";
import { trpc } from "@/trpc/client/trpcClient";
import { usePathname } from "next/navigation";

export default function Page() {
    const pathName = usePathname();
    const projectId = pathName.replace('/db/project/', '');

    const { data } = trpc.media.getAllMedia.useQuery({ projectId })
    console.log(data)
    return (
        <>
            <ProjectHeader
                projectId={projectId}
            />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 p-5">
                {
                    data && data.allMedia?.map((each) => {
                        return (
                            <>
                                <video src={"https://d3c077k1fiz41j.cloudfront.net/" + each.key} className=" rounded-lg"></video>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}
